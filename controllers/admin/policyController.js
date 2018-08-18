const mongoose = require('mongoose');
const Policy =require('./../../models/Policy');


module.exports = {
 
 
 //Intro Route
 getPolicy(req, res){
    Policy.find({ })
        .then( policy => {
            res.render('admin/policy', { policy: policy });
        });
},

policyForm(req, res){
    res.render('admin/policy-add');
},

addPolicy(req, res){
    const policyProps = req.body;
    //res.send(policyProps);
    
    Policy.create(policyProps)
        .then(() => Policy.find({}))
            .then( policy => { 
                res.render('admin/policy', { policy: policy });
            });
},

editPolicyForm(req, res){
    
    const id = req.params.id;

    Policy.findById({ _id: id })
        .then( policy => {
            res.render('admin/policy-edit', { policy: policy });
        });
},

editPolicy(req, res){

    const policyProps = req.body;
    const id = req.params.id;
    
     Policy.findByIdAndUpdate({_id: id }, policyProps)
        .then(() => Policy.findById({ _id: id }))
            .then( policy => { 
                res.render('admin/policy-edit', { policy: policy });
            });


}, 

delete(req, res){

    const id = req.params.id;

    Policy.findByIdAndRemove({ _id: id })
    .then(() => Policy.find({}))
        .then( policy => {
            res.render('admin/policy', { policy: policy });
        });

}

}