const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Tour = mongoose.model('tours');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

const router = express.Router();

//public stories
router.get('/', (req,res) => {
    // Tour.find({status: 'public'}).sort({"date": -1})
    // .populate('user')
    // .then(tours => {
    //     res.render('tours/index', {
    //         tours: tours
    //     });
    // });
    res.render('tours/index');
   
});

//user stories
router.get('/:id', (req,res) => {
    Tour.find({
        user: req.params.id,
        status:  'public'
    }).sort({"date": -1})
    .populate('user')
    .then(stories => {
        res.render('tours/index', {
            stories: stories
        });
    });

});

//show individual story
router.get('/show/:id', (req, res) => {
    Tour.findOne({
        _id: req.params.id
    })
    .populate('user')
    .then(tour => {
        res.render('tours/show', {tour: tour});
    })
    
});

//add story form post
router.post('/', (req, res) => {
    
    let allowComments;

    if(req.body.allowComments){
        allowComments = true;
    }else{
        allowComments = false;
    }

    const newTour = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: allowComments,
        user: req.user.id
    }

    new Tour(newTour)
    .save()
    .then(tour => {
        res.redirect('/dashboard');
    });
});

//edit story form
router.get('/edit/:id', (req, res) => {
    tour.findOne({
        _id: req.params.id
    })
    .then(tour => {
        res.render('tours/edit', {tour: tour});
    })
    
});

//edit stories process
router.put('/:id', ensureAuthenticated, (req, res) => {

    Tour.findOne({
        _id: req.params.id
    }).then(tour => {

        let allowComments;

        if(req.body.allowComments){
            allowComments = true;
        }else{
            allowComments = false;
        }

        //new value 

        tour.title = req.body.title,
        tour.status = req.body.status,
        tour.allowComments = allowComments,
        tour. body = req.body.body
        
        //update tour
        tour.save()
        .then(tour => {
            res.redirect('/dashboard');
        });
        
    });
    
}); 


//delete tour
router.delete('/:id',ensureAuthenticated, (req, res) => {

    Tour.remove({ _id: req.params.id })
    .then(() => {
        res.redirect('/dashboard');
    });

});

module.exports = router;