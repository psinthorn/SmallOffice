const mongoose = require('mongoose');
const Apartment = require('../../models/Apartment');
const ApartmentIntro =require('../../models/ApartmentIntro');


module.exports = {
 
 
 //Intro Route
 getIntro(req, res){
    ApartmentIntro.findOne({})
        .then( intro => {
            res.render('admin/apartment-intro', { intro: intro });
            //res.send('inro');
        });
},

introForm(req, res){
    res.render('admin/apartment-intro-add');
},

addIntro(req, res){
    const introProps = req.body;
    
    ApartmentIntro.create(introProps)
        .then(() => ApartmentIntro.findOne({}))
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
        .then(() => ApartmentIntro.findOne({}))
            .then( intro => { 
                res.render('admin/apartment-intro', { intro: intro });
            });


}

}