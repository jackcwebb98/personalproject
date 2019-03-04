require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const ctrl = require('./controller')

const app = express()
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1010101010394942}
}))

massive(CONNECTION_STRING).then((db) => {
  app.set('db', db)
  console.log('server connected')
  app.listen(SERVER_PORT, () => console.log(`listening on server ${SERVER_PORT}`))

})

app.post(`/auth/register` ctrl.register)