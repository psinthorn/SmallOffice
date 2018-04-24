const ApartmentController = require('./../controllers/admin/apartmentController');
const SubContactController = require('./../controllers/admin/subContactController');
const GalleryController = require('./../controllers/admin/galleryController');
const {ensureAuthenticated, ensureGuest} = require('./../helpers/auth');

module.exports = (app) => {

    //888888888888888888888888888
    //88   Apartment Routes    88
    //888888888888888888888888888


    //Get all Apartment List
    app.get('/admin/apartments', ensureAuthenticated, ApartmentController.getAll);

     //Get all Apartment List
     app.get('/admin/apartments/add', ensureAuthenticated, ApartmentController.addForm);
     
    //Create new apartment 
    app.post('/admin/apartments', ensureAuthenticated, ApartmentController.create);

    //Edit form
    app.get('/admin/apartments/:id', ensureAuthenticated, ApartmentController.editForm);

    //Edit process
    app.put('/admin/apartments/:id', ensureAuthenticated, ApartmentController.editUpdate);

    //Delete apartment
    app.delete('/admin/apartments/:id', ensureAuthenticated, ApartmentController.delete);

    //Facility 
    app.post('/admin/facility/:id', ensureAuthenticated, ApartmentController.facility);
    app.delete('/admin/facility/:id', ensureAuthenticated, ApartmentController.facilityDelete);
    app.get('/admin/facility/:id', ApartmentController.facilityEditForm);
    app.put('/admin/facility/:id',ApartmentController.facilityEdit);
    

    //Contact
    app.post('/admin/apartment/contact/:id', ensureAuthenticated, SubContactController.add);
    app.get('/admin/apartment/contact/edit/:id',ensureAuthenticated,  ApartmentController.contactEditForm);
    app.put('/admin/apartment/contact/:id', ensureAuthenticated, SubContactController.edit);
    app.delete('/admin/apartment/contact/:id', ensureAuthenticated, SubContactController.delete);

    //Location
    app.delete('/admin/apartment/location/:id', ensureAuthenticated, ApartmentController.locationDelete);
    app.post('/admin/apartment/location/:id', ensureAuthenticated, ApartmentController.locationAdd);

    
    //get image form   
    app.get('/admin/apartments/image', ensureAuthenticated, ApartmentController.image); 
    app.post('/admin/apartments/image', ensureAuthenticated, ApartmentController.imageUplaod);
    //Image Edit Section
    app.put('/admin/image/:id', ensureAuthenticated, ApartmentController.imageUpdate);

    //Gallery section
    app.get('/admin/apartment/gallery/:id', ensureAuthenticated, GalleryController.gallery );
    app.post('/admin/apartment/gallery/:id', ensureAuthenticated, GalleryController.galleryUpload);
    app.delete('/admin/apartment/gallery/:id', ensureAuthenticated, GalleryController.delete );

}