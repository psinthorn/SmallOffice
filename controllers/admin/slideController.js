
const mongoose = require('mongoose');
const flash = require('connect-flash');
const Slide = require('./../../models/Slide');
const fs = require('fs');

module.exports = {

    //upload image form
    slide(req, res){

        Slide.find()
        .then( (slide) =>{
            res.render('admin/slide-upload-form', { slide: slide });
        });
                   
    },

    //image upload process

    slideUpload(req, res){

        const id = req.params.id;
        //res.send(id);
        const imgUrl = req.files.name;
        

        if( !imgUrl ){
            req.flash('error_msg', 'Image is empty please select an image');
            Slide.findById({ _id: id })
                .then( slide => {
                    res.redirect(`/admin/slide/`);   
                });
        } else {

            const imgUrlName = Date.now() + '-' + imgUrl.name;
            const imagesUploads = './public/banner/';
            imgUrl.mv(imagesUploads + imgUrlName, (err) => {
                if(err) throw err;
    
            });

            const slideImg = imgUrlName;
            const slideTitle = req.body.title;
            const slideDesc = req.body.slogan;

            const slideProps = ({
                name: imgUrlName,
                title: slideTitle,
                desc:  slideDesc
            });

            Slide.create(slideProps)
            .then( slide => {  

                        req.flash('success_msg', 'Slide is added');
                        res.redirect(`/admin/slide`);
                                          
                    })
        }    
       
    },

    //Image Update

    slideUpdate(req, res){

        const id = req.params.id;

        const imgUrl = req.files.imgUrl;
        const imgUrlName = Date.now() + '-' + imgUrl.name;
        const imagesUploads = './public/banner/';
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
        const imagesUploads = './public/banner/';
        const delImage = imagesUploads + req.body.oldImgUrl;
       

        fs.unlink(delImage, (err) => { 
            Slide.findByIdAndRemove({ '_id' : id })
            //.populate('facilities')
            .then( slide => {              
                        req.flash('error_msg', 'Image is deleted');
                        res.redirect(`/admin/slide`);
                    });
            
        });
        
        
    },
        
}