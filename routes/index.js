const express =  require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const User = mongoose.model('users');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');


//1st route 
router.get('/', ensureGuest, (req, res) => {
    res.render('index/welcome');
});

//Dashboard page
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    // console.log(req.user.id);
    Story.find({
        user: req.user.id
    })
    .populate('user')
    .then(stories => {
        res.render('index/dashboard', {
            stories: stories
        });
    })
    
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