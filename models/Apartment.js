const mongoose = require('mongoose');
const ApartmentIntro = require('../models/ApartmentIntro');
const Facility = require('../models/Facility');
const Schema = mongoose.Schema;

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
    intro: {
        type: Schema.Types.ObjectId,
        ref: 'apartmentintro'
    },
    status: {
        type: String,
        default: 'Unavailable'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    }

});

// ApartmentSchema.virtual('apartmentCount').get(function() {
//     return this.title.length;
// });


const Apartment = mongoose.model('apartment', ApartmentSchema, 'apartments');
module.exports = Apartment;



