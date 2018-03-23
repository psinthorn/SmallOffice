const ApartmentController = require('../controllers/admin/apartmentController');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

module.exports = (app) => {

    //888888888888888888888888888
    //88   Apartment Routes    88
    //888888888888888888888888888


    //get image form   
    app.get('/admin/apartments/image', ApartmentController.image); 

    app.post('/admin/apartments/image', ApartmentController.imageUplaod);

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
    app.post('/admin/apartment/contact/:id', ApartmentController.contactAdd);
    app.get('/admin/apartment/contact/edit/:id', ApartmentController.contactEditForm);
    app.put('/admin/apartment/contact/:id', ApartmentController.contactEdit);
    app.delete('/admin/apartment/contact/:id', ApartmentController.contactDelete);

    //Location
    app.delete('/admin/apartment/location/:id', ApartmentController.locationDelete);
    app.post('/admin/apartment/location/:id', ApartmentController.locationAdd);


    //Image Section
    app.put('/admin/image/:id', ApartmentController.imageUpdate);




    // //intro section
    // app.get('/admin/apartment-intro', ApartmentController.getIntro);

    // app.get('/admin/apartment-intro/add', ApartmentController.introForm);

    // app.post('/admin/apartment-intro', ApartmentController.addIntro);

    // app.get('/admin/apartment-intro/:id', ApartmentController.editIntroForm);

    // app.put('/admin/apartment-intro/:id', ApartmentController.editIntro);
}