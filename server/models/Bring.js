const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BringSchema = new Schema({
    title: {
        type: String,
        default: 'Name'
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

const Bring= mongoose.model('bring', BringSchema, 'brings');
module.exports = Bring;