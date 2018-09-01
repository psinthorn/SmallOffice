//const ApartmentController = require('./../controllers/admin/apartmentController');
const ProductController = require('./../controllers/admin/ProductController');
const GalleryController = require('./../controllers/admin/galleryController');
const PriceSaleController = require('./../controllers/admin/priceController');
const {ensureAuthenticated, ensureGuest} = require('./../helpers/auth');

module.exports = (app) => {

    //888888888888888888888888888
    //88   product Routes    88
    //888888888888888888888888888


    //Get all product List
    app.get('/admin/products', ensureAuthenticated, ProductController.getAll);

     //Get all tour List
     app.get('/admin/product/add', ensureAuthenticated, ProductController.addForm);
     
    //Create new product 
    app.post('/admin/product', ensureAuthenticated, ProductController.create);

    //Edit form
    app.get('/admin/product/:id', ensureAuthenticated, ProductController.editForm);

    //Edit process
    app.put('/admin/product/:id', ensureAuthenticated, ProductController.editUpdate);

    //Delete product
    app.delete('/admin/product/:id', ensureAuthenticated, ProductController.delete);



    //Included
    app.post('/admin/product/include/:id', ensureAuthenticated, ProductController.include);
    app.delete('/admin/product/include/:id', ensureAuthenticated, ProductController.includeDelete);

     //Excluded
     app.post('/admin/product/exclude/:id', ensureAuthenticated, ProductController.exclude);
     app.delete('/admin/product/exclude/:id', ensureAuthenticated, ProductController.excludeDelete);


    //Location
    app.delete('/admin/product/location/:id', ensureAuthenticated, ProductController.locationDelete);
    app.post('/admin/product/location/:id', ensureAuthenticated, ProductController.locationAdd);

    
    //get thumbnail image form   
    app.get('/admin/product/image', ensureAuthenticated, ProductController.image); 
    app.post('/admin/product/image', ensureAuthenticated, ProductController.imageUplaod);
    //Image Edit Section
    app.put('/admin/product/image/:id', ensureAuthenticated, ProductController.imageUpdate);

     //get banner image form   
     app.get('/admin/product/banner', ensureAuthenticated, ProductController.banner); 
     app.post('/admin/product/banner', ensureAuthenticated, ProductController.imageBannerUplaod);
     //Image Edit Section
     app.put('/admin/product/banner/:id', ensureAuthenticated, ProductController.imageBannerUpdate);

    //Gallery section
    app.get('/admin/product/gallery/:id', ensureAuthenticated, GalleryController.gallery );
    app.post('/admin/product/gallery/:id', ensureAuthenticated, GalleryController.galleryUpload);
    app.delete('/admin/product/gallery/:id', ensureAuthenticated, GalleryController.delete );

    //Price Manage
    
    app.put('/admin/product/pricesale/:id',ensureAuthenticated,PriceSaleController.priceSaleUpdate);

    

}