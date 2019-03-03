const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PolicySchema = new Schema({
    title: {
        type: String,
    },
    desc: {
        type: String,
    },
    owner: {
        type: String,
    },
    status: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Policy = mongoose.model('policy', PolicySchema, 'policies');
module.exports = Policy;