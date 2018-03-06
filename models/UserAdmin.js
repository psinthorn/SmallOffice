const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var UserAdminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  },
  level: {
      type: String,
      default: 'administrator'
  },
  status: {
      type: String,
      trim: true,
      default: 'Active'

  },
  date: {
      type: Date,
      default: Date.now
  }
});


//hashing a password before saving it to the database
UserAdminSchema.pre('save', function (next) {
      let user = this;
      bcrypt.hash(user.password, 10, function (err, hash){
        if(err) {
          return next(err);
        }
        user.password = hash;
        next();
      })
});


var Admin = mongoose.model('admin', UserAdminSchema, 'admins');
module.exports = Admin;