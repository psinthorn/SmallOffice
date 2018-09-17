
const ServiceController = require('./../controllers/admin/serviceController');
const ServiceGalleryController = require('./../controllers/admin/serviceGalleryController');
const PriceSaleController = require('./../controllers/admin/priceController');
const {ensureAuthenticated, ensureGuest} = require('./../helpers/auth');

module.exports = (app) => {

    //888888888888888888888888888
    //88   service Routes    88
    //888888888888888888888888888


    //Get all service List
    app.get('/admin/services', ensureAuthenticated, ServiceController.getAll);

     //Get all tour List
     app.get('/admin/service/add', ensureAuthenticated, ServiceController.addForm);
     
    //Create new service 
    app.post('/admin/service', ensureAuthenticated, ServiceController.create);

    //Edit form
    app.get('/admin/service/:id', ensureAuthenticated, ServiceController.editForm);

    //Edit process
    app.put('/admin/service/:id', ensureAuthenticated, ServiceController.editUpdate);

    //Delete service
    app.delete('/admin/service/:id', ensureAuthenticated, ServiceController.delete);


    //Location
    app.delete('/admin/service/location/:id', ensureAuthenticated, ServiceController.locationDelete);
    app.post('/admin/service/location/:id', ensureAuthenticated, ServiceController.locationAdd);

    
    //Thumbnail image process
    app.get('/admin/service/image', ensureAuthenticated, ServiceController.image); 
    app.post('/admin/service/image', ensureAuthenticated, ServiceController.imageUplaod);
    //Image Edit Section
    app.put('/admin/service/image/:id', ensureAuthenticated, ServiceController.imageUpdate);

    //Banner image process
    app.get('/admin/service/banner', ensureAuthenticated, ServiceController.banner); 
    app.post('/admin/service/banner', ensureAuthenticated, ServiceController.imageBannerUplaod);
    //banner Edit Section
    app.put('/admin/service/banner/:id', ensureAuthenticated, ServiceController.imageBannerUpdate);

    //Gallery section
    app.get('/admin/service/gallery/:id', ensureAuthenticated, ServiceGalleryController.gallery );
    app.post('/admin/service/gallery/:id', ensureAuthenticated, ServiceGalleryController.galleryUpload);
    app.delete('/admin/service/gallery/:id', ensureAuthenticated, ServiceGalleryController.delete );


    //Included
    app.post('/admin/service/include/:id', ensureAuthenticated, ServiceController.include);
    app.delete('/admin/service/include/:id', ensureAuthenticated, ServiceController.includeDelete);

     //Excluded
     app.post('/admin/service/exclude/:id', ensureAuthenticated, ServiceController.exclude);
     app.delete('/admin/service/exclude/:id', ensureAuthenticated, ServiceController.excludeDelete);


    //Price Manage
    app.put('/admin/service/pricesale/:id',ensureAuthenticated,PriceSaleController.priceServiceUpdate);

    

}