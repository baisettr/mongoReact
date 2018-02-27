const mongoose = require('mongoose');
const schema = mongoose.Schema;

const GradeSchema = new schema({
    letter: String
});



module.exports = GradeSchema;