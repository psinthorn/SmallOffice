
const express = require('express');
const router = express.Router();
const nodeMailer = require('nodemailer');

router.get('/send', (req, res) => {

    res.send('mail send get');
    // let transporter = nodeMailer.createTransport({
    //     host: 'smtp.ethereal.email',
    //     port: 587,
    //     secure: false,
    //     auth: {
    //         user: 'seolzekof34dvfwo@ethereal.email',
    //         pass: '8PkxM3hx4MqvQzFqbQ'
    //     }
});

router.post('/send', (req, res) => {

        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const fromEmail = 'seaflyers@hotmail.com';
        const toEmail   = req.body.toEmail;
        const subject = req.body.subject;
        const emailBody = req.body.emailBody;

        // console.log('Name ' +firstName);
        // console.log('Sure Name ' +lastName);
        // console.log('From ' +fromEmail);
        // console.log('To ' +toEmail);
        // console.log('Subject ' +subject);
        // console.log('Email Body' +emailBody);

        let transporter = nodeMailer.createTransport({
            host: 'mail.directbooking.co.th',
            port: 25,
            secure: false,
            auth: {
                user: 'sinthorn@directbooking.co.th',
                pass: '1978#$Life'
            },
            tls: {
                rejectUnauthorized:false
            }
    });
    let mailOptions = {
        from: '"Sinthorn Pradutnam" <sinthorn@directbooking.co.th>', // sender address
        //to: req.body.to, // list of receivers
        to: toEmail,
        subject: subject, // Subject line
        text: `Hello ${firstName} ${lastName} 

        ${emailBody}
        
        Samui Ocean Tour Team
        Thank you for contact us have a good trip :) `, // plain text body
        //html: '<b>NodeJS Email Tutorial</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.render('index/contact-us');
        });
    });

    router.post('/fullmoon', (req, res) => {
        
                const firstName = req.body.firstName;
                const lastName = req.body.lastName;
                const fromEmail = 'seaflyers@hotmail.com';
                const toEmail   = req.body.toEmail;
                const subject = req.body.subject;
                const emailBody = req.body.emailBody;
        
                // console.log('Name ' +firstName);
                // console.log('Sure Name ' +lastName);
                // console.log('From ' +fromEmail);
                // console.log('To ' +toEmail);
                // console.log('Subject ' +subject);
                // console.log('Email Body' +emailBody);
        
                let transporter = nodeMailer.createTransport({
                    host: 'mail.directbooking.co.th',
                    port: 25,
                    secure: false,
                    auth: {
                        user: 'sinthorn@directbooking.co.th',
                        pass: '1978#$Life'
                    },
                    tls: {
                        rejectUnauthorized:false
                    }
            });
            let mailOptions = {
                from: '"Sinthorn Pradutnam" <sinthorn@directbooking.co.th>', // sender address
                //to: req.body.to, // list of receivers
                to: toEmail,
                subject: subject, // Subject line
                text: `Hello ${firstName} ${lastName} 
                
                Fullmoon Party Reservation 
                
                ${emailBody}
                
                Samui Ocean Tour Team
                Thank you for contact us have a good trip :) `, // plain text body
                //html: '<b>NodeJS Email Tutorial</b>' // html body
            };
        
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
                res.render('index/contact-us');
                });
            });

module.exports = router;

