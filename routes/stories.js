const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

//public stories
router.get('/', (req,res) => {
    res.render('stories/index');
});

//private stories
router.get('/my-stories', (req, res) => {
    res.render('stories/my-stories');
});

//show story
router.get('/show', (req, res) => {
    res.render('stories/show');
});

//stories add form
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('stories/add');
}); 

//edit stories
router.get('/edit', ensureAuthenticated, (req, res) => {
    res.render('stories/edit');
}); 

//show story
router.delete('/:id', (req, res) => {
    res.render('stories/show');
});

module.exports = router;