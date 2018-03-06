const ApartmentController = require('../controllers/admin/apartmentController');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

module.exports = (app) => {

    //888888888888888888888888888
    //88   Apartment Routes    88
    //888888888888888888888888888


    //Admin Login page
    app.get('/admin/login', ApartmentController.login);

    //Get all Apartment List
    app.get('/admin/apartments', ApartmentController.getAll);

     //Get all Apartment List
     app.get('/admin/apartments/add', ApartmentController.addForm);
     
    //Create new apartment 
    app.post('/admin/apartments', ApartmentController.create);

    //Edit form
    app.get('/admin/apartments/:id', ApartmentController.editForm);

    //Edit process
    app.put('/admin/apartments/:id', ApartmentController.editUpdate);

    //Delete apartment
    app.delete('/admin/apartments/:id', ApartmentController.delete);

}