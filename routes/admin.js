
const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Tour = mongoose.model('tours');
const Category = mongoose.model('category');
const Vehicle = mongoose.model('vehicle');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');

const router = express.Router();


//Category Function
router.get('/category-list', ensureAuthenticated, (req, res) => {


    Category.find()
        .populate('user')
        .then(categories => {
            res.render('admin/category-index', { categories: categories });
        });

});

//Categroy add form
router.get('/category-add', (req, res) => {

    res.render('admin/category-add');
});

//Categroy post 
router.post('/category-add', ensureAuthenticated, (req, res) => {

    let errors = [];
    let successMsg = [];

    if (!req.body.name) {
        errors.push({ error: 'Category name is require' })
    };

    if (!req.body.description) {
        errors.push({ error: 'Category description is require' });
    };

    if (errors.length > 0) {
        res.render('admin/category-add', {
            errors: errors,
            name: req.body.name,
            description: req.body.description
        });

    } else {
        successMsg.push({ success: 'New category is created' });
        let newCategory = {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status

        };

        new Category(newCategory)
            .save()
            .then(category => {
                res.render('admin/category-add', { successMsg: successMsg });
            });
    }

});


//********************* 
//** Vehicle Section **
//********************* 

router.get('/vehicle-list', ensureAuthenticated, (req, res) => {

    Vehicle.find()
        .populate('user')
        .then(vehicles => {
            res.render('admin/vehicle-list', { vehicles: vehicles });
        });

});


//Add form
router.get('/vehicle-add', ensureAuthenticated, (req, res) => {

    Vehicle.find()
        .populate('user')
        .then(vehicles => {
            res.render('admin/vehicle-add', { vehicles: vehicles });
        });


});

//Add process
router.post('/vehicle', ensureAuthenticated, (req, res) => {

    let errors = [];
    let successMsg = [];

    if (!req.body.vehicleType) {
        errors.push({ error: 'Vehicle type is required' });
    };
    if (!req.body.desc) {
        errors.push({ error: 'Vehicle description is required' });
    }

    if (errors.length > 0) {
        res.render('admin/vehicle-add',
            {
                errors: errors,
                vehicleType: req.body.vehicleType,
                desc: req.body.desc,
                status: req.body.status,
                user: req.user.id,
            });

    } else {

        let newVehicle = {
            vehicleType: req.body.vehicleType,
            desc: req.body.desc,
            status: req.body.status,
            user: req.user.id,
        };

        new Vehicle(newVehicle)
            .save()
            .then(vehicle => {
                successMsg.push({ success: 'New vehicle is addded' });
                res.render('admin/vehicle-list', {
                    successMsg: successMsg,
                });
            });


    };

});

//edit vehicle form
router.get('/vehicle-edit/:id', ensureAuthenticated, (req, res) => {
    
        Vehicle.findOne({
            _id: req.params.id
        })
            .then(vehicle => {
                res.render('admin/vehicle-edit', { vehicle: vehicle });
            })
    
    });

//edit vehicle process
router.put('/vehicle/:id', ensureAuthenticated, (req, res) => {

    Vehicle.findOne({
        _id: req.params.id
    })
        .then(vehicle => {

         //new value 

            vehicle.vehicleType = req.body.vehicleType,
                vehicle.desc = req.body.desc,
                vehicle.status = req.body.status,
                vehicle.imgUrl = req.body.imgUrl

            //update story
            vehicle.save()
                .then(vehicle => {
                    res.redirect('/admin/vehicle-list');
                });

        });

});

//delette vehicle
router.delete('/vehicle/:id', ensureAuthenticated, (req, res) => {

    Vehicle.remove({ _id: req.params.id })
        .then(() => {
            res.render('admin/vehicle-list');
        });

});





module.exports = router;