
const mongoose = require('mongoose');
const flash = require('connect-flash');
const Tour = require('./../../models/Tour');
const fs = require('fs');

module.exports = {

    //upload image form
    gallery(req, res){
        const id = req.params.id;

        Tour.findById({ _id: id})
            .then( tour => {
                res.render('admin/gallery-upload-form', { tour: tour });
            })
        
        
    },

    //image upload process

    galleryUpload(req, res){

        const id = req.params.id;
        //res.send(id);
        const imgUrl = req.files.name;

        if( !imgUrl ){
            req.flash('error_msg', 'Image is empty please select an image');
            Tour.findById({ _id: id })
                .then( tour => {
                    res.redirect(`/admin/tour/gallery/${tour.id}`);   
                });
        } else {

            const imgUrlName = Date.now() + '-' + imgUrl.name;
            const imagesUploads = './public/gallery/';
            imgUrl.mv(imagesUploads + imgUrlName, (err) => {
                if(err) throw err;
    
            });
    
            Tour.findById({ _id: id })
                .then( tour => {
    
                    const imgName = ({
                        name: imgUrlName
                    });
                   
                    tour.gallery.push(imgName);
    
                    tour.save()
                    .then( () => Tour.findById({ _id: id }))
                        .then( tour => {
                            
                            req.flash('success_msg', 'Gallery is added');
                            res.redirect(`/admin/tour/${tour.id}`);
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
    
        Tour.findByIdAndUpdate({ _id: id},newImg)
            .then(() => Tour.findById({ _id: id }))
            .then( tour => {
                res.render('admin/tour-edit', { tour: tour });
            });

    },

    //Delete Facility 
    delete(req, res){

        const id = req.params.id;
       // const oldImgUrl = req.body.oldImgUrl; 
        const imagesUploads = './public/gallery/';
        const delImage = imagesUploads + req.body.oldImgUrl;
       

        fs.unlink(delImage, (err) => { 
            Tour.findOne({ 'gallery._id' : id })
            //.populate('facilities')
            .then( tour => {

                tour.gallery.pull({ _id : id });
                tour.save()
                    .then(tour => {
                        req.flash('error_msg', 'Image is deleted');
                        res.redirect(`/admin/tour/${tour.id}`);
                    });
            })
        });
        
        
    },
        
}