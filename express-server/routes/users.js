const express = require('express')
const mongodb = require('mongodb')
const StatusCodes = require('http-status-codes').StatusCodes

const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
 
module.exports = function(emitEvent) {
    const router = express.Router()
    const connectionString = 'mongodb://127.0.0.1:27017/'
    

    MongoClient.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
        if (err) return console.error(err);
    
        const db = client.db('Siren')
        const usersDB = db.collection('User')
        const roomsDB = db.collection('Room')

        router.post('/login', async (req,res) => {
            if (await usersDB.findOne({_id: req.body.username, password: req.body.password})) {
                //if found, create session
                req.session.userID = req.body.username
                res.sendStatus(StatusCodes.OK)
            } else {
                //if not found
                res.sendStatus(StatusCodes.UNAUTHORIZED)
            }

            res.end()
        })

        router.post('/logout', async (req,res) => {
            delete req.session.userID
            res.end()
        })

        router.post('/signup', async (req,res) => {
            body = req.body
            //content checks
            if(!body.username || !body.name || !body.password || body.password !== body.password2){
                res.sendStatus(StatusCodes.NOT_ACCEPTABLE)
            }else if(!await usersDB.findOne({_id: body.username})){
                //if username unique
                //create document:
                usersDB.insertOne({_id: body.username, description: 'Hello world!', name: body.name, password: body.password, rooms: []})
                res.sendStatus(StatusCodes.OK)
            }else{
                //username taken
                res.sendStatus(StatusCodes.CONFLICT)
            }
            
            res.end()
        })

        router.get('/self', async (req,res) => {
            body = req.body
            if (!req.session.userID) {
                res.sendStatus(StatusCodes.UNAUTHORIZED)
            } else {
                usersDB.findOne({_id: req.session.userID}, {projection: {_id: true, name: true, description: true}})
                    .then((user) => res.json(user).end())
                    .catch((err) => res.sendStatus(StatusCodes.NOT_FOUND).end())
            }
        })

        router.get('/user', async (req,res) => {
            body = req.body
            if (!req.session.userID) {
                res.sendStatus(StatusCodes.UNAUTHORIZED)
            } else {
                usersDB.findOne({_id: req.query.id}, {projection: {_id: true, name: true, description: true}})
                    .then((user) => res.json(user).end())
                    .catch((err) => res.sendStatus(StatusCodes.NOT_FOUND).end())
            }
        })

        router.get('/rooms', async (req,res) => {
            body = req.body
            if (!req.session.userID) {
                res.sendStatus(StatusCodes.UNAUTHORIZED)
            } else {
                roomsDB.find({users: {$all: [req.session.userID]}}, {projection: {_id: true, name: true}})
                    .toArray((err, arr) => {
                    if(err) res.sendStatus(StatusCodes.NOT_FOUND)
                    else res.json(arr)
                })
            }
        })

        router.get('/sirens', async (req,res) => {
            body = req.body
            if (!req.session.userID) {
                res.sendStatus(StatusCodes.UNAUTHORIZED).end()
            } else {
                const sirens = await roomsDB.mapReduce(
                    function() {
                        emit(this._id, this.sirens)
                    },
                    function(key, values) {
                        const sirens = [].concat.apply([], values)
                        sirens.forEach(siren => {
                            siren.room = key
                            siren.likeCount = siren.likes.length
                            siren.liked = siren.likes.includes(userID)
                            return siren
                        })
                        return sirens
                    },
                    {
                        query: {users: {$all: [req.session.userID]}},
                        out: {inline: 1},
                        scope: {userID: req.session.userID}
                    }
                )

                res.json(sirens).end()
            }
        })

        router.post('/name', async (req,res) => {
            body = req.body
            //content checks
            if (!req.session.userID) {
                res.sendStatus(StatusCodes.UNAUTHORIZED)
            } else if(!body.name || !body.description) {
                res.sendStatus(StatusCodes.NOT_ACCEPTABLE)
            } else {
                usersDB.updateOne({_id: req.session.userID}, {'$set': {name: body.name, description: body.description}})
                res.sendStatus(StatusCodes.OK)
            }
            
            res.end()
        })

        router.post('/password', async (req,res) => {
            body = req.body
            //content checks
            if (!req.session.userID) {
                res.sendStatus(StatusCodes.UNAUTHORIZED)
            } else if(!body.name || body.new_password !== body.new_password2 || body.current_password !== (await usersDB.findOne({_id: req.session.userID})).password) {
                res.sendStatus(StatusCodes.NOT_ACCEPTABLE)
            } else {
                usersDB.updateOne({_id: req.session.userID}, {'$set': {password: body.new_password}})
                res.sendStatus(StatusCodes.OK)
            }
            
            res.end()
        })

        router.post('/siren', async (req,res) => {
            body = req.body
            //content checks
            if (!req.session.userID) {
                res.sendStatus(StatusCodes.UNAUTHORIZED)
            } else if(!body.room || !body.siren) {
                res.sendStatus(StatusCodes.NOT_ACCEPTABLE)
            } else {
                const newSiren = {
                    _id: ObjectID().toString(),
                    user: req.session.userID,
                    text: body.siren,
                    comments: [],
                    upload_time: new Date().getTime(),
                    likes: []
                }

                emitEvent('siren', {
                    user: newSiren.user,
                    room: (await roomsDB.findOne({'_id': body.room}, {'name': true, '_id': false})).name,
                    text: newSiren.text,
                })
                roomsDB.updateOne({_id: body.room}, {$push: {sirens: newSiren}})
                res.sendStatus(StatusCodes.OK)
            }
            
            res.end()
        })

        router.post('/siren/edit', async (req,res) => {
            body = req.body
            //content checks
            if (!req.session.userID) {
                res.sendStatus(StatusCodes.UNAUTHORIZED)
            } else if(!body.room || !body.siren || !body.text) {
                res.sendStatus(StatusCodes.NOT_ACCEPTABLE)
            } else {

                roomsDB.updateOne({
                    '_id': body.room,
                    'sirens._id': body.siren
                },
                {
                    '$set': {'sirens.$.text': body.text}
                })
                res.sendStatus(StatusCodes.OK)
            }
            
            res.end()
        })

        router.post('/siren/delete', async (req,res) => {
            body = req.body
            //content checks
            if (!req.session.userID) {
                res.sendStatus(StatusCodes.UNAUTHORIZED)
            } else if(!body.room || !body.siren) {
                res.sendStatus(StatusCodes.NOT_ACCEPTABLE)
            } else {

                roomsDB.updateOne({
                    '_id': body.room
                },
                {
                    '$pull': {'sirens': {'_id': body.siren}}
                })
                res.sendStatus(StatusCodes.OK)
            }
            
            res.end()
        })

        router.post('/comment', async (req,res) => {
            body = req.body
            //content checks
            if (!req.session.userID) {
                res.sendStatus(StatusCodes.UNAUTHORIZED)
            } else if(!body.room || !body.siren || !body.text) {
                res.sendStatus(StatusCodes.NOT_ACCEPTABLE)
            } else {
                const newComment = {
                    _id: ObjectID().toString(),
                    user: req.session.userID,
                    text: body.text,
                    upload_time: new Date().getTime()
                }

                emitEvent('comment', {
                    user: newComment.user,
                    room: (await roomsDB.findOne({'_id': body.room}, {'name': true, '_id': false})).name,
                    text: newComment.text,
                })

                roomsDB.updateOne({_id: body.room, 'sirens._id': body.siren}, {$push: {'sirens.$.comments': newComment}})
                res.sendStatus(StatusCodes.OK)
            }
            
            res.end()
        })

        router.post('/comment/edit', async (req,res) => {
            body = req.body
            //content checks
            if (!req.session.userID) {
                res.sendStatus(StatusCodes.UNAUTHORIZED)
            } else if(!body.room || !body.siren || !body.comment || !body.text) {
                res.sendStatus(StatusCodes.NOT_ACCEPTABLE)
            } else {

                roomsDB.updateOne({
                        '_id': body.room,
                    },
                    {
                        '$set': {'sirens.$[i].comments.$[j].text': body.text}
                    },
                    {
                        arrayFilters: [{
                                "i._id": body.siren
                            }, {
                                "j._id": body.comment
                        }]
                    })
                res.sendStatus(StatusCodes.OK)
            }
            
            res.end()
        })

        router.post('/comment/delete', async (req,res) => {
            body = req.body
            //content checks
            if (!req.session.userID) {
                res.sendStatus(StatusCodes.UNAUTHORIZED)
            } else if(!body.room || !body.siren || !body.comment) {
                res.sendStatus(StatusCodes.NOT_ACCEPTABLE)
            } else {

                roomsDB.updateOne({
                    '_id': body.room,
                    'sirens._id': body.siren
                },
                {
                    '$pull': {'sirens.$.comments': {'_id': body.comment}}
                })
                res.sendStatus(StatusCodes.OK)
            }
            
            res.end()
        })

        router.post('/like', async (req,res) => {
            body = req.body
            if (!req.session.userID) {
                res.sendStatus(StatusCodes.UNAUTHORIZED)
            } else if(!body.room || !body.siren || !body.action) {
                res.sendStatus(StatusCodes.NOT_ACCEPTABLE)
            } else {
                    roomsDB.updateOne({
                        '_id': body.room,
                        'sirens._id': body.siren
                    },
                    body.action === 'push' ?
                        {'$push': {'sirens.$.likes': req.session.userID}} :
                        {'$pull': {'sirens.$.likes': req.session.userID}}
                )
            }
            
            res.end()
        })

        router.post('/authenticate', async (req,res) => {
            body = req.body
            if (!req.session.userID) {
                res.sendStatus(StatusCodes.UNAUTHORIZED)
            } else {
                res.sendStatus(StatusCodes.OK)
            }
        })
    })
    
    return router
}