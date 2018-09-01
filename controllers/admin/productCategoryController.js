
const mongoose = require('mongoose');
const ProductCategory = require('../../models/ProductCategory');
const fs = require('fs');


module.exports = {


    //Get all available list of apartments
    getAll(req, res){

        ProductCategory.find({}).sort({ date: -1})
        .then(categories => {
            res.render('admin/tours-category', { categories: categories });
            //res.send(tours);
        });

    },


    //Create form 

    addForm(req, res) {

        ProductCategory.find({})
            .then( (categories) => {
                res.render('admin/tour-category-add', { categories: categories });
            });   
    },

    //Create new tour
    create(req, res){

        const imgUrl = req.files.imgUrl;
        const imgUrlName = Date.now() + '-' + imgUrl.name;
        const imagesUploads = './public/images/tour-category/';
        imgUrl.mv(imagesUploads + imgUrlName, (err) => {
            if(err) throw err;
        });

        const categoryProps = new ProductCategory({
            title: req.body.title,
            desc: req.body.desc,
            imgUrl: imgUrlName,
            linkUrl: req.body.linkUrl,
            address: req.body.address,
            status: req.body.status,
            //user: req.user.id
        });

        //res.send(categoryProps);

        ProductCategory.create(categoryProps)
            .then( () => ProductCategory.find({}).sort({date: -1 }))
                .then( categories => {     
                    let success_msg = "Category added";         
                    res.render('admin/tours-category', { categories: categories, success_msg: success_msg });
                   
            });
    },

    
    //Edit form apartment
    editForm(req, res){

        const id = req.params.id;
        //console.log(id);
        ProductCategory.findById({ _id: id })
            .then( (category) => {
                res.render('admin/tour-category-edit', { category: category });
            })
    },

    //Edit form tour category
    editUpdate(req, res){
        
        const id = req.params.id;
        const categoryProps = req.body;
        
            ProductCategory.findByIdAndUpdate({ _id: id }, categoryProps)
            .then( category  => {
                res.redirect(`/admin/tour-category/edit/${ category.id }`);
            })   
                    
    },

     //Image Update

     imageUpdate(req, res){
        
                const id = req.params.id;
                const oldImgUrl = req.body.oldImgUrl;
                const imgUrl = req.files.imgUrl;
               
                const imgUrlName = Date.now() + '-' + imgUrl.name;
                const imagesUploads = './public/images/tour-category/';
                imgUrl.mv(imagesUploads + imgUrlName, (err) => {
                    if(err) throw err;
                });
        
                const newImg = ({
                    imgUrl: imgUrlName
                })
        
                fs.unlink(imagesUploads + oldImgUrl, (err) => {  
                    ProductCategory.findByIdAndUpdate({ _id: id}, newImg)
                    .then(() => ProductCategory.findById({ _id: id }))
                    .then( category => {
                        res.redirect(`/admin/tour-category/edit/${ category.id }`);
                    });
                });
            
                
        
            },

    //Delete tour 
    delete(req, res){

        const id = req.params.id;

        ProductCategory.findByIdAndRemove({ _id: id })
            .then(() => ProductCategory.find({}))
                .then( (categories) => {
                res.render('admin/tours-category', { categories: categories });
            })
    },
        
}