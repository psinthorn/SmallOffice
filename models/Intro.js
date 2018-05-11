const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IntroSchema = new Schema({
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

const Intro = mongoose.model('intro', IntroSchema, 'intros');
module.exports = Intro;