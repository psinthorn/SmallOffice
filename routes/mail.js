
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

router.post('/contact', (req, res) => {

    let errors = [];
    let successMsg = [];

    if(!req.body.firstName){
        errors.push({error: '*First name is require'});
    }

    if(!req.body.lastName){
        errors.push({error: '*Last name is require'});
    }

    if(!req.body.toEmail){
        errors.push({error: '*Email is require'});
    }

    if(!req.body.subject){
        errors.push({error: '*Subject is require'});
    }

    if(!req.body.emailBody){
        errors.push({error: '*Message is require'});
    }

    if(errors.length > 0 ){
        res.render('index/contact-us', {
            errors: errors,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            toEmail: req.body.toEmail,
            subject: req.body.subject,
            emailBody: req.body.emailBody,
        });
        
    }else{
        
        successMsg.push(
            {
                success: 'You message has been sent. And thank you for contact us.',
                thankYou: 'Thank You'
    });

        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const fromEmail = 'seaflyers@hotmail.com';
        const toEmail = req.body.toEmail;
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
                rejectUnauthorized: false
            }
        });
        let mailOptions = {
            from: '"Samui Ocean Tour" <seaflyers@hotmail.com>', // sender address
            //to: req.body.to, // list of receivers
            //to: toEmail,
            //to: 'seaflyers@hotmail.com',
            to: 'psinthorn@gmail.com',
            bcc: 'psinthorn@gmail.com',
            subject: subject, // Subject line
            text: `Dear Samui Ocean Tour 
            
            From: ${firstName} ${lastName} 
            Email: ${toEmail}
    
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
            res.render('index/contact-us', {successMsg: successMsg});
        });

    };
 
});

router.get('/reservations/:id', (req, res) => {
    const selectedPackage = req.params.id;
    
       console.log(selectedPackage);
    
});

router.post('/reservations', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const fromEmail = 'seaflyers@hotmail.com';
    const toEmail = req.body.toEmail;
    const choosePackage = req.body.choosePackage;
    const emailBody = req.body.emailBody;
    const reservationEmail = 'psinthorn@gmail.com';

    // console.log('Name ' +firstName);
    // console.log('Sure Name ' +lastName);
    // console.log('From ' +fromEmail);
    // console.log('To ' +toEmail);
    // console.log('Subject ' +subject);
    // console.log('Email Body' +emailBody);
    //  console.log('Email Body' +choosePackage);

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
        from: `Samui Ocean Tour ${fromEmail}`, // sender address
        //to: req.body.to, // list of receivers
        to: toEmail,
        bcc: reservationEmail,
        subject: `Tour Reservations From Website`, // Subject line
        text: `Dear ${firstName} ${lastName} 
                                
                                Your Package Selection: ${choosePackage}
                                
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
        res.render('reservations/thank-you');
    });
});



module.exports = router;

