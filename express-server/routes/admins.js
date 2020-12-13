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

            roomsDB.find().toArray((err,arr)=>{
                if(err || arr.length===0) res.sendStatus(StatusCodes.UNAUTHORIZED)
                else{
                    roomsDB.find({projection: {_id: true, name: true}})
                    .toArray((err, arr) => {
                        console.log(arr)
                        if(err) res.sendStatus(StatusCodes.NOT_FOUND)
                        else res.json(arr)
                    })
                }
            })
        }
    })
})

module.exports = router