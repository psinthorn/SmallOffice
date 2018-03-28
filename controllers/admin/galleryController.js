
const mongoose = require('mongoose');
const Apartment = require('./../../models/Apartment');



module.exports = {


   


    //upload image form
    gallery(req, res){
        const id = req.params.id;

        Apartment.findById({ _id: id})
            .then( apartment => {
                res.render('admin/gallery-upload-form', { apartment: apartment });
            })
        
        
    },
    //image upload process

    galleryUpload(req, res){

        const id = req.params.id;
        //res.send(id);
        const imgUrl = req.files.name;

        //res.send(imgUrl);

        const imgUrlName = Date.now() + '-' + imgUrl.name;
        const imagesUploads = './public/gallery/';
        imgUrl.mv(imagesUploads + imgUrlName, (err) => {
            if(err) throw err;

        });

        Apartment.findById({ _id: id })
            .then( apartment => {

                const imgName = ({
                    name: imgUrlName
                });
                //res.send(imgName);
                //apartment.gallery.name = imgUrlName;

                apartment.gallery.push(imgName);

                apartment.save()
                .then( () => Apartment.findById({ _id: id }))
                    .then( apartment => {

                        res.render('admin/gallery-upload-form', { apartment: apartment });

                    })
            });

    },

    //Image Update

    galleryUpdate(req, res){

        const id = req.params.id;

        const imgUrl = req.files.imgUrl;
        const imgUrlName = Date.now() + '-' + imgUrl.name;
        const imagesUploads = './public/images/';
        imgUrl.mv(imagesUploads + imgUrlName, (err) => {
            if(err) throw err;
        });

        const newImg = ({
            imgUrl: imgUrlName
        })
    
        Apartment.findByIdAndUpdate({ _id: id},newImg)
            .then(() => Apartment.findById({ _id: id }))
            .then( apartment => {
                res.render('admin/apartment-edit', { apartment: apartment });
            });

    },



    //Delete Facility 
    galleryDelete(req, res){
        const id = req.params.id;
        //const facId = req.parame.facID;

        // console.log(id);
        // console.log(facId);

        Apartment.findOne({ 'facilities._id' : id })
            //.populate('facilities')
            .then(fac => {
                    fac.facilities.pull({ _id : id });
                    fac.save()
                    .then(apartment => {
                        res.render('admin/apartment-edit', { apartment: apartment });
                    });
            })
         },

}