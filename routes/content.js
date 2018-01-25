const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Content = mongoose.model('contents');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');



router.get('/', (req, res) => {
    
        Content.find()
        .populate('user')
        .then(contents => {
            res.render('contents/index', {
                contents: contents
            });
        });
        
        

});

router.get('/add', ensureAuthenticated, (req, res) => {
    
        res.render('contents/add');
        

});


    //add Content form post
router.post('/', ensureAuthenticated, (req, res) => {
    
    // res.send('post content');
        let allowComments;
        let errors = [];
        let successMsg = [];
    
        let user = req.user.id;
        if(user == undefined || user == '' || user == null){
            res.render('auth/google');
        }
    
        if (!req.body.title) {
            errors.push({ error: '* Story title is require' })
        }
    
        if (!req.body.body) {
            errors.push({ error: '* Story content is require' })
        }
    
        if (!req.body.status) {
            errors.push({ error: '* Status is require' })
        }
    
        if (errors.length > 0) {
            res.render('stories/add', {
                errors: errors,
                title: req.body.title,
                body: req.body.body,
                status: req.body.status,
                allowComments: allowComments,
            });
    
        } else {
    
            successMsg.push({ success: `Your new content is addded, Click dashboard to view your contents ` });
    
            if (req.body.allowComments) {
                allowComments = true;
            } else {
                allowComments = false;
            }
    
            const newContent = {
                title: req.body.title,
                body: req.body.body,
                status: req.body.status,
                allowComments: allowComments,
                user: req.user.id
            }
    
            new Content(newContent)
                .save()
                .then(content => {
    
                    res.render('contents/add', {successMsg: successMsg});
    
                });
        }
    });
    
    //edit content form
    router.get('/edit/:id', (req, res) => {
        Content.findOne({
            _id: req.params.id
        })
            .then(content => {
                res.render('contents/edit', { content: content });
            })
    
    });
    


module.exports = router;