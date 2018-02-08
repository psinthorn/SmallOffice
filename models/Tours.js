const mongoose = require('mongoose');
const Schema = mongoose.Schema;


    const TourSchema = new Schema({
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
        imgUrl:{
            type: String,
            default: 'tours/koh-nangyuan-koh-tao.jpg'
        },
        category:{
            type: String,
            default: 'One Day Trip'
        },
        price:[{
            sale: {
            type: String,
            default: '0.00'
            },
            member: {
                type: String,
                default: '0.00'
            },
            promotion: {
                type: String,
                default: '0.00'
            },
            discount: {
                type: String,
                default: '0.00'
            },
            net: {
                type: String,
                default: '0.00'
            },

        }],
        allowComments:{
            type: Boolean,
            default: true
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
                ref: 'users'
            }
        }],
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
    mongoose.model('tours', TourSchema, 'tours');