const Contact = require('../models/Contact');
const About = require('../models/About');
const mongoose = require('mongoose');

module.exports = {


index(req, res){
    res.render('index/welcome');
}, 

about(req, res){
    About.findOne({})
        .then( about => {
            res.render('index/about', { about: about });
        })  
},

apartments(req, res){
    res.render('index/apartments');
},

contact(req, res){

    Contact.findOne({})
        .then( contact => {
            res.render('index/contact-us', { contact: contact });
        });
    
}


}