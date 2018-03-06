const assert = require('assert');
const Apartment = require('../models/Apartment');

describe('Apartment controller', (done) => {

    it('Create new apartment', (done) => {

        const newApartment = new Apartment({
            name: 'Sawasdee Krungthep',
            desc: 'Nongbon Pravet'
        });
    
        newApartment.save()
        .then((apartment) => {
            //assert(!newApartment.isNew);
            assert( apartment.name === 'Sawasdee Krungthep');
            assert( apartment.desc === 'Nongbon Pravet');
            done();
        });
        
    });
       
});


