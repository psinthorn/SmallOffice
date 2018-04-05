const mongoose = require('mongoose');
const Contact = require('../models/Contact');
const About = require('../models/About');
const Apartment = require('../models/Apartment');
const ApartmentIntro = require('../models/ApartmentIntro');


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

    Apartment.find({status: 'Available'}).sort({ date: -1})
        // .populate('subcontact')
        .then( (apartments) => {
            res.render('index/apartments', { apartments: apartments });
            //res.send(apartments.intro[0].title);
            //console.log(apartments.facilities);
        });
   
},

apartmentsShow(req, res){

    const id = req.params.id;
    
        Apartment.findById({ _id: id })
            .populate('subcontact')
            .then( apartment => {
                res.render('index/apartment-show', { apartment: apartment });   
            }); 
    },

contact(req, res){

    Contact.findOne({})
        .then( contact => {
            res.render('index/contact-us', { contact: contact });
        });
    
},

maps(req, res){

    res.render('index/maps');

},

geocode(req, res){
    res.render('index/geocode');
}


}