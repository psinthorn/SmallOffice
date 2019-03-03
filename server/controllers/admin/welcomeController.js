const mongoose = require('mongoose');
const Welcome = require('../../models/Welcome');
const Banner = require('../../models/Banner');
const fs = require('fs');


module.exports = {


   
    

    //Welcome Page
    index(req, res){

         let promisesAll = [

            // Product.find({status: 'Public'}).sort({ date: -1}).exec(),
            // Intro.find({ status: 'Public'}).exec(),
            // Contact.find({}).exec(),
            Welcome.find({status: 'Public'}).sort({ date: -1}).exec(),
            Banner.find({status: 'Public'}).exec()

            ];

            Promise.all(promisesAll)
            .then( ([welcome, banner]) => {
                    res.render('index/welcome', { welcome: welcome, banner: banner });          
        });


        // Welcome.findOne({})
        // .then( welcome => {
        //     res.render('index/welcome', { welcome: welcome });
        // })  
    },

    //Get all available list of apartments
    getAll(req, res){

        Welcome.find({}).sort({ date: -1})
        .then(welcomes => {
            res.render('admin/welcomes-list', { welcomes: welcomes });
            //res.send(welcomes);
        });

    },


    //Create form 

    addForm(req, res) {

        Welcome.find({})
            .then( (welcomes) => {
                res.render('admin/welcome-add', { welcomes: welcomes });
            });   
    },

    //Create new welcome
    create(req, res){

        const imgUrl = req.files.imgUrl;
        const imgUrlName = Date.now() + '-' + imgUrl.name;
        const imagesUploads = './public/images/welcome/';
        imgUrl.mv(imagesUploads + imgUrlName, (err) => {
            if(err) throw err;
        });

        const welcomeProps = new Welcome({
            title: req.body.title,
            desc: req.body.desc,
            imgUrl: imgUrlName,
            address: req.body.address,
            status: req.body.status,
            user: req.user.id
        });
        

        Welcome.create(welcomeProps)
            .then( () => Welcome.find({}).sort({date: -1 }))
                .then( (welcomes) => {     
                           
                res.render('admin/welcomes-list', { welcomes: welcomes });
                    
            });
    },

    
    //Edit form apartment
    editForm(req, res){

        const id = req.params.id;
        //console.log(id);
        Welcome.findById({ _id: id })
            .populate('subcontact')
            .then( (welcome) => {
                res.render('admin/welcome-edit', { welcome: welcome });
            })
    },

    //Edit form welcome
    editUpdate(req, res){
        const welcomeProps = req.body;
        const id = req.params.id;

        Welcome.findByIdAndUpdate({ _id: id }, welcomeProps)
            .then( () => Welcome.find({}))
                    .then( (welcomes) => {
                        res.render('admin/welcomes-list', { welcomes: welcomes });
                    })
    },

    //Delete welcome 
    delete(req, res){

        const id = req.params.id;

        Welcome.findByIdAndRemove({ _id: id })
            .then(() => Welcome.find({}))
                .then( (welcomes) => {
                res.render('admin/welcomes-list', { welcomes: welcomes });
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
        const imagesUploads = './public/images/welcome/';
        imgUrl.mv(imagesUploads + imgUrlName, (err) => {
            if(err) throw err;
        });

        Welcome.findById({ _id: id })
            .then( welcome => {
                welcome.imgUrl.push(imag);
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
        const imagesUploads = './public/images/welcome/';
        imgUrl.mv(imagesUploads + imgUrlName, (err) => {
            if(err) throw err;
        });

        const newImg = ({
            imgUrl: imgUrlName
        })

        fs.unlink(imagesUploads + oldImgUrl, (err) => {  
            Welcome.findByIdAndUpdate({ _id: id},newImg)
            .then(() => Welcome.findById({ _id: id }))
            .then( welcome => {
                res.render('admin/welcome-edit', { welcome: welcome });
            });
        });
    
        

    },



    //welcome Banner Controller
    //Banner upload image banner form
    banner(req, res){
        res.render('admin/image-banner-upload-form');
    },
    //Banner image upload process
    imageBannerUplaod(req, res){

        const id = req.params.id;

        const imgUrl = req.files.welcomeBannerImgUrl;
        const imgUrlName = Date.now() + '-' + imgUrl.name;
        const imagesUploads = './public/images/welcome/banner/';
        imgUrl.mv(imagesUploads + imgUrlName, (err) => {
            if(err) throw err;
        });

        Welcome.findById({ _id: id })
            .then( welcome => {
                welcome.welcomeBannerImgUrl.push(imag);
            });

    },

    //Banner Image Update
    imageBannerUpdate(req, res){

        const id = req.params.id;
        const oldImgUrl = req.body.oldImgUrl;
        const imgUrl = req.files.welcomeBannerImgUrl;
        //console.log(oldImgUrl);
        //res.send(imgUrl.name);

        const imgUrlName = Date.now() + '-' + imgUrl.name;
        const imagesUploads = './public/images/welcome/banner/';
        imgUrl.mv(imagesUploads + imgUrlName, (err) => {
            if(err) throw err;
        });

        const newImg = ({
            welcomeBannerImgUrl: imgUrlName
        })

        fs.unlink(imagesUploads + oldImgUrl, (err) => {  
            Welcome.findByIdAndUpdate({ _id: id},newImg)
            .then(() => Welcome.findById({ _id: id }))
            .then( welcome => {
                res.render('admin/welcome-edit', { welcome: welcome });
            });
        });
    
        

    },

}