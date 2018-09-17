const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AboutSchema = new Schema({
    title: {
        type: String,
        default: 'À Propos'
    },
    desc: {
        type: String
    },
    imgUrl: {
        type: String
    },
    manageBy: {
        type: String,
    },
    status: {
        type: String,
        default: 'public'
    },
    user: {
        type: String,
        default: 'admin'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const About = mongoose.model('about', AboutSchema, 'abouts');
module.exports = About;