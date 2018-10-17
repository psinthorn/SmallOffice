const BannerController = require('./../controllers/admin/bannerController');
const {ensureAuthenticated, ensureGuest} = require('./../helpers/auth');

module.exports = (app) => {

    //888888888888888888888888888
    //88   Banner Routes    88
    //888888888888888888888888888

    //Get all Contact List
    app.get('/admin/banner', ensureAuthenticated, BannerController.getAll);

     //Get all about List
     app.get('/admin/banner/add', ensureAuthenticated, BannerController.addForm);
     
    //Create new about 
    app.post('/admin/banner',ensureAuthenticated, BannerController.create);

    //Edit form
    app.get('/admin/banner/:id', ensureAuthenticated, BannerController.editForm);

    //Edit process
    app.put('/admin/banner/:id', ensureAuthenticated, BannerController.editUpdate);

    //Edit image
    app.put('/admin/banner/image/:id', ensureAuthenticated, BannerController.imageUpdate);

    //Delete about
    app.delete('/admin/banner/:id', ensureAuthenticated, BannerController.delete);

}