const AboutController = require('./../controllers/admin/aboutController');
const {ensureAuthenticated, ensureGuest} = require('./../helpers/auth');

module.exports = (app) => {

    //888888888888888888888888888
    //88   About Routes    88
    //888888888888888888888888888

    //Get all Contact List
    app.get('/admin/about', ensureAuthenticated, AboutController.getAll);

     //Get all about List
     app.get('/admin/about/add', ensureAuthenticated, AboutController.addForm);
     
    //Create new about 
    app.post('/admin/about',ensureAuthenticated, AboutController.create);

    //Edit form
    app.get('/admin/about/:id', ensureAuthenticated, AboutController.editForm);

    //Edit process
    app.put('/admin/about/:id', ensureAuthenticated, AboutController.editUpdate);

    //Edit image
    app.put('/admin/about/image/:id', ensureAuthenticated, AboutController.imageUpdate);

    //Delete about
    app.delete('/admin/about/:id', ensureAuthenticated, AboutController.delete);

}