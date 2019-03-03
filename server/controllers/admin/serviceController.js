

const mongoose = require('mongoose');
const Service = require('../../models/Service');
const fs = require('fs');


module.exports = {


    //Get all available list of apartments
    getAll(req, res){

        Service.find({}).sort({ order: 1})
        .then(services => {
            res.render('admin/services-list', { services: services });
            //res.send(services);
        });

    },


    //Create form 

    addForm(req, res) {
 
            res.render('admin/service-add');
         
    },

    //Create new service
    create(req, res){

        const imgUrl = req.files.imgUrl;
        const imgUrlName = Date.now() + '-' + imgUrl.name;
        const imagesUploads = './public/images/service/';
        imgUrl.mv(imagesUploads + imgUrlName, (err) => {
            if(err) throw err;
        });

        const serviceProps = new Service({
            title: req.body.title,
            desc: req.body.desc,
            imgUrl: imgUrlName,
            address: req.body.address,
            status: req.body.status,
            user: req.user.id
        });

        Service.create(serviceProps)
            .then( () => Service.find({}).sort({date: -1 }))
                .then( (services) => {     
                           
                    res.render('admin/services-list', { services: services });
                    
            });
    },

    
    //Edit form apartment
    editForm(req, res){

        const id = req.params.id;
        //console.log(id);
        Service.findById({ _id: id })
            .populate('subcontact')
            .then( (service) => {
                res.render('admin/service-edit', { service: service });
            })
    },

    //Edit form service
    editUpdate(req, res){
        const serviceProps = req.body;
        const id = req.params.id;

        Service.findByIdAndUpdate({ _id: id }, serviceProps)
            .then( () => Service.find({}))
                    .then( (services) => {
                        res.render('admin/services-list', { services: services });
                    })
    },

    //Delete service 
    delete(req, res){

        const id = req.params.id;

        Service.findByIdAndRemove({ _id: id })
            .then(() => Service.find({}))
                .then( (services) => {
                res.render('admin/services-list', { services: services });
            })
    },


    //Thumbnail image for product
    //upload image form
    image(req, res){
        res.render('admin/image-upload-form');
    },
    //image upload process
    imageUplaod(req, res){

        const id = req.params.id;

        const imgUrl = req.files.imgUrl;
        const imgUrlName = Date.now() + '-' + imgUrl.name;
        const imagesUploads = './public/images/service/';
        imgUrl.mv(imagesUploads + imgUrlName, (err) => {
            if(err) throw err;
        });

        Service.findById({ _id: id })
            .then( service => {
                service.imgUrl.push(imag);
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
        const imagesUploads = './public/images/service/';
        imgUrl.mv(imagesUploads + imgUrlName, (err) => {
            if(err) throw err;
        });

        const newImg = ({
            imgUrl: imgUrlName
        })

        fs.unlink(imagesUploads + oldImgUrl, (err) => {  
            Service.findByIdAndUpdate({ _id: id},newImg)
            .then(() => Service.findById({ _id: id }))
            .then( service => {
                res.render('admin/service-edit', { service: service });
            });
        });
    
        

    },


   //Product Banner Controller
    //Banner upload image banner form
    banner(req, res){
        res.render('admin/service-image-banner-upload-form');
    },
    //Banner image upload process
    imageBannerUplaod(req, res){

        const id = req.params.id;

        const imgUrl = req.files.serviceBannerImgUrl;
        const imgUrlName = Date.now() + '-' + imgUrl.name;
        const imagesUploads = './public/images/service/banner/';
        imgUrl.mv(imagesUploads + imgUrlName, (err) => {
            if(err) throw err;
        });

        Service.findById({ _id: id })
            .then( service => {
                service.serviceBannerImgUrl.push(imag);
            });

    },

    //Banner Image Update
    imageBannerUpdate(req, res){

        const id = req.params.id;
        const oldImgUrl = req.body.oldImgUrl;
        const imgUrl = req.files.serviceBannerImgUrl;
        //console.log(oldImgUrl);
        //res.send(imgUrl.name);

        const imgUrlName = Date.now() + '-' + imgUrl.name;
        const imagesUploads = './public/images/service/banner/';
        imgUrl.mv(imagesUploads + imgUrlName, (err) => {
            if(err) throw err;
        });

        const newImg = ({
            serviceBannerImgUrl: imgUrlName
        })

        fs.unlink(imagesUploads + oldImgUrl, (err) => {  
            Service.findByIdAndUpdate({ _id: id},newImg)
            .then(() => Service.findById({ _id: id }))
            .then( service => {
                res.render('admin/service-edit', { service: service });
            });
        });
    },


      //Contact each apartment
      contactAdd(req, res){

            const id = req.params.id;
            const newContact = new SubContact({
                title: req.body.title,
                email: req.body.email,
                person: req.body.person 
            });

            const service = Service.findById({ _id: id })
                .then( service => {
                    Service.subcontact.push(newContact);
                    Promise.all([newContact.save(),Service.save() ]) 
                        .then( () => Service.findById({ _id: id }))
                            //.populate('subcontact')
                            .then( service => {
                              res.render('admin/service-edit', { service: service }); 
                             //res.send(apartment);
                        })
                                
                })
                    
        },  

      //Contact Edit Form 
      contactEditForm(req, res){

                    const id = req.params.id;
                    // const newContact = req.body;

                    Service.findOne({'subcontact._id': id })
                        .then( service => {
                            res.render('admin/service-edit-contact', { service: service }); 
                    });
      },  

     //Location Edit Form
     locationEditForm(){


     },

     //Add location 
     locationAdd(req, res){

        const id = req.params.id;
        const newLocation = req.body;

        Service.findById({ _id: id})
            .then( service => {
                Service.locations.push(newLocation)
                return Service.save();              
            })
                .then( () => Service.findById({ _id: id}))
                    .then( service => {
                        res.render('admin/service-edit', { service: service });
                } )
     },

     //Update location 
     locationUpdate(req, res){
        
                const id = req.params.id;
                const newLocation = req.body;
        
               Service.findByIdAndUpdate({ 'locations._id': id})
                            .then( service => {
                                
                                res.send(service);
                                //res.render('admin/apartment-edit', { apartment: apartment });

                            } )
             },

     //Delete Location
     locationDelete(req, res){
        
        const id =  req.params.id;

        Service.findOne({ 'locations._id' : id })
        //.populate('facilities')
        .then(service => {
                Service.locations.pull({ _id : id });
                Service.save()
                .then(service => {
                    res.render('admin/service-edit', { service: service });
                });
        })

     },

    
    //Include Function start here
    //Add include form 
    include(req, res){
        
                const id = req.params.id;
                Service.findById({ _id: id })
                .then( service => {
                    const newInclude = { 
                        title: req.body.title, 
                        value: req.body.value
                    }
                    service.included.push(newInclude);
                    service.save()
                    .then(service => {
                        res.render('admin/service-edit', { service: service });
                    });
                })     
                
            },
        
            //Delete Included
            includeDelete(req, res){
                const id = req.params.id;
                Service.findOne({ 'included._id' : id })
                    .then(include => {
                            include.included.pull({ _id : id });
                            include.save()
                            .then(service => {
                                res.render('admin/service-edit', { service: service });
                            });
                    })
                 },


     //Exclude Function start 

    //Add Exclude form 
    exclude(req, res){
        
                const id = req.params.id;
                Service.findById({ _id: id })
                .then( service => {
                    const newExclude = { 
                        title: req.body.title, 
                        value: req.body.value
                    }
                    service.excluded.push(newExclude);
                    service.save()
                    .then(service => {
                        res.render('admin/service-edit', { service: service });
                    });
                })     
                
            },
        
            //Delete Excluded
            excludeDelete(req, res){
                const id = req.params.id;
                Service.findOne({ 'excluded._id' : id })
                    .then(exclude => {
                            exclude.excluded.pull({ _id : id });
                            exclude.save()
                            .then(service => {
                                res.render('admin/service-edit', { service: service });
                            });
                    })
                 },
             
        
}