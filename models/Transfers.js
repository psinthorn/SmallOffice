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

      prices: [{
        net: {
            type: String,
            required: true
        }, 
        sale: {
            type: String,
            required: true
        },
        member: {
            type: String,
            required: true
        },
        discount: {
            type: String,
            required: true
        },
        promo: {
            type: String,
            required: true
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