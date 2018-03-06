const ContactController = require('../controllers/admin/contactController');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

module.exports = (app) => {

    //888888888888888888888888888
    //88   Contact Routes    88
    //888888888888888888888888888

    //Get all Contact List
    app.get('/admin/contact', ContactController.getAll);

     //Get all Contact List
     app.get('/admin/contact/add', ContactController.addForm);
     
    //Create new Contact 
    app.post('/admin/contact', ContactController.create);

    //Edit form
    app.get('/admin/contact/:id', ContactController.editForm);

    //Edit process
    app.put('/admin/contact/:id', ContactController.editUpdate);

    //Delete Contact
    app.delete('/admin/contact/:id', ContactController.delete);

}