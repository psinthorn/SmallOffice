const mongoose = require('mongoose');
const flash = require('connect-flash');
const Tour = require('./../../models/Tour');
const fs = require('fs');

module.exports = {

     //Add itinerary form 
     itinerary(req, res){
        
                const id = req.params.id;
                Tour.findById({ _id: id })
                .then( tour => {
                    // const newItinerary = { 
                    //     title: req.body.title, 
                    //     value: req.body.value
                    // }

                    const newItinerary = req.body;
                    //res.send(newItinerary);

                    tour.itinerary.push(newItinerary);
                    tour.save()
                    .then(tour => {
                        res.render('admin/tour-edit', { tour: tour });
                    });
                })     
                
            },
        
             //Get edit Form
             itineraryEditForm(req, res){
                const id = req.params.id;
                
                Tour.find({brings: { $elemMatch: { _id: id } }}).project({ "brings": { _id: id } })
                    .then( facSelect => {
                        //res.render('admin/facility-edit', { apartment: apartment });
                        res.send(facSelect);
                    });
            },
        
        
            //Edit Facility 
            itineraryEdit(req, res){
                //const id = req.params.id;
                const id = req.params.id;
                const bringTitle = req.body.title;
               
                Tour.update(
                    { 
                        'brings._id' : id 
                    },
                    { 
                        "$set": { "brings.$.title" : bringTitle }
                    } ,
                    { 
                        "new": true, 
                    }
                  
                )
                .then( tour => {
        
                    //res.render('admin/apartment-edit', { apartment: apartment });
                    res.send(tour);
                })
                               
                          
                 },
        
            //Delete Facility 
            itineraryDelete(req, res){
                const id = req.params.id;
                Tour.findOne({ 'itinerary._id' : id })
                    .then(tour => {
                            tour.itinerary.pull({ _id : id });
                            tour.save()
                            .then(tour => {
                                res.render('admin/tour-edit', { tour: tour });
                            });
                    })
                 },
        
        
}