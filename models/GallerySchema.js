const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GallerySchema = new Schema ({
    name: {
        type: String
    },
    title: {
        type: String,
        default: 'apdl.ca',
        
        
    }, 
    desc: {
        type: String,
        default: 'apdl.ca',
        
    },
   
    status: {
        type: String,
        default: 'Public',
        
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'admin',
        
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = GallerySchema;