const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Transfers = require('./../models/Transfer');


const TransferSchema = new Schema({
   
    from: {
        type: String,
        required: true  
   },
   to: {
     type: String,
     required: true
   },

   category:{
     type: String,
     default: 'Transfers'
 },

   rateType: [{
     vehicleType: {
         type: String,

     },        
     sale: {
         type: String,
          default: '0.00'
     },
     member: {
         type: String,
          default: '0.00'
     },
     discount: {
         type: String,
          default: '0.00'
     },
     promo: {
         type: String,
          default: '0.00'
     },
     net: {
         type: String,
          default: '0.00'
     },
     status: {
         type: String,
         default: 'public'
     },
     active: {
         type: String,
         default: 'sale'
     }

   }],

   sedan: {
    sale: {
        type: String,
         default: '0.00'
    },
    member: {
        type: String,
         default: '0.00'
    },
    discount: {
        type: String,
         default: '0.00'
    },
    promo: {
        type: String,
         default: '0.00'
    },
    net: {
        type: String,
         default: '0.00'
    },
    status: {
        type: String,
        default: 'public'
    },
    active: {
        type: String,
        default: 'sale'
    }

   },

   suv: {
    sale: {
        type: String,
         default: '0.00'
    },
    member: {
        type: String,
         default: '0.00'
    },
    discount: {
        type: String,
         default: '0.00'
    },
    promo: {
        type: String,
         default: '0.00'
    },
    net: {
        type: String,
         default: '0.00'
    },
    status: {
        type: String,
        default: 'public'
    },
    active: {
        type: String,
        default: 'sale'
    }

   },

   minibus: {
    sale: {
        type: String,
         default: '0.00'
    },
    member: {
        type: String,
         default: '0.00'
    },
    discount: {
        type: String,
         default: '0.00'
    },
    promo: {
        type: String,
         default: '0.00'
    },
    net: {
        type: String,
         default: '0.00'
    },
    status: {
        type: String,
        default: 'public'
    },
    active: {
        type: String,
        default: 'sale'
    }

   },


   routeStop: [{
         locationId: {
             type: Schema.Types.ObjectId,
             ref: 'location'
         },
         arriveTime: {
             type: String,
             default: 'N/A'
         }
   }],

   status: {
         type: String,
         default: 'public'
   },
   user: {
       type: Schema.Types.ObjectId,
       ref: 'users'
   },
   date: {
       type: Date,
       default: Date.now
   }

});

const Transfer = mongoose.model('transfers', TransferSchema, 'transfers');
module.exports = Transfer;
