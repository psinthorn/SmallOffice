//const ApartmentController = require('./../controllers/admin/apartmentController');
const TourController = require('./../controllers/admin/tourController');
const SubContactController = require('./../controllers/admin/subContactController');
const GalleryController = require('./../controllers/admin/galleryController');
const ItineraryController = require('./../controllers/admin/itineraryController');
const {ensureAuthenticated, ensureGuest} = require('./../helpers/auth');

module.exports = (app) => {

    //888888888888888888888888888
    //88   tour Routes    88
    //888888888888888888888888888


    //Get all tour List
    app.get('/admin/tours', ensureAuthenticated, TourController.getAll);

     //Get all tour List
     app.get('/admin/tour/add', ensureAuthenticated, TourController.addForm);
     
    //Create new tour 
    app.post('/admin/tour', ensureAuthenticated, TourController.create);

    //Edit form
    app.get('/admin/tour/:id', ensureAuthenticated, TourController.editForm);

    //Edit process
    app.put('/admin/tour/:id', ensureAuthenticated, TourController.editUpdate);

    //Delete tour
    app.delete('/admin/tour/:id', ensureAuthenticated, TourController.delete);

    //Included
    app.post('/admin/include/:id', ensureAuthenticated, TourController.include);
    app.delete('/admin/include/:id', ensureAuthenticated, TourController.includeDelete);

     //Excluded
     app.post('/admin/exclude/:id', ensureAuthenticated, TourController.exclude);
     app.delete('/admin/exclude/:id', ensureAuthenticated, TourController.excludeDelete);

    //Bring 
    app.post('/admin/bring/:id', ensureAuthenticated, TourController.bring);
    app.delete('/admin/bring/:id', ensureAuthenticated, TourController.bringDelete);
    //app.get('/admin/bring/:id', TourController.bringEditForm);
    //app.put('/admin/bring/:id',TourController.bringEdit);
    

    //Contact
    app.post('/admin/tour/contact/:id', ensureAuthenticated, SubContactController.add);
    app.get('/admin/tour/contact/edit/:id',ensureAuthenticated,  TourController.contactEditForm);
    app.put('/admin/tour/contact/:id', ensureAuthenticated, SubContactController.edit);
    app.delete('/admin/tour/contact/:id', ensureAuthenticated, SubContactController.delete);

    //Location
    app.delete('/admin/tour/location/:id', ensureAuthenticated, TourController.locationDelete);
    app.post('/admin/tour/location/:id', ensureAuthenticated, TourController.locationAdd);

    
    //get image form   
    app.get('/admin/tour/image', ensureAuthenticated, TourController.image); 
    app.post('/admin/tour/image', ensureAuthenticated, TourController.imageUplaod);
    //Image Edit Section
    app.put('/admin/image/:id', ensureAuthenticated, TourController.imageUpdate);

    //Gallery section
    app.get('/admin/tour/gallery/:id', ensureAuthenticated, GalleryController.gallery );
    app.post('/admin/tour/gallery/:id', ensureAuthenticated, GalleryController.galleryUpload);
    app.delete('/admin/tour/gallery/:id', ensureAuthenticated, GalleryController.delete );

    //Gallery section
    app.get('/admin/tour/itinerary/:id', ensureAuthenticated, ItineraryController.itinerary);
    app.post('/admin/tour/itinerary/:id', ensureAuthenticated, ItineraryController.itinerary);
    app.delete('/admin/tour/itinerary/:id', ensureAuthenticated, ItineraryController.itineraryDelete);

    

}