
const mongoose = require('mongoose');
const Apartment = require('../../models/Apartment');
//const ApartmentIntro =require('../../models/ApartmentIntro');
const Facility = require('../../models/Facility');
const SubContact = require('../../models/SubContact');
const fs = require('fs');


module.exports = {


    //Get all available list of apartments
    getAll(req, res){

        Apartment.find({}).sort({ date: -1})
        .then(apartments => {
            res.render('admin/apartments-list', { apartments: apartments });
            //res.send('Hello list');
        });

    },


    //Create form 

    addForm(req, res) {

        Apartment.find({})
            .then( (apartments) => {
                res.render('admin/apartment-add', { apartments: apartments });
            });   
    },

    //Create new apartment
    create(req, res){

        const imgUrl = req.files.imgUrl;
        const imgUrlName = Date.now() + '-' + imgUrl.name;
        const imagesUploads = './public/images/apartment/';
        imgUrl.mv(imagesUploads + imgUrlName, (err) => {
            if(err) throw err;
        });

        const apartmentProps = new Apartment({
            title: req.body.title,
            desc: req.body.desc,
            imgUrl: imgUrlName,
            address: req.body.address,
            status: req.body.status,
            user: req.user.id
        });

        Apartment.create(apartmentProps)
            .then( () => Apartment.find({}).sort({date: -1 }))
                .then( apartments => {     
                    let success_msg =          
                    res.render('admin/apartments-list', { apartments: apartments });
                    //res.redirect('/admin/apartments');
            });
    },

    
    //Edit form apartment
    editForm(req, res){

        const id = req.params.id;
        //console.log(id);
        Apartment.findById({ _id: id })
            .populate('subcontact')
            .then( (apartment) => {
                res.render('admin/apartment-edit', { apartment: apartment });
            })
    },

    //Edit form apartment
    editUpdate(req, res){
        const apartmentProps = req.body;
        const id = req.params.id;

        Apartment.findByIdAndUpdate({ _id: id }, apartmentProps)
            .then( () => Apartment.find({}))
                    .then( (apartments) => {
                        res.render('admin/apartments-list', { apartments: apartments });
                    })
    },

    //Delete apartment 
    delete(req, res){

        const id = req.params.id;

        Apartment.findByIdAndRemove({ _id: id })
            .then(() => Apartment.find({}))
                .then( (apartments) => {
                res.render('admin/apartments-list', { apartments: apartments });
            })
    },


    //upload image form
    image(req, res){
        res.render('admin/image-upload-form');
    },
    //image upload process
    imageUplaod(req, res){

        const id = req.params.id;

        const imgUrl = req.files.imgUrl;
        const imgUrlName = Date.now() + '-' + imgUrl.name;
        const imagesUploads = './public/images/apartment/';
        imgUrl.mv(imagesUploads + imgUrlName, (err) => {
            if(err) throw err;
        });

        Apartment.findById({ _id: id })
            .then( apartment => {
                apartment.imgUrl.push(imag);
            });

    },

    //Image Update

    imageUpdate(req, res){

        const id = req.params.id;
        const oldImgUrl = req.body.oldImgUrl;
        const imgUrl = req.files.imgUrl;
        //console.log(oldImgUrl);
        //res.send(imgUrl.name);

        const imgUrlName = Date.now() + '-' + imgUrl.name;
        const imagesUploads = './public/images/apartment/';
        imgUrl.mv(imagesUploads + imgUrlName, (err) => {
            if(err) throw err;
        });

        const newImg = ({
            imgUrl: imgUrlName
        })

        fs.unlink(imagesUploads + oldImgUrl, (err) => {  
            Apartment.findByIdAndUpdate({ _id: id},newImg)
            .then(() => Apartment.findById({ _id: id }))
            .then( apartment => {
                res.render('admin/apartment-edit', { apartment: apartment });
            });
        });
    
        

    },


   

    //Add facility form 
    facility(req, res){

        const id = req.params.id;
        Apartment.findById({ _id: id })
        .then( apartment => {
            const newFacility = { 
                title: req.body.title, 
                value: req.body.value
            }
            apartment.facilities.push(newFacility);
            apartment.save()
            .then(apartment => {
                res.render('admin/apartment-edit', { apartment: apartment });
            });
        })     
        
    },

     //Get edit Form
     facilityEditForm(req, res){
        const id = req.params.id;
        
        Apartment.find({facilities: { $elemMatch: { _id: id } }}).project({ "facilities": { _id: id } })
            .then( facSelect => {
                //res.render('admin/facility-edit', { apartment: apartment });
                res.send(facSelect);
            });
    },


    //Edit Facility 
    facilityEdit(req, res){
        //const id = req.params.id;
        const id = req.params.id;
        const facTitle = req.body.title;
       
        Apartment.update(
            { 
                'facilities._id' : id 
            },
            { 
                "$set": { "facilities.$.title" : facTitle }
            } ,
            { 
                "new": true, 
            }
          
        )
        .then( apartment => {

            //res.render('admin/apartment-edit', { apartment: apartment });
            res.send(apartment);
        })
                       
                  
         },

    //Delete Facility 
    facilityDelete(req, res){
        const id = req.params.id;
        Apartment.findOne({ 'facilities._id' : id })
            .then(fac => {
                    fac.facilities.pull({ _id : id });
                    fac.save()
                    .then(apartment => {
                        res.render('admin/apartment-edit', { apartment: apartment });
                    });
            })
         },





      //Contact each apartment
      contactAdd(req, res){

            const id = req.params.id;
            const newContact = new SubContact({
                title: req.body.title,
                email: req.body.email,
                person: req.body.person 
            });

            const apartment = Apartment.findById({ _id: id })
                .then( apartment => {
                    apartment.subcontact.push(newContact);
                    Promise.all([newContact.save(),apartment.save() ]) 
                        .then( () => Apartment.findById({ _id: id }))
                            //.populate('subcontact')
                            .then( apartment => {
                              res.render('admin/apartment-edit', { apartment: apartment }); 
                             //res.send(apartment);
                        })
                                
                })
                    
        },  

      //Contact Edit Form 
      contactEditForm(req, res){

                    const id = req.params.id;
                    // const newContact = req.body;

                    Apartment.findOne({'subcontact._id': id })
                        .then( apartment => {
                            res.render('admin/apartment-edit-contact', { apartment: apartment }); 
                    });
      },  

    
     //Location Edit Form
     locationEditForm(){


     },

     //Add location 
     locationAdd(req, res){

        const id = req.params.id;
        const newLocation = req.body;

        Apartment.findById({ _id: id})
            .then( apartment => {
                apartment.locations.push(newLocation)
                return apartment.save();              
            })
                .then( () => Apartment.findById({ _id: id}))
                    .then( apartment => {
                        res.render('admin/apartment-edit', { apartment: apartment });
                } )
     },

     //Update location 
     locationUpdate(req, res){
        
                const id = req.params.id;
                const newLocation = req.body;
        
                Apartment.findByIdAndUpdate({ 'locations._id': id})
                            .then( apartment => {
                                
                                res.send(apartment);
                                //res.render('admin/apartment-edit', { apartment: apartment });

                            } )
             },

     //Delete Location
     locationDelete(req, res){
        
        const id =  req.params.id;

        Apartment.findOne({ 'locations._id' : id })
        //.populate('facilities')
        .then(apartment => {
                apartment.locations.pull({ _id : id });
                apartment.save()
                .then(apartment => {
                    res.render('admin/apartment-edit', { apartment: apartment });
                });
        })

     },

    //  Update maps by address
    // mapsUpdate(req, res){

    //     const id =  req.params.id;
    //     Apartment.findById

    // } 

}