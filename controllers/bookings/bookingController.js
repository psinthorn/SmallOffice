const mongoose = require('mongoose');
const paypal = require('paypal-rest-sdk');
const BookingTour = require('./../../models/BookingTours');


module.exports = {

   
    //ALl booking list
    booking(req, res, next){
        BookingTour.find({}).sort({'create_time': -1 })
        .then( bookings => {
            //res.send(bookings);
            res.render('bookings/index',{ bookings: bookings } );
        });
    },

    //Booking Detail
    showDetails(req, res, next){
        BookingTour.find({_id: id })
        .then( booking => {
            //res.send(bookings);
            res.render('bookings/booking-show',{ booking: booking } );
        });
    },

}







