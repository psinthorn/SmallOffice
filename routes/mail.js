
const express = require('express');
const router = express.Router();
const nodeMailer = require('nodemailer');

router.get('/send', (req, res) => {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'seolzekof34dvfwo@ethereal.email',
            pass: '8PkxM3hx4MqvQzFqbQ'
        }
    });
    let mailOptions = {
        from: '"Sinthorn Pradutnam" <sinthorn@directbooking.co.th>', // sender address
        //to: req.body.to, // list of receivers
        to: 'psinthorn@gmail.com',
        subject: 'Test nodemailer', // Subject line
        text: 'Hello', // plain text body
        html: '<b>NodeJS Email Tutorial</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
            res.send('Send mail completed');
        });
    });

module.exports = router;

