const mongoose = require('mongoose');
const ApartmentIntro = require('./../models/ApartmentIntro');
const Facility = require('./../models/Bring');
const Schema = mongoose.Schema;
const LocationSchema = require('./../models/LocationSchema');
const SubContactSchema = require('./../models/SubContactSchema');
const GallerySchema = require('./../models/GallerySchema');

const TourSchema = new Schema({
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
        default: 'images/locations/koh-nangyuan-koh-tao.jpg'
    },
    gallery: [GallerySchema],
    locations: [LocationSchema],
    subcontact: [SubContactSchema],
    address: {
        type: String,
    },
    brings: [{
        title: {
            type: String   
        }, 
        value: {
            type: String
        }
    }],
    
    status: {
        type: String,
        default: 'Unavailable'
    },
    user: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }

});

TourSchema.virtual('apartmentCount').get(function() {
    return this.title.length;
});


const Tour = mongoose.model('tour', TourSchema, 'tours');
module.exports = Tour;

//mongoose.model('apartment', ApartmentSchema, 'apartments');

