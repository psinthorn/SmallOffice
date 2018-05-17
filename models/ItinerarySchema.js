const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItinerarySchema = new Schema ({

    title: {
        type: String,
        trim: true
    },
    timeTable: {
        type: String,
        trim: true
    },
    description: {
        type: String,

    },
    location: {
        type: String,
        trim: true
    },
    remark: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        default: 'Unpublished'
    },
    user: {
        type: String,
        trim: true,
        default: 'Admin'
    },
    date: {
        type: Date,
        default: Date.now
    },

});

//const Itinerary = mongoose.model('Itinerary', ItinerarySchema, 'Itineraries');
module.export = ItinerarySchema;