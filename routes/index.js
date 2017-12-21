const express =  require('express')
const router = express.Router();


//1st route 
router.get('/', (req, res) => {
    res.render('index/welcome');
});

//Dashboard page
router.get('/dashboard', (req, res) => {
    res.render('index/dashboard');
});

module.exports = router;