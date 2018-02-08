const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: 'Category Desc'
    },
    status: {
        type: String,
        default: 'public'
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    date:{
        type: Date,
        default: Date.now
    }
})

mongoose.model('category', CategorySchema, 'category');