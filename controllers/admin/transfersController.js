
const mongoose = require('mongoose');
const Transfers = require('../../models/Transfer');
const fs = require('fs');


module.exports = {


    //Get all available list of transfers
    getAll(req, res){

        Transfers.find({}).sort({ date: -1})
        .then(transfers => {
            res.render('admin/transfers-list', { transfers: transfers });
           
        });

    },

    edit(req, res){
        
                Transfers.find({}).sort({ date: -1})
                .then(transfers => {
                    res.render('admin/transfers-edit', { transfers: transfers });
                   
                });
        
            },


    //Create form 

    addForm(req, res) {
                res.render('admin/transfer-add');        
    },

    //Create new transfer
    create(req, res){
        const transferProps = req.body;
        
        Transfers.create(transferProps)
            .then( () => Transfers.find({}).sort({date: -1 }))
                .then( transfers => {     
                    let success_msg =          
                    res.render('admin/transfers-list', { transfers: transfers });
            });
    },

    
    //Edit form transfer
    editForm(req, res){

        const id = req.params.id;
        Transfers.findById({ _id: id })
            .then( (transfer) => {
                res.render('admin/transfer-edit', { transfer: transfer });
            })
    },

    //Edit form transfer
    editUpdate(req, res){
        const transferProps = req.body;
        const id = req.params.id;

        Transfers.findByIdAndUpdate({ _id: id }, transferProps)
            .then( () => Transfers.find({ _id: id }).sort({date: -1})
                .then( transfer => {
                    res.redirect(`/admin/transfer/edit/${ id }`);
                })
        )
                    
    },

     //Edit form sedan
     updateRate(req, res){
        const transferProps = {
            'sedan.sale': req.body.sedansale,
            'sedan.member': req.body.sedanmember,
            'sedan.promo': req.body.sedanpromo,
            'sedan.net': req.body.sedannet,
            'sedan.active': req.body.sedanactive,
            'sedan.status': req.body.sedanstatus,

            'suv.sale': req.body.suvsale,
            'suv.member': req.body.suvmember,
            'suv.promo': req.body.suvpromo,
            'suv.net': req.body.suvnet,
            'suv.active': req.body.suvactive,
            'suv.status': req.body.suvstatus,

            'minibus.sale': req.body.minibussale,
            'minibus.member': req.body.minibusmember,
            'minibus.promo': req.body.minibuspromo,
            'minibus.net': req.body.minibusnet,
            'minibus.active': req.body.minibusactive,
            'minibus.status': req.body.minibusstatus
        };
        //res.send(transferProps);
        const id = req.params.id;

        Transfers.findByIdAndUpdate({ _id: id }, transferProps)
            .then( () => Transfers.find({ _id: id }).sort({date: -1})
                .then( transfer => {
                    res.redirect(`/admin/transfer/edit/${ id }`);
                })
        )
                    
    },

    //Edit form sedan
    updateSedan(req, res){
        const transferProps = {
            'sedan.sale': req.body.sale,
            'sedan.member': req.body.member,
            'sedan.promo': req.body.promo,
            'sedan.net': req.body.net,
            'sedan.active': req.body.active,
            'sedan.status': req.body.status,

           
        };
        //res.send(transferProps);
        const id = req.params.id;

        Transfers.findByIdAndUpdate({ _id: id }, transferProps)
            .then( () => Transfers.find({ _id: id }).sort({date: -1})
                .then( transfer => {
                    res.redirect(`/admin/transfer/edit/${ id }`);
                })
        )
                    
    },

     //Edit form sedan
     updateSuv(req, res){
        const transferProps = {
            'suv.sale': req.body.sale,
            'suv.member': req.body.member,
            'suv.promo': req.body.promo,
            'suv.net': req.body.net,
            'suv.active': req.body.active,
            'suv.status': req.body.status
        };
        //res.send(transferProps);
        const id = req.params.id;

        Transfers.findByIdAndUpdate({ _id: id }, transferProps)
            .then( () => Transfers.find({ _id: id }).sort({date: -1})
                .then( transfer => {
                    res.redirect(`/admin/transfer/edit/${ id }`);
                })
        )
                    
    },


     //Edit form sedan
     updateMinibus(req, res){
        const transferProps = {
            'minibus.sale': req.body.sale,
            'minibus.member': req.body.member,
            'minibus.promo': req.body.promo,
            'minibus.net': req.body.net,
            'minibus.active': req.body.active,
            'minibus.status': req.body.status
        };
       
        const id = req.params.id;

        Transfers.findByIdAndUpdate({ _id: id }, transferProps)
            .then( () => Transfers.find({ _id: id }).sort({date: -1})
                .then( transfer => {
                    res.redirect(`/admin/transfer/edit/${ id }`);
                })
        )
                    
    },

    //Delete transfer
    delete(req, res){
        const id = req.params.id;
        Transfers.findByIdAndRemove({ _id: id })
            .then(() => Transfers.find({}).sort({date: -1})
                .then( (transfers) => {
                    res.render('admin/transfers-list', { transfers: transfers });
                })
        )
                
    },

        
}