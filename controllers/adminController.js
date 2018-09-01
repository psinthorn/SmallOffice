const mongoose = require('mongoose');
const passport = require('passport');
const Admin = require('../models/UserAdmin');


module.exports = {

    //Admin Register
    register(req, res) {

        if (req.body.email &&
            req.body.username &&
            req.body.password &&
            req.body.passwordConf) {

            const adminProps = req.body;

            //use schema.create to insert data into the db
            User.create(adminProps)
                .then(admin => {
                    res.render('admin/admin-login', {admin: admin});
                })
        }

    },

    //end admin register
    loginForm(req, res){

        res.render('admin/admin-login');

    },

    //Login Page
    login(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/admin/products',
            failureRedirect: '/admin/login',
            failureFlash: true
        })(req, res, next); 
    },

    //Get all available list of admins
    getAll(req, res) {

        Admin.find({})
            .populate('user')
            .then(admins => {
                res.render('admin/admins-list', { admins: admins });
            });

    },


    //Create form 

    registerForm(req, res) {

        res.render('admin/admin-register');          
    },


    //Create new admin
    create(req, res) {

        let errors = [];
        let successMsg = [];

            const adminProps = req.body;
            
                    Admin.create(adminProps)
                        .then(() => Admin.findOne({}))
                        .then(admin => {
                            res.render('admin/admin-login', { admin: admin });
                    });
         
    },

    //Edit form admin
    editForm(req, res) {

        const id = req.params.id;
        //console.log(id);
        Admin.findById({ _id: id })
            .then(admin => {
                res.render('admin/admin-edit', { admin: admin });
            })
    },

    //Edit form admin
    editUpdate(req, res) {
        const adminProps = req.body;
        const id = req.params.id;

        Admin.findByIdAndUpdate({ _id: id }, adminProps)
            .then(() => Admin.find({}))
            .then((admins) => {
                res.render('admin/admins-list', { admins: admins });
            })
    },

    //Delete admin 
    delete(req, res) {

        const id = req.params.id;

        Admin.findByIdAndRemove({ _id: id })
            .then(() => Admin.find({}))
            .then((admins) => {
                res.render('admin/admins-list', { admins: admins });
            })
    },

    //User logout
    logout(req, res){
        req.logout();
        req.flash('success_msg', 'Logout success');
        res.redirect('/admin/login');
    }


}
