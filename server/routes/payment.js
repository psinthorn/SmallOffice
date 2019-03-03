const PaymentController = require('./../controllers/payments/paypalController');
const TransferPayment = require('./../controllers/payments/transferPaypalController');
const {ensureAuthenticated, ensureGuest} = require('./../helpers/auth');

module.exports = (app) => {

    //Tour Booking
    app.get('/payment/index', PaymentController.getAll);

    app.get('/payment/booking',ensureAuthenticated, PaymentController.booking);
    
    app.get('/payment/json', PaymentController.json);

    app.post('/payment/paypal', PaymentController.pay);
    
    app.get('/payment/success', PaymentController.success);
    
    app.get('/payment/cancle', PaymentController.cancel);

    //Transfers Booking
    app.get('/transfer/index', TransferPayment.getAll);
    
    app.get('/payment/transfer-booking-list',ensureAuthenticated, TransferPayment.booking);
        
    app.get('/payment/transfer-json', TransferPayment.json);
    
    app.post('/payment/transfer-paypal', TransferPayment.pay);
        
    app.get('/payment/transfer-success', TransferPayment.success);
        
    app.get('/payment/transfer-cancle', TransferPayment.cancel);

}



