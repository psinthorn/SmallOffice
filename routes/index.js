const express =  require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Content = mongoose.model('content');
const User = mongoose.model('user');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');


//1st route 
router.get('/', ensureGuest, (req, res) => {

        res.render('index/welcome');
    
});

router.get('/add', ensureAuthenticated, (req, res) => {  
    res.render('stories/add');
});

//about page
router.get('/about', (req, res) => {
    res.render('index/about');
});

//Contact Us
router.get('/contact-us', (req,res) => {
        res.render('index/contact-us');
});

module.exports = router;