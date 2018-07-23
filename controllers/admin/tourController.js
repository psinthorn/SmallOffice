
const mongoose = require('mongoose');
const Tour = require('../../models/Tour');
const Facility = require('../../models/Bring');
const SubContact = require('../../models/SubContact');
const fs = require('fs');


module.exports = {


    //Get all available list of apartments
    getAll(req, res){

        Tour.find({}).sort({ date: -1})
        .then(tours => {
            res.render('admin/tours-list', { tours: tours });
            //res.send(tours);
        });

    },


    //Create form 

    addForm(req, res) {

        Tour.find({})
            .then( (tours) => {
                res.render('admin/tour-add', { tours: tours });
            });   
    },

    //Create new tour
    create(req, res){

        const imgUrl = req.files.imgUrl;
        const imgUrlName = Date.now() + '-' + imgUrl.name;
        const imagesUploads = './public/images/tour/';
        imgUrl.mv(imagesUploads + imgUrlName, (err) => {
            if(err) throw err;
        });

        const tourProps = new Tour({
            title: req.body.title,
            desc: req.body.desc,
            imgUrl: imgUrlName,
            address: req.body.address,
            status: req.body.status,
            user: req.user.id
        });

        Tour.create(tourProps)
            .then( () => Tour.find({}).sort({date: -1 }))
                .then( (tours) => {     
                           
                    res.render('admin/tours-list', { tours: tours });
                    
            });
    },

    
    //Edit form apartment
    editForm(req, res){

        const id = req.params.id;
        //console.log(id);
        Tour.findById({ _id: id })
            .populate('subcontact')
            .then( (tour) => {
                res.render('admin/tour-edit', { tour: tour });
            })
    },

    //Edit form tour
    editUpdate(req, res){
        const tourProps = req.body;
        const id = req.params.id;

        Tour.findByIdAndUpdate({ _id: id }, tourProps)
            .then( () => Tour.find({}))
                    .then( (tours) => {
                        res.render('admin/tours-list', { tours: tours });
                    })
    },

    //Delete tour 
    delete(req, res){

        const id = req.params.id;

        Tour.findByIdAndRemove({ _id: id })
            .then(() => Tour.find({}))
                .then( (tours) => {
                res.render('admin/tours-list', { tours: tours });
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
        const imagesUploads = './public/images/tour/';
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
        const imagesUploads = './public/images/tour/';
        imgUrl.mv(imagesUploads + imgUrlName, (err) => {
            if(err) throw err;
        });

        const newImg = ({
            imgUrl: imgUrlName
        })

        fs.unlink(imagesUploads + oldImgUrl, (err) => {  
            Tour.findByIdAndUpdate({ _id: id},newImg)
            .then(() => Tour.findById({ _id: id }))
            .then( tour => {
                res.render('admin/tour-edit', { tour: tour });
            });
        });
    
        

    },


   

    //Add bring form 
    bring(req, res){

        const id = req.params.id;
        Tour.findById({ _id: id })
        .then( tour => {
            const newBring = { 
                title: req.body.title, 
                value: req.body.value
            }
            tour.brings.push(newBring);
            tour.save()
            .then(tour => {
                res.render('admin/tour-edit', { tour: tour });
            });
        })     
        
    },

     //Get edit Form
     bringEditForm(req, res){
        const id = req.params.id;
        
        Tour.find({brings: { $elemMatch: { _id: id } }}).project({ "brings": { _id: id } })
            .then( facSelect => {
                //res.render('admin/facility-edit', { apartment: apartment });
                res.send(facSelect);
            });
    },


    //Edit Facility 
    bringEdit(req, res){
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
    bringDelete(req, res){
        const id = req.params.id;
        Tour.findOne({ 'brings._id' : id })
            .then(bring => {
                    bring.brings.pull({ _id : id });
                    bring.save()
                    .then(tour => {
                        res.render('admin/tour-edit', { tour: tour });
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

            const tour = Tour.findById({ _id: id })
                .then( tour => {
                    tour.subcontact.push(newContact);
                    Promise.all([newContact.save(),tour.save() ]) 
                        .then( () => Tour.findById({ _id: id }))
                            //.populate('subcontact')
                            .then( tour => {
                              res.render('admin/tour-edit', { tour: tour }); 
                             //res.send(apartment);
                        })
                                
                })
                    
        },  

      //Contact Edit Form 
      contactEditForm(req, res){

                    const id = req.params.id;
                    // const newContact = req.body;

                    Tour.findOne({'subcontact._id': id })
                        .then( tour => {
                            res.render('admin/tour-edit-contact', { tour: tour }); 
                    });
      },  

    



     //Location Edit Form
     locationEditForm(){


     },

     //Add location 
     locationAdd(req, res){

        const id = req.params.id;
        const newLocation = req.body;

        Tour.findById({ _id: id})
            .then( tour => {
                tour.locations.push(newLocation)
                return tour.save();              
            })
                .then( () => Tour.findById({ _id: id}))
                    .then( tour => {
                        res.render('admin/tour-edit', { tour: tour });
                } )
     },

     //Update location 
     locationUpdate(req, res){
        
                const id = req.params.id;
                const newLocation = req.body;
        
               Tour.findByIdAndUpdate({ 'locations._id': id})
                            .then( tour => {
                                
                                res.send(tour);
                                //res.render('admin/apartment-edit', { apartment: apartment });

                            } )
             },

     //Delete Location
     locationDelete(req, res){
        
        const id =  req.params.id;

        Tour.findOne({ 'locations._id' : id })
        //.populate('facilities')
        .then(tour => {
                tour.locations.pull({ _id : id });
                tour.save()
                .then(tour => {
                    res.render('admin/tour-edit', { tour: tour });
                });
        })

     },

    
    //Include Function start 

    //Add include form 
    include(req, res){
        
                const id = req.params.id;
                Tour.findById({ _id: id })
                .then( tour => {
                    const newInclude = { 
                        title: req.body.title, 
                        value: req.body.value
                    }
                    tour.included.push(newInclude);
                    tour.save()
                    .then(tour => {
                        res.render('admin/tour-edit', { tour: tour });
                    });
                })     
                
            },
        
            //Delete Included
            includeDelete(req, res){
                const id = req.params.id;
                Tour.findOne({ 'included._id' : id })
                    .then(include => {
                            include.included.pull({ _id : id });
                            include.save()
                            .then(tour => {
                                res.render('admin/tour-edit', { tour: tour });
                            });
                    })
                 },


     //Exclude Function start 

    //Add Exclude form 
    exclude(req, res){
        
                const id = req.params.id;
                Tour.findById({ _id: id })
                .then( tour => {
                    const newExclude = { 
                        title: req.body.title, 
                        value: req.body.value
                    }
                    tour.excluded.push(newExclude);
                    tour.save()
                    .then(tour => {
                        res.render('admin/tour-edit', { tour: tour });
                    });
                })     
                
            },
        
            //Delete Excluded
            excludeDelete(req, res){
                const id = req.params.id;
                Tour.findOne({ 'excluded._id' : id })
                    .then(exclude => {
                            excluded.excluded.pull({ _id : id });
                            excluded.save()
                            .then(tour => {
                                res.render('admin/tour-edit', { tour: tour });
                            });
                    })
                 },
             
        
}