const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema ({
    title: {
        type: String,
        default: 'Contact'
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
        default: '+ 662 999 9999'
    },
    phone1: {
        type: String,
        default: '+ 662 999 9999'
    },
    phone2: {
        type: String,
        default: '+ 662 999 9999'
    },
    phone3: {
        type: String,
        default: '+ 662 999 9999'
    },
    phone4: {
        type: String,
        default: '+ 662 999 9999'
    },
    fax: {
        type: String,
        default: '+ 662 999 9999'
    },
    email: {
        type: String,
        default: 'your-email@domain-name.com'

        // title: {
        //      type: String,
        //      default: 'Email:'
        // },
        // email: {
        //     type: String,
        //     default: 'your-email@domain-name.com'
        // }
    },
    whatsapp: {
        type: String,
        default: '+ 668 999 9999'
    },
    skype: {
        type: String,
        default: 'f2.coltd'
    },
    website: {
        type: String,
        default: 'www.f2.co.th'
    },

    lat: {
        type: String,
        default: '9.532012'
    },
    lng: {
        type: String,
        default: '100.043674'
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