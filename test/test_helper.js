const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect('mongodb://localhost/apdl_test');
    mongoose.connection
    .once('open', () => {
        done();
    })
    .on('error', () => {
        console.log('error', error);
    });
});

beforeEach((done) => {

    //Drop data before next test
    mongoose.connection.collections.itineraries.drop(() => {
        done();
    });

    //console.log("Done");
});
