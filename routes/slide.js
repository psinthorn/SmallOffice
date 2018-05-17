const SlideController = require('./../controllers/admin/slideController');
const {ensureAuthenticated, ensureGuest} = require('./../helpers/auth');

module.exports = (app) => {

    //888888888888888888888888888
    //88   About Routes    88
    //888888888888888888888888888

    //Gallery section
    app.get('/admin/slide', SlideController.slide );
    app.post('/admin/slide', SlideController.slideUpload);
    app.delete('/admin/slide/:id', SlideController.delete);

}