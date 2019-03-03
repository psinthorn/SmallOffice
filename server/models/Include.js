const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IncludeSchema = new Schema({
    title: {
        type: String,
        default: 'Ex. Transfers'
    },
    value: {
        type: String,
        default: 'Description value ex. 52 Sqm'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    status: {
        type: String,
        default: 'Public'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Include = mongoose.model('include', IncludeSchema, 'included');
module.exports = Include;