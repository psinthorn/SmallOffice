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

 //authenticate input against database
 UserAdminSchema.statics.authenticate = function (email, password, callback) {
    Admin.findOne({ email: email })
    .exec(function (err, user) {
        if (err) {
        return callback(err)
        } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
        }
        bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
            return callback(null, user);
        } else {
            return callback();
        }
        })
    });
}


//hashing a password before saving it to the database
UserAdminSchema.pre('save', function (next) {
      let user = this;
      bcrypt.hash(user.password, 10, function (err, hash){
        if(err) {
          return next(err);
        }
        user.password = hash;
        user.passwordConf = hash;
        next();
      })
});


var Admin = mongoose.model('admin', UserAdminSchema, 'admins');
module.exports = Admin;