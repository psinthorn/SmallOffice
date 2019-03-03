const express = require('express');
const passport = require('passport');
const router = express.Router();

//router
router.get('/google', passport.authenticate('google', {scope:['profile', 'email']}));

//google callback
router.get('/google/callback', 
    passport.authenticate('google', 
    {failureRedirect: '/'}),
    (req,res) => {
        res.redirect('/dashboard');
    }
)

//verify login
router.get('/verify', (req, res) => {
    if(req.user){
        console.log(req.user);
    }else{
        console.log('Not authorize');
    }

});

//logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;