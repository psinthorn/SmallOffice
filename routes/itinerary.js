const ItineraryController = require('./../controllers/admin/itineraryController');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

module.exports = (app) => {

    app.get('/admin/itinerary', ItineraryController.getAll);

    app.get('/admin/itinerary/add', ItineraryController.addForm);

    app.post('/admin/itinerary', ItineraryController.create);
}
