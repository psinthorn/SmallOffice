const mongoose = require('mongoose');
const Facility = require('./../models/Bring');
const Schema = mongoose.Schema;
const LocationSchema = require('./../models/LocationSchema');
//const SubContactSchema = require('./../models/SubContactSchema');
const GallerySchema = require('./../models/GallerySchema');


const ProductSchema = new Schema({
    order: {
        no: String
    },
    name: {
        type: String,
    },

    title: {
        type: String,
        
    },
    desc: {
        type: String,
        
    },
    imgUrl: {
        type: String,
        default: 'thumbnail640x480.png'
    },

    productBannerImgUrl: {
        type: String,
        default: 'banner-temp1024x300.jpg'
    },
    category: {
        
        type: String
    },
    gallery: [GallerySchema],
    locations: [LocationSchema],
    address: {
        type: String,
    },
    brings: [{
        title: {
            type: String   
        }, 
        value: {
            type: String
        }
    }],

    included: [{
        title: {
            type: String   
        }, 
        value: {
            type: String
        }
    }],

    excluded: [{
        title: {
            type: String
        }, 
        value: {

        }   
    }],
    itinerary: [{
        order: {
            type: String
        },
        title: {
            type: String,
            trim: true
        },
        timeTable: {
            type: String,
            trim: true
        },
        description: {
            type: String,
    
        },
        location: {
            type: String,
            trim: true
        },
        remark: {
            type: String,
            trim: true
        }
    }],
    price: {
        sale: {
            type: String,
            trim: true,
            default: 0.00
        },
        net: {
            type: String,
            trim: true,
            default: 0.00
        },
        status: {
            type: String,
            default: 'Unavailable'
        }
    },
      
    user: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
     status: {
         type: String,
         default: 'public'
   },

});

// ProductSchema.virtual('apartmentCount').get(function() {
//     return this.title.length;
// });


const Product = mongoose.model('product', ProductSchema, 'products');
module.exports = Product;

//mongoose.model('apartment', ApartmentSchema, 'apartments');

