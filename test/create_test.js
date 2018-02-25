const assert = require('assert');
const Itinerary = require('../models/itinerary');

describe('Create itinerary test', (done) => {

    it('Itinerary create test done', (done) => {

        const newItinerary = new Itinerary({
            name: 'King Bed'
        });
    
        newItinerary.save()
        .then(() => {
            assert(!newItinerary.isNew);
            done();
        });
        
    });
       
});


