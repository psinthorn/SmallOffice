const ContactController = require('../controllers/admin/contactController');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

module.exports = (app) => {

    //888888888888888888888888888
    //88   Contact Routes    88
    //888888888888888888888888888

    //Get all Contact List
    app.get('/admin/contact', ensureAuthenticated, ContactController.getAll);

     //Get all Contact List
     app.get('/admin/contact/add', ensureAuthenticated, ContactController.addForm);
     
    //Create new Contact 
    app.post('/admin/contact', ensureAuthenticated, ContactController.create);

    //Edit form
    app.get('/admin/contact/:id', ensureAuthenticated, ContactController.editForm);

    //Edit process
    app.put('/admin/contact/:id', ensureAuthenticated, ContactController.editUpdate);

     //Image Edit process
     app.put('/admin/contact/image/:id', ensureAuthenticated, ContactController.imageUpdate);

    //Delete Contact
    app.delete('/admin/contact/:id', ensureAuthenticated, ContactController.delete);

}