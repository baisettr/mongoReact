const assert = require('assert');
const Student = require('../src/student');
const StudentN = require('../src/studentNew');
const Course = require('../src/course');


describe('playing with  records', () => {
    beforeEach((done) => {
        done();
    });
    let juno = new Student({ name: 'Juno', email: 'juno@orst.edu', phone: 5411234567 });

    //  save

    it('save', (done) => {
        juno.save()
            .then(() => {
                assert(!juno.isNew)
                done();
            });
    });

    //  find

    it('find', (done) => {
        Student.find({ name: 'Juno' })
            .then((students) => {
                console.log(students);
                //console.log(juno);
                //console.log(students[0]._id.toString());
                assert(students[0].name == 'Juno');
                done();
            });
    });
    it('findOne', (done) => {
        Student.findOne({ _id: juno._id })
            .then((students) => {
                console.log(students);
                //console.log(juno);
                //console.log(students[0]._id.toString());
                assert(students.name == 'Juno');
                done();
            });
    });

    //  remove

    it('model instance remove', (done) => {
        juno.remove()
            .then(() => Student.findOne({ _id: juno._id }))
            .then((student) => {
                assert(student === null);
                done();
            });
    });
    it('class method remove', (done) => {
        Student.remove({ name: 'Juno' })
            .then(() => Student.findOne({ name: 'Juno' }))
            .then((student) => {
                assert(student === null);
                done();
            });
    });
    it('class method findOneAndRemove', (done) => {
        Student.findOneAndRemove({ name: 'Juno' })
            .then(() => Student.findOne({ name: 'Juno' }))
            .then((student) => {
                assert(student === null);
                done();
            });
    });
    it('class method findByIdAndRemove', (done) => {
        Student.findByIdAndRemove(juno._id)
            .then(() => Student.findOne({ name: 'Juno' }))
            .then((student) => {
                assert(student === null);
                done();
            });
    });

    //  update

    it('instance type set and save', (done) => {
        juno.set('name', 'Julia');
        juno.save()
            .then(() => Student.find({}))
            .then((students) => {
                assert(students[0].name === 'Julia');
                done();
            });
    });
    it('model instance update', (done) => {
        juno.update({ name: 'Julia' })
            .then(() => Student.findOne({ name: 'Julia' }))
            .then((student) => {
                assert(student === null);
                done();
            });
    });
    it('model class update', (done) => {
        Student.update({ name: 'Juno' }, { name: 'Julia' })
            .then(() => Student.findOne({ name: 'Julia' }))
            .then((student) => {
                assert(student === null);
                done();
            });
    });
    it('model class update one record', (done) => {
        Student.findOneAndUpdate({ name: 'Juno' }, { name: 'Julia' })
            .then(() => Student.findOne({ name: 'Julia' }))
            .then((student) => {
                assert(student === null);
                done();
            });
    });
    it('model class findByIdAnUpdate', (done) => {
        Student.findByIdAndUpdate(juno._id, { name: 'Julia' })
            .then(() => Student.findOne({ name: 'Julia ' }))
            .then((student) => {
                assert(student === null);
                done();
            });
    });
    it('model class update increment by value', (done) => {
        Student.update({ name: 'Juno' }, { $inc: { phone: 1 } })
            .then(() => Student.findOne({ name: 'Juno' }))
            .then((student) => {
                assert(student.phone === 5411234568);
                done();
            });
    });

    //  validate

    it('validate error', (done) => {
        const course = new Course({ name: undefined });
        course.validate((validationResult) => {
            console.log(validationResult);
        })

        const validationResult = course.validateSync();
        const { message } = validationResult.errors.name;
    });
    it('validate error check 2', (done) => {
        const course = new Course({ name: 'Al' });
        const validationResult = course.validateSync();
        const { message } = validationResult.errors.name;
    });
    it('disallow invalid rec to save', (done) => {
        const course = new Course({ name: 'Al' });
        course.save()
            .catch((validationResult) => {
                const { message } = validationResult.errors.name;
            })
    });

    //  nested schema

    it('sub document', (done) => {
        const student = new StudentN({ name: 'Juno', grade: [{ letter: 'A' }] });
        student.save()
            .then(() => student.findOne({ name: 'Juno' }))
            .then((student) => {
                assert(student.grade[0].letter === 'A');
            })
    });

});