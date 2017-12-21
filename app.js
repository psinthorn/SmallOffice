const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

//Load config
require('./config/passport')(passport);

//load auth router
const auth = require('./routes/auth'); 

const app = express();

//1st route 
app.get('/', (req, res) => {
    res.send('Hello Happy :)');
});

//use auth route
app.use('/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

