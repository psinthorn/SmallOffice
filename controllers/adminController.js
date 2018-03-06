const mongoose = require('mongoose');
const Admin = require('../models/UserAdmin');


module.exports = {

    //Admin Register
    register(req, res) {

        if (req.body.email &&
            req.body.username &&
            req.body.password &&
            req.body.passwordConf) {

                const adminProps = req.body;





            // var adminProps = {
            //     email: req.body.email,
            //     username: req.body.username,
            //     password: req.body.password,
            //     passwordConf: req.body.passwordConf,
            // }


            //use schema.create to insert data into the db
            User.create(adminProps)
                .then(admin => {
                    res.render('admin/admin-login', {admin: admin});
                })
        }

    },

    //end admin register

    //Login Page
    login(req, res) {

        res.render('admin/admin-login');

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
    }

}
