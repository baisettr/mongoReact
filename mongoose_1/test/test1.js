const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoTest');
mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connection
        .once('open', () => { console.log("Connected!"); done(); })
        .on('error', (error) => {
            console.warn('Error!', error);
        });
});

beforeEach((done) => {
    //mongoose.connection.collections.students.drop(() => {
    done();
    //});
});