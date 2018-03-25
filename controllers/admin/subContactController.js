const mongoose = require('mongoose');
const Apartment = require('./../../models/Apartment');


module.exports = ({

    add(req, res) {
        const id = req.params.id;
        const newSubContact = req.body;
        
        Apartment.findById({ _id: id })
            .then( apartment => {
                    apartment.subcontact.push(newSubContact);

                    apartment.save()
                        .then( apartment => {
                            res.render('admin/apartment-edit', { apartment: apartment });
                        });

            })
        

    },

     //Contact each apartment edit
     edit(req, res){
        
                    const id = req.params.id;
                    const newContact = req.body;
                    res.send(newContact);
        
                Apartment.findOne({ 'contact._id': id }, newContact)      
                    .then( apartment => {
                        res.render('admin/apartment-edit', { apartment: apartment });
                    });    
              }, 

    //Contact Delete
     delete(req, res){

            const id = req.params.id;

            Apartment.findOne({ 'subcontact._id': id })
                .then( apartment => {
                    apartment.subcontact.pull({ _id: id});
                    apartment.save()
                        .then( apartment => {
                            res.render('admin/apartment-edit', { apartment: apartment });
                        });

                })
     },





});