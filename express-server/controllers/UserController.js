const express = require('express');
const User = require('../models/User')

const router = express.Router();
 
router.post('/login', (req,res) => {
    const user = new User({
        username: 'aaa',
        password: 'aaaa'
    })
    user.save().then(() => {
        res.send('created')
    }).catch(error => {
        res.send('Already exists!' + error)
    });
})
 
module.exports = router