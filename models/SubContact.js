const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubContactSchema = new Schema ({
    title: {
        type: String,
        default: 'Nous Joindre',
        required: false
        
    }, 
    person: {
        type: String,
        default: 'Content Here',
        required: false
    },
    email: {
        type: String,
        required: false
    },

    phone: {
        type: String,
        default: '+ 1 514 995-0037',
        required: false
    },
    whatsapp: {
        type: String,
        default: '+ 1 514 995-0037',
        required: false
    },
    skype: {
        type: String,
        default: 'cristina.toffalo',
        required: false
    },
    website: {
        type: String,
        default: 'apdl.ca',
        required: false
    },
    workingHour: {
        type: String,
        required: false
    },
    opt1: {
        type: String,
        required: false
    },
     opt2: {
        type: String,
        required: false     
     },

    status: {
        type: String,
        default: 'Public',
        
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'admin',
        
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const SubContact = mongoose.model('subcontact', SubContactSchema, 'subcontacts');
module.exports = SubContact;

//mongoose.model('subcontact', SubContactSchema, 'subcontacts');