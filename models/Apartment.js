const mongoose = require('mongoose');
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
        type: Schema.Types.ObjectId,
        ref: 'localtion'
    },
    facilties: [{
        type: Schema.Types.ObjectId,
        ref: 'facility'
    }],
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

const Apartment = mongoose.model('apartment', ApartmentSchema, 'apartments');
module.exports = Apartment;



