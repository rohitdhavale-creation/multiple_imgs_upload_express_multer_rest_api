const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const session = require('express-session');

const app = express();
const port = 3000;
app.use('/Uploads', express.static('Uploads'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('trust proxy', 1);
app.use(session({
    secret: 'change this',
    resave: false,
    saveUninitialized: true
}));


if(process.env.PORT){ session.cookie = {secure:true}}
    // use the this file in /api url
app.use('/profile', require("./routes/profileRoute"));

// User Details 
app.listen(port, ()=>{
    console.log(`server is listening ${port}`);
})