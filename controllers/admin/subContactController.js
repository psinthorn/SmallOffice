const mongoose = require('mongoose');
const Tour = require('./../../models/Tour');

module.exports = ({

    add(req, res) {
        const id = req.params.id;
        const newSubContact = req.body;

        Tour.findById({ _id: id })
            .then(tour => {
                tour.subcontact.push(newSubContact);

                tour.save()
                    .then(tour => {
                        res.render('admin/tour-edit', { tour: tour });
                    });

            })


    },

    //Contact each apartment edit
    edit(req, res) {

        const id = req.params.id;
        //const newContact = req.body;
        //res.send(id);


        Tour.findById({ 'subcontact._id' : id }, function(err, doc){

            

            for(i=0; i < doc.subcontact.length; i++) {
                  //do what you gotta do
                  if (doc.subcontact[i]._id == id ){
                        doc.subcontact[i].title = 'new value xx';
                        res.send(doc.subcontact[i].title);
                  }
                 
            
            }
        })
            
    },

    //Contact Delete
    delete(req, res) {

        const id = req.params.id;

        Tour.findOne({ 'subcontact._id': id })
            .then(tour => {
                tour.subcontact.pull({ _id: id });
                tour.save()
                    .then(tour => {
                        res.render('admin/tour-edit', { tour: tour });
                    });

            })
    },





});