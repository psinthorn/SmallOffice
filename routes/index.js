const express =  require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const Tour = mongoose.model('tours');
const Content = mongoose.model('contents');
const User = mongoose.model('users');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');


//1st route 
router.get('/', ensureGuest, (req, res) => {

    // Story.find({status: 'public'})
    // .then(stories => {
    //     stories: stories
    // });

    Tour.find({status: 'public'})
    .populate('user')
    .then(tourLists => {
        res.render('index/welcome', {tourLists: tourLists});
    });

    
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

    Content.find()
    .then(contents => {
        res.render('index/contact-us', {contents: contents});
    });
    
});

module.exports = router;