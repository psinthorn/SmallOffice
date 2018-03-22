const mongoose = require('mongoose');
const ApartmentIntro = require('../models/ApartmentIntro');
const Facility = require('../models/Facility');
const Schema = mongoose.Schema;
const LocationSchema = require('../models/LocationSchema');

const ApartmentSchema = new Schema({

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
    subcontact: [{
        type: Schema.Types.ObjectId,
        ref: 'subcontact'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }],
    status: {
        type: String,
        default: 'Unavailable'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'admin'
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

