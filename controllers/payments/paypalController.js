const mongoose = require('mongoose');
const paypal = require('paypal-rest-sdk');
const BookingTour = require('./../../models/BookingTours');


module.exports = {

    getAll(req, res, next ){
        //res.send('Paypal payments');
        res.render('payments/index');
    },

    booking(req, res, next){
        BookingTour.find({}).sort({'create_time': 1})
        .then( bookings => {
            //res.send(bookings);
            res.render('payments/payment-list',{ bookings: bookings } );
        });
    },

    json(req, res, next){
        BookingTour.find({})
        .then( bookings => {
            res.send(bookings);
            //res.render('payments/payment-list',{ bookings: bookings } );
        });
    },

    //Creat payment
    pay(req, res, next) {

        const price = req.body.sale;
        const packageName = req.body.title;
        const skuType = req.body.skuType;

        // console.log(price);
        // console.log(packageName);
        // console.log(skuType);

        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:8081/payment/success",
                "cancel_url": "http://localhost:8081/payment/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": packageName,
                        "sku": skuType,
                        "price": "3.00",
                        // "name": "Tour Koh Tao",
                        // "sku": "Tour",
                        // "price": "1",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": "3.00",
                    //"details": "Details of amount"
                },
                "description": "This is the payment description."
            }]
        };

        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {

                for (let i = 0; i < payment.links.length; i++) {
                   
                    if (payment.links[i].rel === 'approval_url') {
                       
                        res.redirect(payment.links[i].href);
                    
                    }
                }
            }
        })

    },

    //Payment Success
    success(req, res, next) {

        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;

        const execute_payment_json = {
            'payer_id': payerId,
            'transactions': [{
                'amount': {
                    'currency': 'USD',
                    'total': '3.00',
                    //'details': "Details of amount"
                }
            }]
        };

        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                const paymentDetail = payment;

                BookingTour.create(paymentDetail)
                .then(payment => {
                    //res.send(payment);
                    res.render('payments/paypal-success', { payment: payment});
                })
                
                
            }
        });

    },


    //Payment cancle 
    cancel(req, res, next) {
        res.render('payment-cancel');
    },


}







