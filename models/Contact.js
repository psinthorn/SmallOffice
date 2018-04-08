const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema ({
    title: {
        type: String,
        default: 'Nous Joindre'
    }, 
    desc: {
        type: String,
        default: 'Content Here'
    },
    imgUrl: {
        type: String
    },
    phone: {
        type: String,
        default: '+ 1 514 995-0037'
    },
    email: {
        type: String,
    },
    whatsapp: {
        type: String,
        default: '+ 1 514 995-0037'
    },
    skype: {
        type: String,
        default: 'cristina.toffalo'
    },
    website: {
        type: String,
        default: 'apdl.ca'
    },
    addr1: {
        type: String
    },
    addr2: {
        type: String
    },
     addr3: {
        type: String       
     },
    status: {
        type: String,
        default: 'public'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'admin'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Contact = mongoose.model('contact', ContactSchema, 'contacts');
module.exports = Contact;