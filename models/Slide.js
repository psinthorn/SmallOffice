const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SlideSchema = new Schema ({
    name: {
        type: String,
        trim: true
    },
    title: {
        type: String,
        trim: true
    },
    desc: {
        type: String,
        default: 'Welcome to Samui Ocean Tour',
        trim: true
          
    }, 
    order: {
        type: String
    },

    status: {
        type: String,
        default: 'Public',
        
    },
    user: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Slide = mongoose.model('slide', SlideSchema, 'slides');
module.exports = Slide;