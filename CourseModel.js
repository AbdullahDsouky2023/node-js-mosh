const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    tags: {
        type: [String],
        validate:{
            validator:function(v)
            {
                
                    const result =  v.length > 0
                    return (result)
                
            },
            message:"course should have at least one or more tag"
        },
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
        enum:["Abdullah","Ibrahim"]
    },
    ispublished: {
        type: Boolean,
        required: true,
    },
    price: {
        type: Number,
        required: function(){return this.ispublished},
    },
});
const Course = mongoose.model('Course',courseSchema)
module.exports = Course