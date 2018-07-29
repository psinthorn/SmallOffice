const PaymentController = require('./../controllers/payments/paypalController');
const {ensureAuthenticated, ensureGuest} = require('./../helpers/auth');

module.exports = (app) => {

    app.get('/payment/index', PaymentController.getAll);

    app.get('/payment/booking', PaymentController.booking);
    
    app.get('/payment/json', PaymentController.json);

    app.post('/payment/paypal', PaymentController.pay);
    
    app.get('/payment/success', PaymentController.success);
    
    app.get('/payment/cancle', PaymentController.cancel);

}



