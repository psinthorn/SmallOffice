const mongoose = require('mongoose');
const ApartmentIntro =require('../../models/ApartmentIntro');


module.exports = {
 
 
 //Intro Route
 getIntro(req, res){
    ApartmentIntro.find({ })
        .then( intro => {
            res.render('admin/apartment-intro', { intro: intro });
        });
},

introForm(req, res){
    res.render('admin/apartment-intro-add');
},

addIntro(req, res){
    const introProps = req.body;
    
    ApartmentIntro.create(introProps)
        .then(() => ApartmentIntro.find({}))
            .then( intro => { 
                res.render('admin/apartment-intro', { intro: intro });
            });
},

editIntroForm(req, res){
    
    const id = req.params.id;

    ApartmentIntro.findById({ _id: id })
        .then( intro => {
            res.render('admin/apartment-intro-edit', { intro: intro });
        });
},

editIntro(req, res){

    const introProps = req.body;
    const id = req.params.id;
    
     ApartmentIntro.findByIdAndUpdate({_id: id }, introProps)
        .then(() => ApartmentIntro.findById({ _id: id }))
            .then( intro => { 
                res.render('admin/apartment-intro-edit', { intro: intro });
            });


}, 

delete(req, res){

    const id = req.params.id;

    ApartmentIntro.findByIdAndRemove({ _id: id })
    .then(() => ApartmentIntro.find({}))
        .then( intro => {
            res.render('admin/apartment-intro', { intro: intro });
        });

}

}