const mongoose = require('mongoose');
const flash = require('connect-flash');
const Tour = require('./../../models/Tour');


module.exports = {

    //Add itinerary form 
    priceSale(req, res) {

        const id = req.params.id;
        Tour.findById({ _id: id })
            .then(tour => {
                // const newItinerary = { 
                //     title: req.body.title, 
                //     value: req.body.value
                // }
                const newPrice = req.body.pricesale;
                //res.send(newItinerary);
                tour.save()
                    .then(tour => {
                        res.render('admin/tour-edit', { tour: tour });
                    });
            })

    },

    //Get price edit Form
    priceSaleEditForm(req, res) {
        const id = req.params.id;

        Tour.find({ brings: { $elemMatch: { _id: id } } }).project({ "brings": { _id: id } })
            .then(facSelect => {
                res.render('admin/facility-edit', { tour: tour });
                //res.send(facSelect);
            });
    },


    //Edit Facility 
    priceSaleUpdate(req, res) {
        //const id = req.params.id;
        if( !req.params.id || req.params.id == undefined ){
            return 
        }

        const id = req.params.id;
        const newPrice = {
            "price.sale": req.body.pricesale,
            "price.net": req.body.pricenet
        }
       
        
        Tour.findByIdAndUpdate({_id: id}, newPrice)
            
                .then(tour => {
                    //console.log(tour.price.sale);
                    //res.send(tour);
                    res.redirect('/admin/tour/'+ id);
                })   
       
    },
    

    //Delete Facility 
    priceSaleDelete(req, res) {
        const id = req.params.id;
        Tour.findOne({ 'price.sale._id': id })
            .then(tour => {
                tour.pricesale.pull({ _id: id });
                tour.save()
                    .then(tour => {
                        res.render('admin/tour-edit', { tour: tour });
                    });
            })

        
    },

}