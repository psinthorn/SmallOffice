
const mongoose = require('mongoose');
const flash = require('connect-flash');
const Service = require('./../../models/Service');
const fs = require('fs');

module.exports = {

    //upload image form
    gallery(req, res){
        const id = req.params.id;

        Service.findById({ _id: id})
            .then( service => {
                res.render('admin/service-gallery-upload-form', { service: service });
            })
        
        
    },

    //image upload process

    galleryUpload(req, res){

        const id = req.params.id;
        //res.send(id);
        const imgUrl = req.files.name;

        if( !imgUrl ){
            req.flash('error_msg', 'Image is empty please select an image');
            Service.findById({ _id: id })
                .then( service => {
                    res.redirect(`/admin/service/gallery/${service.id}`);   
                });
        } else {

            const imgUrlName = Date.now() + '-' + imgUrl.name;
            const imagesUploads = './public/images/service/gallery/';
            imgUrl.mv(imagesUploads + imgUrlName, (err) => {
                if(err) throw err;
    
            });
    
            Service.findById({ _id: id })
                .then( service => {
    
                    const imgName = ({
                        name: imgUrlName
                    });
                   
                    service.gallery.push(imgName);
    
                    service.save()
                    .then( () => Service.findById({ _id: id }))
                        .then( service => {
                            
                            req.flash('success_msg', 'Gallery is added');
                            res.redirect(`/admin/service/${service.id}`);
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
    
        Service.findByIdAndUpdate({ _id: id},newImg)
            .then(() => service.findById({ _id: id }))
            .then( service => {
                res.render('admin/service-edit', { service: service });
            });

    },

    //Delete Facility 
    delete(req, res){

        const id = req.params.id;
       // const oldImgUrl = req.body.oldImgUrl; 
        const imagesUploads = './public/gallery/';
        const delImage = imagesUploads + req.body.oldImgUrl;
       

        fs.unlink(delImage, (err) => { 
            Service.findOne({ 'gallery._id' : id })
            //.populate('facilities')
            .then( service => {

                service.gallery.pull({ _id : id });
                service.save()
                    .then(service => {
                        req.flash('error_msg', 'Image is deleted');
                        res.redirect(`/admin/service/${service.id}`);
                    });
            })
        });
        
        
    },
        
}