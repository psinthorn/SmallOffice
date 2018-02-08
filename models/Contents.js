const mongoose = require('mongoose');
const Schema = mongoose.Schema;

    const ContentSchema = new Schema({

        title:{
            type: String,
            required: true
        },
        body:{
            type: String,
            rquired: true
        },
        status:{
            type: String,
            default: '0.00'
        }, 
        imageUrl:{
            type: String,
            default: 'img'
        },  
        category:{
            type: String,
            required: false
        },

        user:{
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        date:{
            type: Date,
            default: Date.now
        }

    });

    //Create collection and schema
    mongoose.model('contents', ContentSchema, 'contents');