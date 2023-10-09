const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    data: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    ispublished: {
        type: Boolean,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});
const Course = mongoose.model('Course',courseSchema)
module.exports = Course