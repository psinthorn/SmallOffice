
const mongoose = require('mongoose');
const About = require('../../models/About');


module.exports = {

    //Get all available list of apartments
    getAll(req, res) {

        About.findOne({})
            .then(about => {
                res.render('admin/about-list', { about: about });

            });

    },


    //Create form 

    addForm(req, res) {

        About.findOne({})
            .then((about) => {
                res.render('admin/about-add');
            });
    },

    //Create new about
    create(req, res) {

        const aboutProps = req.body;
        About.create(aboutProps)
            .then(() => About.findOne({}))
            .then(about => {
                res.render('admin/about-add', { about: about });
                //res.send(abouts);
            });
    },

    //Edit form about
    editForm(req, res) {

        const id = req.params.id;
        //console.log(id);
        About.findById({ _id: id })
            .then(about => {
                res.render('admin/about-edit', { about: about });
            })
    },

    //Edit form about
    editUpdate(req, res) {
        const aboutProps = req.body;
        const id = req.params.id;

        About.findByIdAndUpdate({ _id: id }, aboutProps)
            .then(() => About.find({ _id: id }))
            .then(() => {
                req.flash('success_msg', 'Update completed.');
                res.redirect('/admin/about');
            })
    },

    //Delete about 
    delete(req, res) {

        const id = req.params.id;

        About.findByIdAndRemove({ _id: id })
            .then(() => About.find({}))
            .then((about) => {
                res.render('admin/abouts-list', { about: about });
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

        let aboutProps = ({
            imgUrl: imgUrlName
        })


        About.findByIdAndUpdate({ _id: id }, aboutProps)
            .then(about => {
                res.render('/admin/about', { about: about });
            });

    },


    //Image Update

    imageUpdate(req, res) {

        const id = req.params.id;
        const imgUrl = req.files.imgUrl;

        //res.send(imgUrl.name);

        const imgUrlName = 'about-' + Date.now() + '-' + imgUrl.name;
        const imagesUploads = './public/images/';
        imgUrl.mv(imagesUploads + imgUrlName, (err) => {
            if(err) throw err;
        });

        //res.send(imgUrlName);

        const newImg = ({
            imgUrl: imgUrlName
        })


        About.findByIdAndUpdate({ _id: id}, newImg)
            .then(() => About.findById({ _id: id }))
            .then( about => {
                res.render('admin/about-edit', { about: about });
            });

    },




}