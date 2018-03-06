
const Facility = require('../../models/Facility');
const mongoose = require('mongoose');


module.exports = {

    //Get facility list
    getAll(req, res){
        
        Facility.find({})
            .then((facilities) => {
                
                    res.render('admin/facility-list', { facilities: facilities });       
        });

    },

    //Get addForm
    addForm(req, res){
        
        Facility.find({})
            .then((facilities) => {
                res.render('admin/facility-add', { facilities: facilities });
            });
    },

    //Post facility to mongoDB
    create(req, res){

        const facilityProps = req.body;

        Facility.create(facilityProps)
            .then(() => Facility.find({}))
                .then( (facilities) => {

                    res.render('admin/facility-add', { facilities: facilities });
                });
    },

    //Get edit Form
    editForm(req, res){
        const id = req.params.id;
        
        Facility.findById({ _id: id })
            .then( facility => {
                res.render('admin/facility-edit', { facility: facility });
            });
    },

    //Update data to mongoDB
    editUpdate(req, res){
        const id = req.params.id;
        const facilityProps = req.body;

        Facility.findByIdAndUpdate({ _id: id }, facilityProps)
            .then(() => Facility.find({}))
                .then((facilities) => {
                    res.render('admin/facility-list', { facilities: facilities });
                });
    },

    //Remove facility from mongoDB
    delete(req,res){
        
        const id = req.params.id;
        Facility.findByIdAndRemove({ _id: id })
            .then( () => {
                res.render('admin/facility-list');
            })
    }

}
