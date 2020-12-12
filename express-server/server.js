const express = require('express');
const session = require('express-session')
const mongoose = require('mongoose');
const users = require('./routes/users')

const app = express();

app.post("/",(req,res) => {
  res.send('post')
})
app.use('/users', users)
app.listen(8080);
