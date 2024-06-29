const express = require('express')
const passport = require('passport')
const session = require('express-session')
const db = require('./config/database')
const blog = require('./models/blog')
const router = require('./routers/router')
const userDB = require('./models/User')
const localAuth = require('./middleware/localAuth')
const port = 8081
localAuth(passport)
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/uploads', express.static('uploads/'));
app.use(session({ secret: "key", resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(router)
app.set('view engine', 'ejs')

app.listen(port, (err) => {
    db()
    if (err) {
        console.log("Server Not Started");
        return false
    }
    console.log("Server Started At....http://localhost:" + port);
})