const { Router } = require("express");
const { indexPage, insertData, viewPage, addPage, editData, deleteData, editPage, signupPage, logout, getData, signup, loginPage } = require("../controller/control");
const upload = require("../middleware/extension");
const userAuth = require("../middleware/userAuth");
const passport = require("passport");

const router = Router()

router.get('/', userAuth, indexPage)
router.get('/view', viewPage)
router.get('/add', addPage)
router.get('/edit', editPage)
router.post('/insertData', upload, insertData)
router.get('/editData/:id', editData)
router.get('/deleteData/:id', deleteData)

router.get('/signup', signupPage)
router.get('/login', loginPage)
router.post('/login', passport.authenticate('local', { successRedirect: "/", failureRedirect: "/login" }))
router.get('/getData', getData)
router.get('/logout', logout)
router.post('/signup', signup)

module.exports = router