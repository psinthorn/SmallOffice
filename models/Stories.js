const mongoose = require('mongoose');
const Schema = mongoose.Schema;


    const StorySchema = new Schema({
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
            default: 'public'
        },
        allowComments:{
            type: Boolean,
            default: true
        },
        category:{
            type: String,
            default: 'Normal'
        },
        comments:[{
            commentBody:{
                type: String,
                required: true
            },
            commentDate:{
                type: Date,
                default: Date.now
            },
            commentUser:{
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }],
        user:{
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        date:{
            type: Date,
            default: Date.now
        }

    });

    //Create collection and schema (modelName, schemaName, collectionName)
    mongoose.model('stories', StorySchema, 'stories');