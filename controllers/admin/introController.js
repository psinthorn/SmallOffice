const mongoose = require('mongoose');
const Intro =require('../../models/Intro');


module.exports = {
 
 
 //Intro Route
 getIntro(req, res){
    Intro.find({ })
        .then( intro => {
            res.render('admin/tour-intro', { intro: intro });
        });
},

introForm(req, res){
    res.render('admin/tour-intro-add');
},

addIntro(req, res){
    const introProps = req.body;
    
    Intro.create(introProps)
        .then(() => Intro.find({}))
            .then( intro => { 
                res.render('admin/tour-intro', { intro: intro });
            });
},

editIntroForm(req, res){
    
    const id = req.params.id;

    Intro.findById({ _id: id })
        .then( intro => {
            res.render('admin/tour-intro-edit', { intro: intro });
        });
},

editIntro(req, res){

    const introProps = req.body;
    const id = req.params.id;
    
     Intro.findByIdAndUpdate({_id: id }, introProps)
        .then(() => Intro.findById({ _id: id }))
            .then( intro => { 
                res.render('admin/tour-intro-edit', { intro: intro });
            });


}, 

delete(req, res){

    const id = req.params.id;

    Intro.findByIdAndRemove({ _id: id })
    .then(() => Intro.find({}))
        .then( intro => {
            res.render('admin/tour-intro', { intro: intro });
        });

}

}