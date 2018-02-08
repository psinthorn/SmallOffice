
const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Tour = mongoose.model('tours');
const Category = mongoose.model('category');

const router = express.Router();


//Category Function
router.get('/category-list', (req, res) => {

   
    Category.find()
    .populate('user')
    .then(categories => {
        res.render('admin/category-index', {categories: categories});
    });
      
});

//Categroy add form
router.get('/category-add', (req, res) => {

    res.render('admin/category-add');
});

//Categroy post 
router.post('/category-add', (req, res) => {

    let errors = [];
    let successMsg = [];

    if(!req.body.name){
        errors.push({error: 'Category name is require'})
        };

     if(!req.body.description){
        errors.push({error: 'Category description is require'});
     };

     if(errors.length > 0){
        res.render('admin/category-add', {
            errors: errors,
            name: req.body.name,
            description: req.body.description
     });  
 
    }else{
        successMsg.push({success: 'New category is created'});
        let newCategory = {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status
    
        };
    
        new Category(newCategory)
        .save()
        .then(category => {
            res.render('admin/category-add', {successMsg: successMsg});
        });
    }
    
    

});

module.exports = router;