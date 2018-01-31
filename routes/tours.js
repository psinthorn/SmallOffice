const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Tour = mongoose.model('tours');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

const router = express.Router();

//public stories
router.get('/', (req,res) => {
   
    Tour.find()
    .then(tours => {
        res.render('tours/index', {tours: tours});
    })
   
});


router.get('/add', ensureAuthenticated, (req, res) => {
        res.render('tours/add');
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
router.post('/', ensureAuthenticated,  (req, res) => {
    
    let errors = [];
    let successMsg = [];
    let allowComments;


    if(!req.body.title){
        errors.push({error: '* Tour title is require'});
    }
    if(!req.body.body){
        errors.push({error: '* Tour body is require'});
    }

    if(errors.length > 0 ) {
        res.render('tours/add', {
            errors: errors,
            title: req.body.title,
            body: req.body.body,
            status: req.body.status
        });
    }else{
        successMsg.push({success: 'Add new tour package completed'});

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
            res.render('tours/add', {successMsg: successMsg});
        });
        
    }

});

//edit story form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {

    let successMsg = [];
    let tourRate;

    Tour.findOne({
        _id: req.params.id
    })
    .then(tour => {

        if(tour.price.length > 0){
            tourRate = 1;
        }else{
            tourRate = 0;
        }
        res.render('tours/edit', {
            tour: tour,
            tourRate: tourRate
        });
    })
    
});

//edit tour process
router.put('/:id', ensureAuthenticated, (req, res) => {

    let successMsg = [];
    let errors = [];

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
            successMsg.push({success: 'Update completed'}); 

            res.render(`tours/index`, {
                successMsg: successMsg,
            });
        })
        
    });
    
}); 


//delete tour
router.delete('/:id',ensureAuthenticated, (req, res) => {

    Tour.remove({ _id: req.params.id })
    .then(() => {
        res.redirect('/dashboard');
    });

});

//Tour rate add price
router.post('/price-rate/:id', ensureAuthenticated, (req, res) => {
    
    Tour.findOne({

        _id: req.params.id
    })
   .then(tour => {
            const newPrice = {
                sale: req.body.sale,
                member: req.body.member,
                promotion: req.body.promotion,
                discount: req.body.discount,
                net: req.body.net
                
            }
            tour.price.unshift(newPrice);

            tour.save()
                .then(tour => {
                    res.redirect(`/tours/show/${tour.id}`);
                })

        });
    });

    //Edit price

    //edit tour process
router.put('/price-rate/:id', ensureAuthenticated, (req, res) => {
    
        let successMsg = [];
        let errors = [];
        let tourId = req.params.id

        Tour.findOne({
            _id: req.params.id
        }).then(tour => {
            

            //new value 
                tour.price[0].sale = req.body.sale,
                tour.price[0].member = req.body.member,
                tour.price[0].promotion = req.body.promotion,
                tour.price[0].discount = req.body.discount,
                tour.price[0].net = req.body.net           
            
            //update tour
            tour.save()
            .then(tour => {
                successMsg.push({success: 'Price update completed'}); 
    
                res.redirect(`/tours/show/${tour.id}`);
            })
            
        });
        
    }); 
    

module.exports = router;