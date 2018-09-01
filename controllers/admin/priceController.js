const mongoose = require('mongoose');
const flash = require('connect-flash');
const Product = require('./../../models/Product');


module.exports = {

    //Add itinerary form 
    priceSale(req, res) {

        const id = req.params.id;
        Product.findById({ _id: id })
            .then(product => {
                // const newItinerary = { 
                //     title: req.body.title, 
                //     value: req.body.value
                // }
                const newPrice = req.body.pricesale;
                //res.send(newItinerary);
                product.save()
                    .then(product => {
                        res.render('admin/product-edit', { product: product });
                    });
            })

    },

    //Get price edit Form
    priceSaleEditForm(req, res) {
        const id = req.params.id;

        Product.find({ brings: { $elemMatch: { _id: id } } }).project({ "brings": { _id: id } })
            .then(facSelect => {
                res.render('admin/facility-edit', { product: product });
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
       
        
        Product.findByIdAndUpdate({_id: id}, newPrice)
            
                .then(product => {
                    //console.log(product.price.sale);
                    //res.send(product);
                    res.redirect('/admin/product/'+ id);
                })   
       
    },
    

    //Delete Facility 
    priceSaleDelete(req, res) {
        const id = req.params.id;
        Product.findOne({ 'price.sale._id': id })
            .then(product => {
                product.pricesale.pull({ _id: id });
                product.save()
                    .then(product => {
                        res.render('admin/product-edit', { product: product });
                    });
            })

        
    },

}