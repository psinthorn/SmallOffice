const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApartmentIntroSchema = new Schema({
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

const ApartmentIntro = mongoose.model('apartmentintro', ApartmentIntroSchema, 'apartmentintros');
module.exports = ApartmentIntro;