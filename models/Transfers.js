const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransferSchema = new Schema ({

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
            default: '0.00'
        },
        
        vehicleDesc: {
            type: String,
            default: 'Seat, Luggage'
        },  

        imgURL: {
            type: String,
            default: 'image URL'
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

})

mongoose.model('transfers', TransferSchema, 'transfers');