
const About = require('../../models/About');
const mongoose = require('mongoose');

module.exports = {

     //Get all available list of apartments
     getAll(req, res){
        
                About.findOne({})
                .then(about => {
                    res.render('admin/about-list', { about: about });
                });
        
        },
        
        
            //Create form 
        
            addForm(req, res) {
        
                About.findOne({})
                    .then( (about) => {
                        res.render('admin/about-add');
                    });   
            },
        
            //Create new about
            create(req, res){

                const aboutProps = req.body;
                About.create(aboutProps)
                    .then( () => About.findOne({}))
                        .then( about => {
                            res.render('admin/about-add', { about: about });  
                            //res.send(abouts);
                    });
            },
        
            //Edit form about
            editForm(req, res){
        
                const id = req.params.id;
                //console.log(id);
                About.findById({ _id: id })
                    .then( about => {
                        res.render('admin/about-edit', { about: about });
                    })
            },
        
            //Edit form about
            editUpdate(req, res){
                const aboutProps = req.body;
                const id = req.params.id;
        
                About.findByIdAndUpdate({ _id: id }, aboutProps)
                        .then(() => About.find({ _id: id}))
                            .then( () => {
                                res.redirect('/admin/about');
                            })
            },
        
            //Delete about 
            delete(req, res){
        
                const id = req.params.id;
        
                About.findByIdAndRemove({ _id: id })
                    .then(() => About.find({}))
                        .then( (about) => {
                        res.render('admin/abouts-list', { about: about });
                    })
            }

}