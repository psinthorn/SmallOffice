const mongoose = require('mongoose');
const paypal = require('paypal-rest-sdk');
const BookingTransfer = require('./../../models/BookingTransfer');
const nodeMailer = require('nodemailer');
const request = require('request');


module.exports = {

    getAll(req, res, next) {
        //res.send('Paypal payments');
        res.render('payments/index');
    },

    //ALl booking list
    booking(req, res, next) {
        BookingTransfer.find({}).sort({ 'create_time': -1 })
            .then(bookings => {
                //res.send(bookings);
                res.render('payments/payment-list', { bookings: bookings });
            });
    },

    //Booking Detail
    booking(req, res, next) {
        BookingTransfer.find({ _id: id })
            .then(booking => {
                //res.send(bookings);
                res.render('booking-show', { booking: booking });
            });
    },

    json(req, res, next) {
        BookingTransfer.find({})
            .then(bookings => {
                res.send(bookings);
                //res.render('payments/payment-list',{ bookings: bookings } );
            });
    },

    //Creat payment
    pay(req, res, next) {

        //const fullForm = req.body;
        const trDate = req.body.trdate;
        const trTime = req.body.trtime;
        const trFrom = req.body.from;
        const trTo = req.body.to;
        const pickupAt = req.body.pickupat;
        const vehicleType = req.body.type;
        const fName = req.body.fname;
        const lName = req.body.lname;
        const email = req.body.email;
        const phone = req.body.phone;
        const price = req.body.price;
        const packageName = "Transfer Service from " + trFrom + " to " + trTo + " Pickup At " + pickupAt ;
        const skuType = req.body.skuType;
        const readPolicy = req.body.readPolicy;
        //console.log(readPolicy);
       
        //Create new booking record 
        const paymentDetail = {

            "transfer_info.date": trDate,
            "transfer_info.time": trTime,
            "transfer_info.from": trFrom,
            "transfer_info.to": trTo,
            "transfer_info.pickup_at": pickupAt,
            "transfer_info.phone": phone,
            "transfer_info.email": email,
            "transfer_info.fname": fName,
            "transfer_info.lname": lName,
            "transfer_info.rate": price,
            "transfer_info.vehicle_type": vehicleType,
            "transfer_info.readpolicy": readPolicy,

        };
         

        BookingTransfer.create(paymentDetail)
        .then(newBooking => {
            const id = newBooking._id;
            
            const create_payment_json = {
                
                          "intent": "sale",
                          "payer": {
                              "payment_method": "paypal"
                          },
                        ////for local testing  
                        //   "redirect_urls": {
                        //       "return_url": "http://localhost:8081/payment/transfer-success?id=" + id + "&total=" + price,
                        //       "cancel_url": "http://localhost:8081/payment/cancel"
                        //   },

                        ////for production 
                        "redirect_urls": {
                            "return_url": "https://www.samuioceantour.com/payment/transfer-success?id=" + id + "&total=" + price,
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

        //execute_payment_json.tourdate = tourDate;

        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                res.send(error);
                //throw error;
            } else {
                const paymentDetail = payment;
                const id = req.query.id;

                BookingTransfer.findByIdAndUpdate({ _id: id }, paymentDetail)
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
                            to: `${ payment.transfer_info.email }`,
                            subject: 'Samui Ocean Tour Transfer Service Confirmed Booking' , // Subject line
                            text: `Dear ${ payment.transfer_info.fname  } 

                            Thank you for your booking with Samui Ocean Tour.
                            
                            *Your Booking Information* 
                            Transfer Date: ${ payment.transfer_info.date }
                            Transfer Time: ${ payment.transfer_info.time }
                            Pickup At: ${ payment.transfer_info.pickup_at}
                            
                            Your Booking ID: ${ payment._id }
                            
                
                           
                            Have a Good Trip :)
                            Samui Ocean Tour | Tel: 077 601 025 | Email: seaflyers@hotmail.com

                            Samui Ocean Tour Team
                            Thank you have a good trip :) `, // plain text body
                            //html: '<b>NodeJS Email Tutorial</b>' // html body
                        };

                        let mailOptionsNotice = {
                            from: '"Samui Ocean Tour" <seaflyers@hotmail.com>', // sender address
                            //to: req.body.to, // list of receivers
                            //to: toEmail,
                            //to: 'seaflyers@hotmail.com',
                            //to: `psinthorn@gmail.com`,
                            to: `seaflyers@hotmail.com`,
                            
                            subject: 'New Transfer Service Confirmed Booking' , // Subject line
                            text: `New transfer service confirmed booking

                            Booking Transfer service from Samui Ocean Tour website.
                            
                            *Booking Information* 
                            Customer Name ${ payment.transfer_info.fname  } ${ payment.transfer_info.lname }
                            Transfer Date: ${ payment.transfer_info.date }
                            Pickup Time: ${ payment.transfer_info.time }
                            Pickup At: ${ payment.transfer_info.pickup_at}
                            Customer Phone Number: ${ payment.transfer_info.phone }
                            Customer Email: ${ payment.transfer_info.email }

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
                        res.render('payments/transfer-success', { payment: payment });
                    })

            }
        });       

    },


    //Payment cancle 
    cancel(req, res, next) {
        res.render('payment-cancel');
    },


}







