const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Koh Samui 
//lat: 9.532012
//lng: 100.043674
const locationSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    imgUrl: {
        name: {
            type: String,
            default: 'location/Chaweng-Beach.jpg'
        },
        body: {
            type: String,
            default: 'default'
        },
       
        lat: {
            type: String,
            default: '9.532012'
        },
        lng: {
            type: String,
            default: '100.043674'
        },
        opt1: {
            type: String,
            default: 'Default'
        },
        status: {
            type: String,
            default: 'public' 
        },
        
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        date: {
            type: Date,
            default: Date.now
        }
        
    },

    gallery: [{
        name: {
            type: String,
            default: 'location/Chaweng-Beach.jpg'
        },
        body: {
            type: String,
            default: 'default'
        },
       
        lat: {
            type: String,
            default: '9.532012'
        },
        lng: {
            type: String,
            default: '100.043674'
        },
        opt1: {
            type: String,
            default: 'Default'
        },
        status: {
            type: String,
            default: 'public' 
        },
        
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        date: {
            type: Date,
            default: Date.now
        }
        
    }],

    lat: {
        type: String,
        default: '9.532012'
    },
    lng: {
        type: String,
        default: '100.043674'
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



mongoose.model('location', locationSchema, 'locations' ):