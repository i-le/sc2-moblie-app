const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cookieParser = require('cookie-parser')
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const path = require('path')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json()) // for parsing application/json
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname + "/public")))


app.set('view engine', 'ejs');

app.use('/', indexRouter)
app.use('/users', userRouter)




module.exports = app