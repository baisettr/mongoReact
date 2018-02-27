const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CourseSchema = new schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name long 2 chars.'
        },
        required: [true, 'Name is required.']
    },
    code: String
});

const Course = mongoose.model('courses', CourseSchema);

module.exports = Course;