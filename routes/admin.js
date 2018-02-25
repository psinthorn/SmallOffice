
const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const Category = mongoose.model('category');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');

const router = express.Router();

//********************* 
//** Category Section **
//********************* 

router.get('/category-list', ensureAuthenticated, (req, res) => {

    Category.find()
        .populate('user')
        .then(categories => {
            res.render('admin/category-index', { categories: categories });
        });

});


//Add form
router.get('/category-add', ensureAuthenticated, (req, res) => {

    Category.find()
        .populate('user')
        .then(categories => {
            res.render('admin/category-add', { categories: categories });
        });


});

//Add process
router.post('/category', ensureAuthenticated, (req, res) => {

    let errors = [];
    let successMsg = [];

    if (!req.body.name) {
        errors.push({ error: 'Category name is required' });
    };
    if (!req.body.desc) {
        errors.push({ error: 'Category description is required' });
    }

    if (errors.length > 0) {
        res.render('admin/category-add',
            {
                errors: errors,
                name: req.body.name,
                desc: req.body.desc,
                status: req.body.status,
                user: req.user.id,
            });

    } else {

        let newCategory = {
            name: req.body.name,
            desc: req.body.desc,
            status: req.body.status,
            user: req.user.id,
        };

        new Category(newCategory)
            .save()
            .then(category => {
                successMsg.push({ success: 'New category is addded' });
                res.render('admin/category-index', {
                    successMsg: successMsg,
                });
            });


    };

});

//edit vehicle form
router.get('/category-edit/:id', ensureAuthenticated, (req, res) => {
    
        Category.findOne({
            _id: req.params.id
        })
            .then(category => {
                res.render('admin/category-edit', { category: category });
            })
    
    });

//edit vehicle process
router.put('/category/:id', ensureAuthenticated, (req, res) => {

   
    Category.findOne({
        _id: req.params.id
    })
        .then(category => {

         //new value 

            category.name = req.body.name,
                category.desc = req.body.desc,
                category.status = req.body.status,
                category.imgUrl = req.body.imgUrl

            //update story
            category.save()
                .then(category => {
                    res.redirect('/admin/category-list');
                });

        });

});

//delette category
router.delete('/category/:id', ensureAuthenticated, (req, res) => {

    let successMsg = [];
    let errors = [];
    Category.remove({ _id: req.params.id })
        .then(() => {
            successMsg.push({success: 'Category deleted'});
            res.render('admin/category-index', {successMsg: successMsg });
        });

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
    
        //let successMsg = [];

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
                        //successMsg.push({success: 'Update completed'});
                        res.redirect('/admin/vehicle-list');
                    });
    
            });
    
    });
    
    //delette vehicle
    router.delete('/vehicle/:id', ensureAuthenticated, (req, res) => {
    
        let successMsg = [];
        Vehicle.remove({ _id: req.params.id })
            .then(() => {
                successMsg.push({ success: 'Vehicle deleted' });
                res.render('admin/vehicle-list', {successMsg: successMsg});
            });
    
    });




module.exports = router;