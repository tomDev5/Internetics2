const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser')

const users = require('./routes/users')
const admins = require('./routes/admins')

const app = express()

let sess = {
  resave: false,
  saveUninitialized: true,
  secret: 'keyboard cat',
  cookie: {}
}
 
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))

app.use('/api/users', users)
app.use('/api/admins', admins)
app.listen(8080);
