
const mongoose = require('mongoose');
const flash = require('connect-flash');
const Product = require('./../../models/Product');
const fs = require('fs');

module.exports = {

    //upload image form
    gallery(req, res){
        const id = req.params.id;

        Product.findById({ _id: id})
            .then( product => {
                res.render('admin/gallery-upload-form', { product: product });
            })

        
    },

    //image upload process

    galleryUpload(req, res){

        const id = req.params.id;
        //res.send(id);
        const imgUrl = req.files.name;

        if( !imgUrl ){
            req.flash('error_msg', 'Image is empty please select an image');
            Product.findById({ _id: id })
                .then( product => {
                    res.redirect(`/admin/product/gallery/${product.id}`);   
                });
        } else {

            const imgUrlName = Date.now() + '-' + imgUrl.name;
            const imagesUploads = './public/gallery/';
            imgUrl.mv(imagesUploads + imgUrlName, (err) => {
                if(err) throw err;
    
            });
    
            Product.findById({ _id: id })
                .then( product => {
    
                    const imgName = ({
                        name: imgUrlName
                    });
                   
                    product.gallery.push(imgName);
    
                    product.save()
                    .then( () => Product.findById({ _id: id }))
                        .then( product => {
                            
                            req.flash('success_msg', 'Gallery is added');
                            res.redirect(`/admin/product/${product.id}`);
                            //res.render('admin/gallery-upload-form', { apartment: apartment });
    
                        })
                });
        }

       

    },

    //Image Update

    galleryUpdate(req, res){

        const id = req.params.id;

        const imgUrl = req.files.imgUrl;
        const imgUrlName = Date.now() + '-' + imgUrl.name;
        const imagesUploads = './public/gallery/';
        imgUrl.mv(imagesUploads + imgUrlName, (err) => {
            if(err) throw err;
        });

        const newImg = ({
            imgUrl: imgUrlName
        })
    
        Product.findByIdAndUpdate({ _id: id},newImg)
            .then(() => Product.findById({ _id: id }))
            .then( product => {
                res.render('admin/product-edit', { product: product });
            });

    },

    //Delete Facility 
    delete(req, res){

        const id = req.params.id;
       // const oldImgUrl = req.body.oldImgUrl; 
        const imagesUploads = './public/gallery/';
        const delImage = imagesUploads + req.body.oldImgUrl;
       

        fs.unlink(delImage, (err) => { 
            Product.findOne({ 'gallery._id' : id })
            //.populate('facilities')
            .then( product => {

                product.gallery.pull({ _id : id });
                product.save()
                    .then(product => {
                        req.flash('error_msg', 'Image is deleted');
                        res.redirect(`/admin/product/${product.id}`);
                    });
            })
        });
        
        
    },
        
}