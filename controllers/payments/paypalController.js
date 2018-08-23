const mongoose = require('mongoose');
const paypal = require('paypal-rest-sdk');
const BookingTour = require('./../../models/BookingTours');
const nodeMailer = require('nodemailer');
const request = require('request');


module.exports = {

    getAll(req, res, next) {
        //res.send('Paypal payments');
        res.render('payments/index');
    },

    //ALl booking list
    booking(req, res, next) {
        BookingTour.find({}).sort({ 'create_time': -1 })
            .then(bookings => {
                //res.send(bookings);
                res.render('payments/payment-list', { bookings: bookings });
            });
    },

    //Booking Detail
    booking(req, res, next) {
        BookingTour.find({ _id: id })
            .then(booking => {
                //res.send(bookings);
                res.render('booking-show', { booking: booking });
            });
    },

    json(req, res, next) {
        BookingTour.find({})
            .then(bookings => {
                res.send(bookings);
                //res.render('payments/payment-list',{ bookings: bookings } );
            });
    },

    //Tour Create payment
    pay(req, res, next) {

        const tourDate = req.body.tourdate;
        const packageName = req.body.title;
        const fName = req.body.fname;
        const lName = req.body.lname;
        const email = req.body.email;
        const phone = req.res.phone;
        const price = req.body.sale;
        const pickupAt = req.body.pickupat;
        const skuType = req.body.skuType;
        const readPolicy = req.body.readPolicy;
        
        
        const paymentDetail = {
            
                        "tour_info.date": tourDate,
                        "tour_info.package": packageName,
                        // "tour_info.from": trFrom,
                        // "tour_info.to": trTo,
                        "tour_info.pickup_at": pickupAt,
                        "tour_info.phone": phone,
                        "tour_info.email": email,
                        "tour_info.fname": fName,
                        "tour_info.lname": lName,
                        "tour_info.rate": price,
                        // "tour_info.vehicle_type": vehicleType,
                        "tour_info.readpolicy": readPolicy,
            
         };

         
         BookingTour.create(paymentDetail)
         .then(newBooking => {
             const id = newBooking._id;
                    const create_payment_json = {
                        //"tourdate": tourDate,
                        "intent": "sale",
                        "payer": {
                            "payment_method": "paypal"
                        },

                        // //for local testing
                        // "redirect_urls": {
                        //     "return_url": "http://localhost:8081/payment/success?total=" + price + "&id=" + id,
                        //     "cancel_url": "http://localhost:8081/payment/cancel"
                        // },

                        //For production
                        "redirect_urls": {
                            "return_url": "https://www.samuioceantour.com/payment/success?total=" + price + "&id=" + id,
                            "cancel_url": "https://www.samuioceantour.com/payment/cancel"
                        },

                        "transactions": [{
                            "item_list": {
                                "items": [{
                                    "name": packageName,
                                    "sku": skuType,
                                    "price": price,
                                    "currency": "THB",
                                    "quantity": 1
                                }]
                            },
                            "amount": {
                                "currency": "THB",
                                "total": price,
                                //"details": "Details of amount"
                            },
                            "description": packageName
                        }]
                    };

                    // console.log(create_payment_json);

                    paypal.payment.create(create_payment_json, function (error, payment) {
                        if (error) {

                            //res.send(error);
                            throw error;
                        } else {
                            
                            for (let i = 0; i < payment.links.length; i++) {

                                if (payment.links[i].rel === 'approval_url') {

                                    res.redirect(payment.links[i].href);

                                } 
                            }
                        }
                    })
        });
    },

    //Payment Success
    success(req, res, next) {
        const id = req.query.id;
        const price = req.query.total;
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        
        //console.log(price);

        const execute_payment_json = {
            'payer_id': payerId,
            'transactions': [{
                'amount': {
                    'currency': 'THB',
                    'total': price,
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
                const id = req.query.id;

                BookingTour.findByIdAndUpdate({ _id: id }, paymentDetail)
                    .then(payment => {
                        
                        let transporter = nodeMailer.createTransport({
                            host: 'mail.directbooking.co.th',
                            port: 25,
                            secure: false,
                            auth: {
                                user: 'sinthorn@directbooking.co.th',
                                pass: '1978#$Life'
                            },
                            tls: {
                                rejectUnauthorized: false
                            }
                        });

                        let mailOptions = {
                            from: '"Samui Ocean Tour" <seaflyers@hotmail.com>', // sender address
                            //to: req.body.to, // list of receivers
                            //to: toEmail,
                            //to: 'seaflyers@hotmail.com',
                            to: `${ payment.tour_info.email }`,
                            subject: 'Samui Ocean Tour Confirmed Booking' , // Subject line
                            text: `Dear ${ payment.tour_info.fname  } 

                            Thank you for your booking with Samui Ocean Tour.
                            
                            *Booking Information*
                            Tour Date: ${ payment.tour_info.date }
                            Tour Package: ${payment.tour_info.package}
                            Package Price: ${payment.tour_info.rate}
                            Pickup At: ${payment.tour_info.pickup_at}

                            Your Booking ID: ${ payment._id }
                            
                
                           
                            Have a Good Trip :)
                            Samui Ocean Tour | Tel: 077 601 025 | Email: seaflyers@hotmail.com

                            Samui Ocean Tour Team
                            Thank you have a good trip :) `, // plain text body
                            //html: '<b>NodeJS Email Tutorial</b>' // html body
                        };

                        //customer name on paypal
                        //Customer Name:  ${ payment.payer.payer_info.first_name  } 

                        let mailOptionsNotice = {
                            from: '"Samui Ocean Tour" <seaflyers@hotmail.com>', // sender address
                            to: `seaflyers@hotmail.com`,
                           
                            subject: 'New Tour Confirmed Booking' , // Subject line
                            text: `New tour confirmed booking

                            Booking Tour service from Samui Ocean Tour website.
                            
                            *Booking Information*
                            Customer Name: ${ payment.tour_info.fname  } ${ payment.tour_info.lname }
                            Tour Date: ${ payment.tour_info.date }
                            Tour Package: ${payment.tour_info.package}
                            Package Price: ${payment.tour_info.rate}
                            Pickup At: ${payment.tour_info.pickup_at}

                            Booking ID: ${ payment._id }
                            
                           
                            Have a Good Day :)
                            Samui Ocean Tour | Tel: 077 601 025 | Email: seaflyers@hotmail.com

                        
                             `, // plain text body
                            //html: '<b>NodeJS Email Tutorial</b>' // html body
                        };

                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }

                        });

                        transporter.sendMail(mailOptionsNotice, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }

                        });
                        //res.send(payment);
                        res.render('payments/paypal-success', { payment: payment });
                    })


            }
        });

    },


    //Payment cancle 
    cancel(req, res, next) {
        res.render('payment-cancel');
    },


}







