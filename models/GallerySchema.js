const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GallerySchema = new Schema ({
    name: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        default: 'apdl.ca',
        trim: true
          
    }, 
    order: {
        type: String
    },
    desc: {
        type: String,
        default: 'apdl.ca',
        trim: true
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
})

module.exports = GallerySchema;