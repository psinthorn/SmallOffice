const mongoose = require('mongoose')
const fs = require('fs')
const Global = require('./../../models/GlobalModel')

// 
// Global settings is data that frenquency use around website 
//
// Title, Keywords, Describtions
// logo
// footer
// social network
// Admin, support contact
// 


module.exports = {

    getAll(req, res) {
        Global.find({})
            .then(global => {
                res.json(global)
            });
    },


    create(req, res) {

    },



    //upload Thumbnail image form
    imageLogo(req, res) {
        res.render("admin/logo-upload-form");
    },
    //image Thumbnail upload process
    imageLogoUplaod(req, res) {
        const id = req.params.id;

        const imgUrl = req.files.imgUrl;
        const imgUrlName = Date.now() + "-logo-" + imgUrl.name;
        const imagesUploads = "./public/images/";
        imgUrl.mv(imagesUploads + imgUrlName, err => {
            if (err) throw err;
        });

        Product.findById({
            _id: id
        }).then(apartment => {
            apartment.imgUrl.push(imag);
        });
    },

    //Image Thumbnail Update

    imageLogoUpdate(req, res) {
        const id = req.params.id;
        const oldImgUrl = req.body.oldImgUrl;
        const imgUrl = req.files.imgUrl;
        //console.log(oldImgUrl);
        //res.send(imgUrl.name);

        const imgUrlName = Date.now() + "-" + imgUrl.name;
        const imagesUploads = "./public/images/";
        imgUrl.mv(imagesUploads + imgUrlName, err => {
            if (err) throw err;
        });

        const newImg = {
            imgUrl: imgUrlName
        };

        fs.unlink(imagesUploads + oldImgUrl, err => {
            Product.findByIdAndUpdate({
                    _id: id
                }, newImg)
                .then(() => Product.findById({
                    _id: id
                }))
                .then(global => {
                    res.render("admin/global-config-edit", {
                        product: product
                    });
                });
        });
    },



}