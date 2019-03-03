const mongoose = require('mongoose');
const Banner = require('../../models/Banner');
const fs = require('fs');


module.exports = {


   //Get all available list of apartments
   getAll(req, res) {
    
            Banner.findOne({})
                .then(banner => {
                    res.render('admin/banner-list', { banner: banner });
    
                });
    
        },
    
    
        //Create form 
    
        addForm(req, res) {
    
            Banner.findOne({})
                .then((banner) => {
                    res.render('admin/banner-add');
                });
        },
    
        //Create new banner
        create(req, res) {
    
            const bannerProps = req.body;
            
            console.log(bannerProps);
    
            Banner.create(bannerProps)
                
                .then( () => {
                    res.redirect('/admin/banner');
                    //res.send(banner);
                });
        },
    
        //Edit form banner
        editForm(req, res) {
    
            const id = req.params.id;
            //console.log(id);
            Banner.findById({ _id: id })
                .then(banner => {
                    res.render('admin/banner-edit', { banner: banner });
                })
        },
    
        //Edit form banner
        editUpdate(req, res) {
            const bannerProps = req.body;
            const id = req.params.id;
    
            Banner.findByIdAndUpdate({ _id: id }, bannerProps)
                .then(() => Banner.find({ _id: id }))
                .then(() => {
                    req.flash('success_msg', 'Update completed.');
                    res.redirect('/admin/banner');
                })
        },
    
        //Delete banner 
        delete(req, res) {
    
            const id = req.params.id;
    
            Banner.findByIdAndRemove({ _id: id })
                .then(() => Banner.find({}))
                .then((banner) => {
                    res.render('admin/banners-list', { banner: banner });
                })
        },
    
    
        //upload image form
        image(req, res) {
            res.render('admin/image-upload-form');
        },
    
    
        //image upload process
        imageUplaod(req, res) {
    
            const id = req.params.id;
    
            const imgUrl = req.files.imgUrl;
            const imgUrlName = Date.now() + '-' + imgUrl.name;
            const imagesUploads = './public/images/';
            imgUrl.mv(imagesUploads + imgUrlName, (err) => {
                if (err) throw err;
            });
    
            let bannerProps = ({
                imgUrl: imgUrlName
            })
    
    
            Banner.findByIdAndUpdate({ _id: id }, bannerProps)
                .then(banner => {
                    res.render('/admin/banner', { banner: banner });
                });
    
        },
    
    
        //Image Update
    
        imageUpdate(req, res) {
    
            const id = req.params.id;
            const imgUrl = req.files.imgUrl;
            
    
            //res.send(imgUrl.name);
            const imgUrlName = 'banner-' + Date.now() + '-' + imgUrl.name;
            const imagesUploads = './public/images/';
            imgUrl.mv(imagesUploads + imgUrlName, (err) => {
                if(err) throw err;
            });
    
            //res.send(imgUrlName);
            const delImage = imagesUploads + req.body.oldImgUrl;
            const newImg = ({
                imgUrl: imgUrlName
            })
    
            fs.unlink(delImage, (err) => {
    
                Banner.findByIdAndUpdate({ _id: id}, newImg)
                .then(() => Banner.findById({ _id: id }))
                .then( banner => {
                    res.render('admin/banner-edit', { banner: banner });
                });
    
            })
        },

}