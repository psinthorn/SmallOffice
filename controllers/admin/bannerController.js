const mongoose = require('mongoose');
const Banner = require('../../models/Banner');
const fs = require('fs');


module.exports = {


    //Get all available list of apartments
    getAll(req, res){

        Banner.find({}).sort({ date: -1})
        .then(banners => {
            res.render('admin/banner-list', { banner: banners });
            //res.send(banner);
        });

    },


    //Create form 

    addForm(req, res) {

        Banner.find({})
            .then( (banner) => {
                res.render('admin/banner-add', { banner: banner });
            });   
    },

    //Create new banner
    create(req, res){

        const imgUrl = req.files.imgUrl;
        const imgUrlName = Date.now() + '-' + imgUrl.name;
        const imagesUploads = './public/images/banner/';
        imgUrl.mv(imagesUploads + imgUrlName, (err) => {
            if(err) throw err;
        });

        const bannerProps = new banner({
            title: req.body.title,
            desc: req.body.desc,
            imgUrl: imgUrlName,
            address: req.body.address,
            status: req.body.status,
            user: req.user.id
        });

        Banner.create(bannerProps)
            .then( () => Banner.find({}).sort({date: -1 }))
                .then( (banner) => {     
                           
                    res.render('admin/banner-list', { banner: banner });
                    
            });
    },

    
    //Edit form apartment
    editForm(req, res){

        const id = req.params.id;
        //console.log(id);
        Banner.findById({ _id: id })
            .then( (banner) => {
                res.render('admin/banner-edit', { banner: banner });
            })
    },

    //Edit form banner
    editUpdate(req, res){
        const bannerProps = req.body;
        const id = req.params.id;

        Banner.findByIdAndUpdate({ _id: id }, bannerProps)
            .then( () => Banner.find({}))
                    .then( (banner) => {
                        res.render('admin/banner-list', { banner: banner });
                    })
    },

    //Delete banner 
    delete(req, res){

        const id = req.params.id;

        Banner.findByIdAndRemove({ _id: id })
            .then(() => Banner.find({}))
                .then( (banner) => {
                res.render('admin/banner-list', { banner: banner });
            })
    },


    //upload Thumbnail image form
    image(req, res){
        res.render('admin/image-upload-form');
    },
    //image Thumbnail upload process
    imageUplaod(req, res){

        const id = req.params.id;

        const imgUrl = req.files.imgUrl;
        const imgUrlName = Date.now() + '-' + imgUrl.name;
        const imagesUploads = './public/images/banner/';
        imgUrl.mv(imagesUploads + imgUrlName, (err) => {
            if(err) throw err;
        });

        Banner.findById({ _id: id })
            .then( apartment => {
                apartment.imgUrl.push(imag);
            });

    },

    //Image Thumbnail Update

    imageUpdate(req, res){

        const id = req.params.id;
        const oldImgUrl = req.body.oldImgUrl;
        const imgUrl = req.files.imgUrl;
        //console.log(oldImgUrl);
        //res.send(imgUrl.name);

        const imgUrlName = Date.now() + '-' + imgUrl.name;
        const imagesUploads = './public/images/banner/';
        imgUrl.mv(imagesUploads + imgUrlName, (err) => {
            if(err) throw err;
        });

        const newImg = ({
            imgUrl: imgUrlName
        })

        fs.unlink(imagesUploads + oldImgUrl, (err) => {  
            Banner.findByIdAndUpdate({ _id: id},newImg)
            .then(() => Banner.findById({ _id: id }))
            .then( banner => {
                res.render('admin/banner-edit', { banner: banner });
            });
        });       

    },


    //banner Banner Controller
    //Banner upload image banner form
    banner(req, res){
        res.render('admin/image-banner-upload-form');
    },
    //Banner image upload process
    imageBannerUplaod(req, res){

        const id = req.params.id;

        const imgUrl = req.files.bannerBannerImgUrl;
        const imgUrlName = Date.now() + '-' + imgUrl.name;
        const imagesUploads = './public/images/banner/banner/';
        imgUrl.mv(imagesUploads + imgUrlName, (err) => {
            if(err) throw err;
        });

        Banner.findById({ _id: id })
            .then( banner => {
                Banner.bannerBannerImgUrl.push(imag);
            });

    },

    //Banner Image Update
    imageBannerUpdate(req, res){

        const id = req.params.id;
        const oldImgUrl = req.body.oldImgUrl;
        const imgUrl = req.files.bannerBannerImgUrl;
        //console.log(oldImgUrl);
        //res.send(imgUrl.name);

        const imgUrlName = Date.now() + '-' + imgUrl.name;
        const imagesUploads = './public/images/banner/banner/';
        imgUrl.mv(imagesUploads + imgUrlName, (err) => {
            if(err) throw err;
        });

        const newImg = ({
            bannerBannerImgUrl: imgUrlName
        })

        fs.unlink(imagesUploads + oldImgUrl, (err) => {  
            Banner.findByIdAndUpdate({ _id: id},newImg)
            .then(() => Banner.findById({ _id: id }))
            .then( banner => {
                res.render('admin/banner-edit', { banner: banner });
            });
        });

    },

}