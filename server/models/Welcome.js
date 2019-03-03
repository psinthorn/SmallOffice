const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GallerySchema = require('./../models/GallerySchema');


const WelcomeSchema = new Schema({
    order: {
        no: String
    },
    name: {
        type: String,
    },

    title: {
        type: String,
        
    },
    desc: {
        type: String,
        
    },
    imgUrl: {
        type: String,
        default: 'thumbnail640x480.png'
    },

    welcomeBannerImgUrl: {
        type: String,
        default: 'banner-temp1024x300.jpg'
    },
    category: {
        
        type: String
    },
    gallery: [GallerySchema],
    address: {
        type: String,
    },
    
    user: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
     status: {
         type: String,
         default: 'public'
   },

});



const Welcome = mongoose.model('welcome', WelcomeSchema, 'welcomes');
module.exports = Welcome;

//mongoose.model('apartment', ApartmentSchema, 'apartments');

