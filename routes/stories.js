const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('stories/index');
});

router.get('/my-stories', (req, res) => {
    res.render('stories/my-stories');
});

router.get('/add', (req, res) => {
    res.render('stories/add');
}); 


module.exports = router;