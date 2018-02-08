const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Transfer = mongoose.model('transfers');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');

//Get all package 
router.get('/', (req, res) => {

    Transfer.find({status: 'public'})
    .then(transfers =>{
        res.render('transfers/index', {transfers: transfers});
    });
    
});

// Get one package
router.get('/edit/:id', (req, res) => {

   // res.send('Edit');

    Transfer.findOne({
        _id: req.params.id
    })
    .then(route => {
        res.render('transfers/edit', {route: route});
    });

});



router.get('/add', ensureAuthenticated, (req, res) => {
    
    Transfer.find()
    .populate('user')
    .then(transfers =>{
        res.render('transfers/add', {transfers: transfers});
    });
    
    
});

//Add Routes
router.post('/', ensureAuthenticated, (req, res) => {
    let prices = [];
    let successMsg = [];
    let errors = []


    if(!req.body.from){
        errors.push({error: '* From is required'});
    };
    if(!req.body.to){
        errors.push({error: '* To is required'});
    }
    

    if(errors.length > 0 ){
        res.render('transfers/add', {
            errors: errors,
            from: req.body.from,
            to: req.body.to,
            status:  req.body.status
        })
    }else{
        successMsg.push({success: 'New route is added'})

        const newRoute = {
            from: req.body.from,
            to: req.body.to,
            status:  req.body.status
        }

        new Transfer(newRoute)
        .save()
        .then(transfer => {
            res.render('transfers/add', {successMsg: successMsg});
        })
       

    }
});

//Edit Routes
router.post('/:id', (req, res) => {
    let prices = [];
    let successMsg = [];
    let errors = []

    if(!req.body.from){
        errors.push({error: '* From is required'});
    };
    if(!req.body.to){
        errors.push({error: '* To is required'});
    }
    if(!req.body.net){
        errors.push({error: '* Net price is require'});
    }
    if(!req.body.sale){
        errors.push({error: '* Sale Price is require'});
    }
    if(!req.body.discount){
        errors.push({error: '* Discount Price is require'});
    }
    if(!req.body.promotion){
        errors.push({error: '* Promotion price is require'});
    }
    if(!req.body.member){
        errors.push({error: '* Member Price is require'});
    }

    if(errors.length > 0 ){
        res.render('transfers/add', {
            errors: errors,
            from: req.body.from,
            to: req.body.to,
            price: req.body.net,
            sale: req.body.sale,
            member: req.body.member,
            promotion: req.body.promotion,
            status:  req.body.status
        })
    }else{
        successMsg.push({success: 'New route is added'})

        const newRoute = {
            from: req.body.from,
            to: req.body.to,
            net: req.body.net,
            sale: req.body.sale,
            member: req.body.member,
            promotion: req.body.promotion,
            status:  req.body.status
        }

        new transferRoute(newRoute)
        .save()
        .then(transfer => {
            res.render(`transfers/show/${transfer.id}`, {successMsg: successMsg});
        })
       
    }
});







//Exports router
module.exports = router;