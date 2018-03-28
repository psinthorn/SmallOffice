const ApartmentController = require('../controllers/admin/apartmentController');
const SubContactController = require('./../controllers/admin/subContactController');
const GalleryController = require('./../controllers/admin/galleryController');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

module.exports = (app) => {

    //888888888888888888888888888
    //88   Apartment Routes    88
    //888888888888888888888888888


    

    //Get all Apartment List
    app.get('/admin/apartments', ApartmentController.getAll);

     //Get all Apartment List
     app.get('/admin/apartments/add', ApartmentController.addForm);
     
    //Create new apartment 
    app.post('/admin/apartments', ApartmentController.create);

    //Edit form
    app.get('/admin/apartments/:id', ApartmentController.editForm);

    //Edit process
    app.put('/admin/apartments/:id', ApartmentController.editUpdate);

    //Delete apartment
    app.delete('/admin/apartments/:id', ApartmentController.delete);

    //Facility 
    app.post('/admin/facility/:id', ApartmentController.facility);
    app.delete('/admin/facility/:id', ApartmentController.facilityDelete);

    //Contact
    app.post('/admin/apartment/contact/:id', SubContactController.add);
    app.get('/admin/apartment/contact/edit/:id', ApartmentController.contactEditForm);
    app.put('/admin/apartment/contact/:id', SubContactController.edit);
    app.delete('/admin/apartment/contact/:id', SubContactController.delete);

    //Location
    app.delete('/admin/apartment/location/:id', ApartmentController.locationDelete);
    app.post('/admin/apartment/location/:id', ApartmentController.locationAdd);



    
    //get image form   
    app.get('/admin/apartments/image', ApartmentController.image); 
    app.post('/admin/apartments/image', ApartmentController.imageUplaod);
    //Image Edit Section
    app.put('/admin/image/:id', ApartmentController.imageUpdate);

    //Gallery section
    app.get('/admin/apartment/gallery/:id',GalleryController.gallery );
    app.post('/admin/apartment/gallery/:id', GalleryController.galleryUpload);

    // //intro section
    // app.get('/admin/apartment-intro', ApartmentController.getIntro);

    // app.get('/admin/apartment-intro/add', ApartmentController.introForm);

    // app.post('/admin/apartment-intro', ApartmentController.addIntro);

    // app.get('/admin/apartment-intro/:id', ApartmentController.editIntroForm);

    // app.put('/admin/apartment-intro/:id', ApartmentController.editIntro);
}