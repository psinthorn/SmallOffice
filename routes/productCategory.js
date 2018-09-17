
const ProductCategoryController = require('./../controllers/admin/productCategoryController');
const {ensureAuthenticated, ensureGuest} = require('./../helpers/auth');

module.exports = (app) => {

    //888888888888888888888888888
    //88   Tour Category 88
    //888888888888888888888888888

    app.get('/admin/tour-category', ensureAuthenticated, ProductCategoryController.getAll ) 

    app.get('/admin/tour-category/add', ensureAuthenticated, ProductCategoryController.addForm);

    app.get('/admin/tour-category/edit/:id', ensureAuthenticated, ProductCategoryController.editForm)

    app.post('/admin/tour-category', ensureAuthenticated, ProductCategoryController.create);

    app.put('/admin/tour-category/:id', ensureAuthenticated, ProductCategoryController.editUpdate);

    app.put('/admin/tour-category/image/:id', ensureAuthenticated, ProductCategoryController.imageUpdate);

    app.delete('/admin/tour-category/:id', ensureAuthenticated, ProductCategoryController.delete);


};