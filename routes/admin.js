const ApartmentController = require('../controllers/admin/apartmentController');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

module.exports = (app) => {

    app.get('/admin/grt', ensureAuthenticated, ApartmentController.getAll);

}