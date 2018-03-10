const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FacilitySchema = new Schema({
    title: {
        type: String,
        default: 'Facility Name'
    },
    value: {
        type: String,
        default: 'Description value ex. 52 Sqm'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    // apartmentId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'apartment'
    // },
    status: {
        type: String,
        default: 'Public'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Facility = mongoose.model('facility', FacilitySchema, 'facilities');
module.exports = Facility;