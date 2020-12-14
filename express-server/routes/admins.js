const express = require('express')
const mongodb = require('mongodb')
const StatusCodes = require('http-status-codes').StatusCodes

const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

const router = express.Router()
const connectionString = 'mongodb://127.0.0.1:27017/'

MongoClient.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if (err) return console.error(err);

    const db = client.db('Siren')
    const usersDB = db.collection('User')
    const roomsDB = db.collection('Room')
    const adminsDB = db.collection('Admin')

    router.post('/login', async (req,res) => {
        if (await adminsDB.findOne({_id: req.body.username, password: req.body.password})) {
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

    router.get('/rooms', async (req,res) => {
        body = req.body
        if (!req.session.userID) {
            res.sendStatus(StatusCodes.UNAUTHORIZED)
        } else {

            roomsDB.find({}).project({_id: 1, name: 1}).toArray((err,arr)=>{
                if(err || arr.length===0) res.sendStatus(StatusCodes.UNAUTHORIZED)
                else{
                    if(err) res.sendStatus(StatusCodes.NOT_FOUND)
                    else res.json(arr)
                }
            })
        }
    })

    router.get('/room', async (req,res) => {
        body = req.body
        if (!req.session.userID) {
            res.sendStatus(StatusCodes.UNAUTHORIZED)
        } else {
            let test = await roomsDB.findOne({_id: req.query.roomID})
            res.send(test)
        }
    })

    router.delete('/message', async (req,res) => {
        body = req.body
        if (!req.session.userID) {
            res.sendStatus(StatusCodes.UNAUTHORIZED)
        } else if(!req.query.roomID || !req.query.messageID) {
            res.sendStatus(StatusCodes.NOT_ACCEPTABLE)
        } else {
            roomsDB.updateOne({_id: req.query.roomID},
                { $pull: { "sirens" : { _id: req.query.messageID } } }, {upsert: false,multi: true})
                .then(result=>{
                    if(result.modifiedCount === 1){
                        //send the new room data:
                        roomsDB.findOne({_id: req.query.roomID}).then(result=>res.send(result))
                    }else{
                        res.sendStatus(StatusCodes.BAD_REQUEST)
                    }
                })
        }
    })

    router.delete('/comment', async (req,res) => {
        body = req.body
        query = req.query
        //content checks
        if (!req.session.userID) {
            res.sendStatus(StatusCodes.UNAUTHORIZED)
        } else if(!query.roomID || !query.messageID || !query.commentID) {
            res.sendStatus(StatusCodes.NOT_ACCEPTABLE)
        } else {
            roomsDB.updateOne({
                '_id': query.roomID,
                'sirens._id': query.messageID
            },
            {
                '$pull': {'sirens.$.comments': {'_id': query.commentID}}
            }).then(()=>roomsDB.findOne({_id: query.roomID}).then(result=>res.send(result)))
        }
    })

    router.delete('/user', async (req,res) => {
        body = req.body
        query = req.query
        if (!req.session.userID) {
            res.sendStatus(StatusCodes.UNAUTHORIZED)
        } else if(!query.roomID || !query.userID){
            res.sendStatus(StatusCodes.NOT_ACCEPTABLE)
        } else {
            roomsDB.updateOne({_id: query.roomID},
                { $pull: { "users" : query.userID } },
                {upsert: false,multi: true})
                .then(result=>{
                    if(result.modifiedCount === 1){
                        //send the new room data:
                        roomsDB.findOne({_id: query.roomID}).then(result=>res.send(result))
                    }else{
                        res.sendStatus(StatusCodes.BAD_REQUEST)
                    }
                })
        }
    })

    router.get('/userList', async (req,res)=>{
        body = req.body
        if (!req.session.userID) {
            res.sendStatus(StatusCodes.UNAUTHORIZED)
        } else {
            usersDB.find().project({_id: 1, name: 1}).toArray((err,arr)=>{
                if(err || arr.length===0) res.sendStatus(StatusCodes.UNAUTHORIZED)
                else{
                    if(err) res.sendStatus(StatusCodes.NOT_FOUND)
                    else res.json(arr)
                }
            })
        }
    })

    router.post('/addUserToRoom', async (req,res) => {
        body = req.body
        if (!req.session.userID) {
            res.sendStatus(StatusCodes.UNAUTHORIZED)
        } else {
            if(!await usersDB.findOne({_id: body.userID})){ // if user doesn't exist
                res.sendStatus(StatusCodes.BAD_REQUEST)
            }else if(await roomsDB.findOne({"_id": body.roomID, users: { $all : [body.userID] }})){ //if user already in the room
                res.sendStatus(StatusCodes.BAD_REQUEST)
            }
            roomsDB.updateOne({_id: body.roomID},{ $push: { users: body.userID } })
            roomsDB.findOne({_id: body.roomID}).then(result=>res.send(result))
        }
    })

    router.get('/messages', async (req,res) => {
        body = req.body
        if (!req.session.userID) {
            res.sendStatus(StatusCodes.UNAUTHORIZED).end()
        } else {
            if (!req.query.text) req.query.text = ''
            if (!req.query.room) req.query.room = ''
            if (!req.query.user) req.query.user = ''

            const results = await roomsDB.aggregate([
                {'$match' : {'name': new RegExp(req.query.room)}},
                {'$addFields' : {'sirens.room': '$$ROOT._id'}},
                {'$project' : {'sirens': true, _id: false}},
                {'$unwind' : '$sirens'},
                {'$replaceRoot' : {'newRoot': '$sirens'}},
                {'$match' : {'user': new RegExp(req.query.user)}},
                {'$match' : {'text': new RegExp(req.query.text)}},
            ]).toArray()
            res.json(results).end()
        }
    })

    router.get('/users', async (req,res) => {
        body = req.body
        if (!req.session.userID) {
            res.sendStatus(StatusCodes.UNAUTHORIZED).end()
        } else {
            if (!req.query.user) req.query.user = ''
            if (!req.query.sirens_low) req.query.sirens_low = 0
            if (!req.query.sirens_high) req.query.sirens_high = 2147483648

            const group_by_result = (await roomsDB.aggregate([
                {'$project' : {'sirens': true, _id: false}},
                {'$unwind' : '$sirens'},
                {'$replaceRoot' : {'newRoot': '$sirens'}},
                {'$group' : {'_id': '$user', 'count': {$sum: 1}}},
                {'$match' : {'count': {'$gte': 0, '$lte': 100}}},
            ]).toArray())

            let count_map = {}
            for (let doc of group_by_result) {
                count_map[doc._id] = doc.count
            }

            const results = (await usersDB.find({_id: new RegExp(req.query.user)}).toArray())
                .filter(user => Object.keys(count_map).includes(user._id))
                .map(user => {user.sirens = count_map[user._id]; return user})
            
            res.json(results).end()
        }
    })

    router.get('/newRoom', async (req,res)=>{
        body = req.body
        if (!req.session.userID) {
            res.sendStatus(StatusCodes.UNAUTHORIZED)
        } else {
            //req.query.roomName
            roomsDB.insertOne({_id: ObjectID().toString(), name: req.query.roomName, users: [], sirens: []})
            roomsDB.find({}).project({_id: 1, name: 1}).toArray((err,arr)=>{
                if(err || arr.length===0) res.sendStatus(StatusCodes.UNAUTHORIZED)
                else{
                    if(err) res.sendStatus(StatusCodes.NOT_FOUND)
                    else res.json(arr)
                }
            })
        }
    })

    router.get('/postsOverTime', async (req, res) => {
        await roomsDB.aggregate([
            {'$project' : {'sirens': true, _id: false}},
            {'$unwind' : '$sirens'},
            {'$replaceRoot' : {'newRoot': '$sirens'}},
            {'$project' : {'upload_time': true, _id: false}},
          ]).toArray((err,data)=>{
            console.log(res.send(data))
        })
    })

})

module.exports = router