var express = require('express');
const MongoClient = require('mongodb').MongoClient;
var router = express.Router();
const connectionString = 'mongodb://127.0.0.1:27017/';
 

MongoClient.connect(connectionString, (err, client) => {
    if (err) return console.error(err);
 
    const db = client.db('Siren')
    const usersDB = db.collection('User')
 
    router.get('/', (req, res) => {
        usersDB.find().toArray()
            .then(results => {
                res.json(results)
            });
    });

    router.post('/login', async (req,res) => {
        if(await usersDB.findOne({_id: req.body.username, password: req.body.password})){
            //if found user
            //add session
        }else{
            //if not found
            res.sendStatus(401)
        }
    });

    router.post('/signup', async (req,res) => {
        body = req.body
        //content checks
        if(body.username === '' || body.name === '' || body.password === '' || body.password !== body.password2){
            res.sendStatus(406)
        }else if(!await usersDB.findOne({_id: body.username})){
            //if username unique
            //create document:
            usersDB.insertOne({_id: body.username, name: body.name, password: body.password})
            res.sendStatus(200)
        }else{
            //username taken
            res.sendStatus(403)
        }
        
        res.end()
    });

})
 
module.exports = router;