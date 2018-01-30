const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Transfer = require('../models/Tours');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');

router.get('/', (req, res) => {
    res.render('transfers/add');
});

router.post('/', (req, res) => {
    let prices = [];
    let successMSG = [];
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
        successMSG.push({success: 'New route is added'})

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
            res.render('/add', {success: success});
        })
       

    }
});






//Exports router
module.exports = router;