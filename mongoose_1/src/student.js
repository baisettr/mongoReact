const mongoose = require('mongoose');
const schema = mongoose.Schema;

const StudentSchema = new schema({
    name: String,
    email: String,
    phone: Number
});

const Student = mongoose.model('student', StudentSchema);

module.exports = Student;