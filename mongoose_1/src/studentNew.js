const mongoose = require('mongoose');
const schema = mongoose.Schema;
const GradeSchema = require('../src/grade');

const StudentSchema = new schema({
    name: String,
    email: String,
    phone: Number,
    grade: [GradeSchema]
});

const Student = mongoose.model('student', StudentSchema);

module.exports = Student;