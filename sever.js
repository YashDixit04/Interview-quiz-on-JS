

if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config()
}


const express = require("express")
const app = express();
const bcrypt = require("bcrypt")
const passport = require("passport"); // to store a password in local storage
const flash = require("express-flash");
const session = require('express-session');
const methodOverride = require('method-override');
const path = require("path")

const initializePassword = require('./passport-config');



require("./database/conn");

const form = require('./module/form-tour')

const users = []

app.use(express.urlencoded({ extended: false }));
app.set('view-engine', 'ejs')
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(methodOverride('_method'))


initializePassword(passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

app.get('/', (req, res) => {
    res.render('index.ejs')
})


app.get('/login', (req, res) => {
    res.render('login.ejs')
})
app.post('/login', passport.authenticate('local', {
    successRedirect: '/form',   // from page added further 
    failureRedirect: '/login',
    failureFlash: true,
}))

app.get('/form', (req, res) => {
    res.render('form.ejs')
})


app.post("/form", (req, res) => {
    try {
        const dataForForm = new Form({
            gmail: req.body.gmail,
            name: req.body.customer_name,
        })
        console.log(dataForForm)
    } catch (e) {
        res.status(400).send(e)
    }
})




app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }

})



app.listen(3000, () => {
    console.log("Sever running...")
})