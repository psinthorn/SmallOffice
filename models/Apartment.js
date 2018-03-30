const mongoose = require('mongoose');
const ApartmentIntro = require('./../models/ApartmentIntro');
const Facility = require('./../models/Facility');
const Schema = mongoose.Schema;
const LocationSchema = require('./../models/LocationSchema');
const SubContactSchema = require('./../models/SubContactSchema');
const GallerySchema = require('./../models/GallerySchema');

const ApartmentSchema = new Schema({
    name: {
        type: String,
    },

    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        default: 'images/location/montreal-ap-01.jpg'
    },
    gallery: [GallerySchema],
    address: {
        type: String,
    },
    facilities: [{
        title: {
            type: String   
        }, 
        value: {
            type: String
        }
    }],
    locations: [LocationSchema],
    subcontact: [SubContactSchema],
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

ApartmentSchema.virtual('apartmentCount').get(function() {
    return this.title.length;
});


const Apartment = mongoose.model('apartment', ApartmentSchema, 'apartments');
module.exports = Apartment;

//mongoose.model('apartment', ApartmentSchema, 'apartments');

