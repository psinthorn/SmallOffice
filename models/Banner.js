
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BannerSchema = new Schema ({
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
})

const Banner = mongoose.model('banner', BannerSchema, 'banners');
module.exports = Banner;