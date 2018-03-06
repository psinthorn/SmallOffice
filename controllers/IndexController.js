const Contact = require('../models/Contact');
const mongoose = require('mongoose');

module.exports = {


index(req, res){
    res.render('index/welcome');
}, 

about(req, res){

    res.render('index/about');
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