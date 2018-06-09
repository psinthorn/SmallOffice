
const TourCategoryController = require('./../controllers/admin/tourCategoryController');
const {ensureAuthenticated, ensureGuest} = require('./../helpers/auth');

module.exports = (app) => {

    //888888888888888888888888888
    //88   Tour Category 88
    //888888888888888888888888888

    app.get('/admin/tour-category', ensureAuthenticated, TourCategoryController.getAll ) 

    app.get('/admin/tour-category/add', ensureAuthenticated, TourCategoryController.addForm);

    app.get('/admin/tour-category/edit/:id', ensureAuthenticated, TourCategoryController.editForm)

    app.post('/admin/tour-category', ensureAuthenticated, TourCategoryController.create);

    app.put('/admin/tour-category/:id', ensureAuthenticated, TourCategoryController.editUpdate);

    app.put('/admin/tour-category/image/:id', ensureAuthenticated, TourCategoryController.imageUpdate);

    app.delete('/admin/tour-category/:id', ensureAuthenticated, TourCategoryController.delete);


};