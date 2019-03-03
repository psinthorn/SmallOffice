const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//load user model
const User = mongoose.model('admin');

module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'email'}, (email, password, done) => {
        
        //Match user
        User.findOne({
            email:email          
        })
        .then(user => {
            if(!user){
                return done(null, false, {message: 'No user found'});
            }
         //Compare password
         bcrypt.compare(password, user.password, (err, isMatch) => {
            if(err) throw err;
             if(isMatch){
                return done(null, user);
             }else{
                return done(null, false, {message: 'Your password incorrect! please check password.'});
             }
         });

        });

    }));

    passport.serializeUser(function(user, done){
        done (null, user.id);
    })

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        })   
    });
};