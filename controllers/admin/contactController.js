const mongoose = require('mongoose');
const Contact = require('../../models/Contact');
const fs   = require('fs');

//const Apartment = mongoose.model('apartment');

module.exports = {

    //Get all available list of apartments
    getAll(req, res){

        Contact.findOne({})
        .then(contact => {
            res.render('admin/contacts-list', { contact: contact });
        });

    },


    //Create form 

    addForm(req, res) {

        Contact.findOne({})
            .then( (contact) => {
                res.render('admin/contact-add', { contact: contact });
            });   
    },

    //Create new Contact
    create(req, res){

        const ContactProps = req.body;
        Contact.create(ContactProps)
            .then( () => Contact.find({}))
                .then( contacts => {
                  
                    res.render('admin/contact-add', { contacts: contacts });

                    //res.send(contacts);
            });
    },

    //Edit form Contact
    editForm(req, res){

        const id = req.params.id;
        //console.log(id);
        Contact.findById({ _id: id })
            .then( contact => {
                res.render('admin/contact-edit', { contact: contact });
            })
    },

    //Edit form Contact
    editUpdate(req, res){
        const contactProps = req.body;
        const id = req.params.id;

        Contact.findByIdAndUpdate({ _id: id }, contactProps)
                .then(() => Contact.find({ _id: id}))
                    .then( () => {
                        res.redirect('/admin/contact');
                    })
    },

    //Delete Contact 
    delete(req, res){

        const id = req.params.id;

        Contact.findByIdAndRemove({ _id: id })
            .then(() => Contact.find({}))
                .then( (contacts) => {
                res.render('admin/contacts-list', { contacts: contacts });
            })
    },

     //image upload process
     imageUplaod(req, res){
        
                const id = req.params.id;
        
                const imgUrl = req.files.imgUrl;
                const imgUrlName = Date.now() + '-' + imgUrl.name;
                const imagesUploads = './public/images/';
                imgUrl.mv(imagesUploads + imgUrlName, (err) => {
                    if(err) throw err;
                });
        
                Contact.findById({ _id: id })
                    .then( apartment => {
                        apartment.imgUrl.push(imag);
                    });
        
            },
        
            //Image Update
        
            imageUpdate(req, res){
        
                const id = req.params.id;
        
                const imgUrl = req.files.imgUrl;
                const oldImgUrl = req.body.oldImgUrl;
                //console.log(oldImgUrl);
                //res.send(imgUrl.name);
                
                const imgUrlName = Date.now() + '-' + imgUrl.name;
                const imagesUploads = './public/images/';
                imgUrl.mv(imagesUploads + imgUrlName, (err) => {
                    if(err) throw err;
                });
        
                const newImg = ({
                    imgUrl: imgUrlName
                });
            
                        fs.unlink('./public/images/'+ oldImgUrl, (err) => {  
                            Contact.findByIdAndUpdate({ _id: id},newImg)
                            .then(() => Contact.findById({ _id: id }))
                                .then( contact => {
                                res.render('admin/contacts-list', { contact: contact });
                            });

                 });
        
            },
        

}