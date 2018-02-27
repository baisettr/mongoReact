const assert = require('assert');
const Student = require('../src/student');


describe('playing with  records', () => {

    let juno = new Student({ name: 'petty', petty: "hello" });
    juno['demo'] = "heroku";
    console.log(juno)

    it('save', (done) => {
        juno.save()
            .then(() => {
                console.log("1");
                done();
            });
    });
    it('save', (done) => {
        Student({ name: 'petty', hello: 'geroju' }).save()
            .then(() => {
                console.log("2");
                done();
            });
    });
});