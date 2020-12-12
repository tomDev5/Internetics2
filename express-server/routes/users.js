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

})
 
module.exports = router;