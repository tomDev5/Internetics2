const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser')
const socketio = require('socket.io')
const http = require('http')

const users = require('./routes/users')
const admins = require('./routes/admins')

// socket.io and express app on the same port
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

app.use('/api/users', users((event, data) => {
  io.emit(event, data)
}))
app.use('/api/admins', admins)

const server = http.createServer(app)
const io = socketio(server)
io.on('connection', socket => {
  console.log('socket connection')
  socket.on('disconnect', () => {
    console.log('socket disconnect')
  });
});
server.listen(8080);
