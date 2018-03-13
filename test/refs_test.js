
const mongoose = require('mongoose');
const Apartment = require('../models/Apartment');
const Location = require('../models/Location');
const Contact = require('../models/Contact');
const Admin = require('../models/UserAdmin');
const Assert = require('assert');

describe('Refs Assocication', () => {

    let krungthep, location = [], contact, admin;

    beforeEach((done) => {
        krungthep = new Apartment({title: 'Sawasdee Krungthep'});
        location = new Location({ title: 'Bangkok' });
        admin = new Admin({email: 'ecosyn1980@gmail.com'});

        krungthep.locations.push(location);
        krungthep.save()
            .then((apartment) => {
                done()
            });

    });

    it.only('Ref test', (Done) => {
            Apartment.findOne({ locations: 'Bangkok'})
            .then((apartment) => {
                console.log(apartment);
                done();
            })
    });
    
});