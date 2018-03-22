const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({

    title: {
        type: String,
        
    },
    content: {
        type: String,
    },
    addr1: {
        type: String
    },
    addr2: {
        type: String
    },
    district: {
        type: String
    },
    city: {
        type: String
    },
    province: {
        type: String
    },
    country: {
        type: String
    },
    postCode: {
        type: String
    },
    lat: {
        type: String,
        default: '9.532012'
    },
    lng: {
        type: String,
        default: '100.043674'
    },
    img: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
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

module.exports = LocationSchema;