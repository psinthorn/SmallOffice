const ApartmentController = require('../controllers/admin/apartmentController');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

module.exports = (app) => {

    //Admin Login page
    app.get('/admin/login', ApartmentController.login);



}