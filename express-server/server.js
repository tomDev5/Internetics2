const express = require('express');
const session = require('express-session')
const mongoose = require('mongoose');

const UserController = require('./controllers/UserController');
const User = require('./models/User')
 
mongoose.connect('mongodb://127.0.0.1:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});


let sess = {
    resave: false,
    saveUninitialized: true,
    secret: 'keyboard cat',
    cookie: {}
}

const app = express();

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))
app.use('/user', UserController);

app.listen(8080);
