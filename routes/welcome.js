//const ApartmentController = require('./../controllers/admin/apartmentController');
const WelcomeController = require('./../controllers/admin/WelcomeController');
//const GalleryController = require('./../controllers/admin/galleryController');
const {ensureAuthenticated, ensureGuest} = require('./../helpers/auth');

module.exports = (app) => {

    //888888888888888888888888888
    //88   welcome Routes    88
    //888888888888888888888888888


    //Get all welcome List
    app.get('/admin/welcomes', ensureAuthenticated, WelcomeController.getAll);

     //Get all tour List
     app.get('/admin/welcome/add', ensureAuthenticated, WelcomeController.addForm);
     
    //Create new welcome 
    app.post('/admin/welcome', ensureAuthenticated, WelcomeController.create);

    //Edit form
    app.get('/admin/welcome/:id', ensureAuthenticated, WelcomeController.editForm);

    //Edit process
    app.put('/admin/welcome/:id', ensureAuthenticated, WelcomeController.editUpdate);

    //Delete welcome
    app.delete('/admin/welcome/:id', ensureAuthenticated, WelcomeController.delete);
    
    //get thumbnail image form   
    app.get('/admin/welcome/image', ensureAuthenticated, WelcomeController.image); 
    app.post('/admin/welcome/image', ensureAuthenticated, WelcomeController.imageUplaod);
    //Image Edit Section
    app.put('/admin/welcome/image/:id', ensureAuthenticated, WelcomeController.imageUpdate);

     //get banner image form   
     app.get('/admin/welcome/banner', ensureAuthenticated, WelcomeController.banner); 
     app.post('/admin/welcome/banner', ensureAuthenticated, WelcomeController.imageBannerUplaod);
     //Image Edit Section
     app.put('/admin/welcome/banner/:id', ensureAuthenticated, WelcomeController.imageBannerUpdate);

    //Gallery section
    // app.get('/admin/welcome/gallery/:id', ensureAuthenticated, GalleryController.gallery );
    // app.post('/admin/welcome/gallery/:id', ensureAuthenticated, GalleryController.galleryUpload);
    // app.delete('/admin/welcome/gallery/:id', ensureAuthenticated, GalleryController.delete );

    

}