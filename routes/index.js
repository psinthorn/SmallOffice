const express =  require('express')
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');


//1st route 
router.get('/', ensureGuest, (req, res) => {
    res.render('index/welcome');
});

//Dashboard page
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('index/dashboard');
});

//about page
router.get('/about', (req, res) => {
    res.render('index/about');
});

module.exports = router;