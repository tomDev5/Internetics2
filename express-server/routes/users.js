const express = require('express')
const MongoClient = require('mongodb').MongoClient
const StatusCodes = require('http-status-codes').StatusCodes

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
        if(body.username === '' || body.name === '' || body.password === '' || body.password !== body.password2){
            res.sendStatus(StatusCodes.NOT_ACCEPTABLE)
        }else if(!await usersDB.findOne({_id: body.username})){
            //if username unique
            //create document:
            usersDB.insertOne({_id: body.username, name: body.name, password: body.password, rooms: []})
            res.sendStatus(StatusCodes.OK)
        }else{
            //username taken
            res.sendStatus(StatusCodes.CONFLICT)
        }
        
        res.end()
    })

    router.get('/rooms', async (req,res) => {
        body = req.body
        if (!req.session.userID) {
            res.sendStatus(StatusCodes.UNAUTHORIZED)
        } else {
            let user = await usersDB.findOne({_id: req.session.userID})
            if (!user) res.sendStatus(StatusCodes.NOT_FOUND)
            else {
                let rooms = await roomsDB.find({_id: 'room1'}, {projection: {_id: true, name: true}}).toArray()
                res.json(rooms)
            }
        }
        
        res.end()
    })

    router.get('/self', async (req,res) => {
        body = req.body
        if (!req.session.userID) {
            res.sendStatus(StatusCodes.UNAUTHORIZED)
        } else {
            let user = await usersDB.findOne({_id: req.session.userID}, {projection: {_id: true, name: true}})
            if (user) res.json(user)
            else res.sendStatus(StatusCodes.NOT_FOUND)
            
        }
        
        res.end()
    })

    router.post('/name', async (req,res) => {
        body = req.body
        //content checks
        if (!req.session.userID) {
            res.sendStatus(StatusCodes.UNAUTHORIZED)
        } else if(body.name === '') {
            res.sendStatus(StatusCodes.NOT_ACCEPTABLE)
        } else {
            usersDB.updateOne({_id: req.session.userID}, {'$set': {name: body.name}})
            res.sendStatus(StatusCodes.OK)
        }
        
        res.end()
    })
})
 
module.exports = router;