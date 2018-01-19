const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Story = mongoose.model('stories');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');

const router = express.Router();

//public stories
router.get('/', (req, res) => {
    Story.find({ status: 'public' }).sort({ "date": -1 })
        .populate('user')
        .then(stories => {
            res.render('stories/index', {
                stories: stories
            });
        });


});

//user stories
router.get('/:id', (req, res) => {
    Story.find({
        user: req.params.id,
        status: 'public'
    }).sort({ "date": -1 })
        .populate('user')
        .then(stories => {
            res.render('stories/index', {
                stories: stories
            });
        });

});

//show individual story
router.get('/show/:id', (req, res) => {
    Story.findOne({
        _id: req.params.id
    })
        .populate('user')
        .populate('comments.commentUser')
        .then(story => {
            res.render('stories/show', { story: story });
        })

});

//add story form post
router.post('/', (req, res) => {

    let allowComments;

    if (req.body.allowComments) {
        allowComments = true;
    } else {
        allowComments = false;
    }

    const newStory = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: allowComments,
        user: req.user.id
    }

    new Story(newStory)
        .save()
        .then(story => {
            res.redirect('/dashboard');
        });
});

//edit story form
router.get('/edit/:id', (req, res) => {
    Story.findOne({
        _id: req.params.id
    })
        .then(story => {
            res.render('stories/edit', { story: story });
        })

});

//edit stories process
router.put('/:id', ensureAuthenticated, (req, res) => {

    Story.findOne({
        _id: req.params.id
    })
    .then(story => {

        let allowComments;

        if (req.body.allowComments) {
            allowComments = true;
        } else {
            allowComments = false;
        }

        //new value 

        story.title = req.body.title,
            story.status = req.body.status,
            story.allowComments = allowComments,
            story.body = req.body.body

        //update story
        story.save()
            .then(story => {
                res.redirect('/dashboard');
            });

    });

});


//delete story
router.delete('/:id', ensureAuthenticated, (req, res) => {

    Story.remove({ _id: req.params.id })
        .then(() => {
            res.redirect('/dashboard');
        });

});

//add story comment

router.post('/comment/:id', ensureAuthenticated, (req, res) => {
    // const commentBody = req.body.commentBody;
    // const commentUser = req.user.id;

    // console.log(commentUser);
    // console.log(commentBody);

    //console.log('test comment');
    Story.findOne({
        _id: req.params.id
    })
    .then(story => {
        const newComment = {
            commentBody: req.body.commentBody,
            commentUser: req.user.id
        }
        story.comments.unshift(newComment);

        story.save()
            .then(story => {
                res.redirect(`/stories/show/${story.id}`);
            })

    });

});

module.exports = router;