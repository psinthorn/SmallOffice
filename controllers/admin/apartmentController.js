
const Apartment = require('../../models/Apartment');
const mongoose = require('mongoose');
//const Apartment = mongoose.model('apartment');

module.exports = {

    //Login Page
    login(req, res){

        res.render('index/login');

    },

    //Get all available list of apartments
    getAll(req, res){

        Apartment.find({})
        .populate('user')
        .then(apartments => {
            res.render('admin/apartments-list', { apartments: apartments });
        });

    },


    //Create form 

    addForm(req, res) {

        Apartment.find({})
            .then( (apartments) => {
                res.render('admin/apartment-add', { apartments: apartments });
            });   
    },

    //Create new apartment
    create(req, res){

        const apartmentProps = req.body;
        Apartment.create(apartmentProps)
            .then( () => Apartment.find({}))
                .then( apartments => {
                  
                    res.render('admin/apartment-add', { apartments: apartments });

                    //res.send(apartments);
            });
    },

    //Edit form apartment
    editForm(req, res){

        const id = req.params.id;
        //console.log(id);
        Apartment.findById({ _id: id })
            .then( apartment => {
                res.render('admin/apartment-edit', { apartment: apartment });
            })
    },

    //Edit form apartment
    editUpdate(req, res){
        const apartmentProps = req.body;
        const id = req.params.id;

        Apartment.findByIdAndUpdate({ _id: id }, apartmentProps)
                .then(() => Apartment.find({}))
                    .then( (apartments) => {
                        res.render('admin/apartments-list', { apartments: apartments });
                    })
    },

    //Delete apartment 
    delete(req, res){

        const id = req.params.id;

        Apartment.findByIdAndRemove({ _id: id })
            .then(() => Apartment.find({}))
                .then( (apartments) => {
                res.render('admin/apartments-list', { apartments: apartments });
            })
    }

}