const mongoose = require('mongoose');
const Apartment = require('./../../models/Apartment');

module.exports = ({

    add(req, res) {
        const id = req.params.id;
        const newSubContact = req.body;

        Apartment.findById({ _id: id })
            .then(apartment => {
                apartment.subcontact.push(newSubContact);

                apartment.save()
                    .then(apartment => {
                        res.render('admin/apartment-edit', { apartment: apartment });
                    });

            })


    },

    //Contact each apartment edit
    edit(req, res) {

        const id = req.params.id;
        //const newContact = req.body;
        //res.send(id);


        Apartment.findById({ 'subcontact._id' : id }, function(err, doc){

            

            for(i=0; i < doc.subcontact.length; i++) {
                  //do what you gotta do
                  if (doc.subcontact[i]._id == id ){
                        doc.subcontact[i].title = 'new value xx';
                        res.send(doc.subcontact[i].title);
                  }
                 
            
            }
        })
            // Apartment.update({id: 1}, {$set : {"doc.array": doc.array}}, function(err,doc){
            //       console.log(err);
            // }
        

        // Apartment.findOne({ 'subcontact._id' : id })
        //     .then( apartment => {
        //         apartment.subcontact[0].title = req.body.title;
        //         apartment.subcontact[0].person = req.body.person;
        //         apartment.subcontact[0].phone = req.body.phone;
        //         apartment.subcontact[0].email = req.body.email;
        //         apartment.subcontact[0].title = req.body.title;
        //         apartment.subcontact[0].whatsapp = req.body.whatsapp;
        //         apartment.subcontact[0].skype = req.body.skype;
        //         apartment.subcontact[0].workingHour = req.body.workingHour;

        //         apartment.save()
        //         .then( apartment => {
        //             res.render('admin/apartment-edit-contact', { apartment: apartment });
        //         })
        // });
    },

    //Contact Delete
    delete(req, res) {

        const id = req.params.id;

        Apartment.findOne({ 'subcontact._id': id })
            .then(apartment => {
                apartment.subcontact.pull({ _id: id });
                apartment.save()
                    .then(apartment => {
                        res.render('admin/apartment-edit', { apartment: apartment });
                    });

            })
    },





});