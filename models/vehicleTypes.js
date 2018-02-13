const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const vehicleSchema = new Schema ({
    vehicleType: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    imgUrl: {
        type: String,
        default: 'default'
    },
    status: {
        type: String,
        default: 'online'
    },
    date: {
        type: Date,
        default: Date.now
    }
});


mongoose.model('vehicle', vehicleSchema , 'vehicle');