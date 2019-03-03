const BookingController = require('./../controllers/bookings/bookingController');
const {ensureAuthenticated, ensureGuest} = require('./../helpers/auth');

module.exports = (app) => {

   

    app.get('/bookings', BookingController.booking);
    
    app.get('/bookings/show/:id', BookingController.showDetails);



}



