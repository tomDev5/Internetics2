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
            roomsDB.findOne({_id: req.query.roomID}).then(result=>res.send(result))
        }
    })

    router.delete('/message', async (req,res) => {
        body = req.body
        if (!req.session.userID) {
            res.sendStatus(StatusCodes.UNAUTHORIZED)
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
})

module.exports = router