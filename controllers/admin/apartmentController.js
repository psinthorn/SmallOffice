

const Apartment = require('../../models/Apartment.js');
const mongoose = require('mongoose');
//const Apartment = mongoose.model('apartment');

module.exports = {

    //Get all available list of apartments
    getAll(req, res){
        Apartment.find()
        .populate('user')
        .then(apartments => {
            res.render('admin/apartments-list', { apartments: apartments });
        });

    },

    //Create new apartment
    create(){},

    //Edit all apartment
    edit(){},

    //Delete apartment 
    delete(){}

}