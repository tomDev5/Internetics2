const express = require('express');
const session = require('express-session')
const mongoose = require('mongoose');
const users = require('./routes/users')
var bodyParser = require('body-parser')

const cors = require('cors');
const app = express();

app.use(cors())
app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))

app.post("/",(req,res) => {
  res.send('post')
})
app.use('/users', users)
app.listen(8080);
