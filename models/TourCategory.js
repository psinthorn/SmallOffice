const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TourCategorySchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        default: 'Category Desc'
    },

    imgUrl: {
        type: String,
        default: 'default'
    },
    linkUrl: {
        type: String
    },
    status: {
        type: String,
        default: 'public'
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    date:{
        type: Date,
        default: Date.now
    }
})

const TourCategory = mongoose.model('tour-category', TourCategorySchema, 'tour-categories');
module.exports = TourCategory;