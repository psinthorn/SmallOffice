
const mongoose = require('mongoose');
const flash = require('connect-flash');
const Apartment = require('./../../models/Apartment');
const fs = require('fs');

module.exports = {

    //upload image form
    gallery(req, res){
        const id = req.params.id;

        Apartment.findById({ _id: id})
            .then( apartment => {
                res.render('admin/gallery-upload-form', { apartment: apartment });
            })
        
        
    },

    //image upload process

    galleryUpload(req, res){

        const id = req.params.id;
        //res.send(id);
        const imgUrl = req.files.name;

        if( !imgUrl ){
            req.flash('error_msg', 'Image is empty please select an image');
            Apartment.findById({ _id: id })
                .then( apartment => {
                    res.redirect(`/admin/apartment/gallery/${apartment.id}`);   
                });
        } else {

            const imgUrlName = Date.now() + '-' + imgUrl.name;
            const imagesUploads = './public/gallery/';
            imgUrl.mv(imagesUploads + imgUrlName, (err) => {
                if(err) throw err;
    
            });
    
            Apartment.findById({ _id: id })
                .then( apartment => {
    
                    const imgName = ({
                        name: imgUrlName
                    });
                   
                    apartment.gallery.push(imgName);
    
                    apartment.save()
                    .then( () => Apartment.findById({ _id: id }))
                        .then( apartment => {
                            
                            req.flash('success_msg', 'Gallery is added');
                            res.redirect(`/admin/apartments/${apartment.id}`);
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
    
        Apartment.findByIdAndUpdate({ _id: id},newImg)
            .then(() => Apartment.findById({ _id: id }))
            .then( apartment => {
                res.render('admin/apartment-edit', { apartment: apartment });
            });

    },

    //Delete Facility 
    delete(req, res){
        const id = req.params.id;
        Apartment.findOne({ 'gallery._id' : id })
            //.populate('facilities')
            .then( apartment => {

                apartment.gallery.pull({ _id : id });
                apartment.save()
                    .then(apartment => {
                        req.flash('error_msg', 'Image is deleted');
                        res.redirect(`/admin/apartments/${apartment.id}`);
                    });
            })
         },

}