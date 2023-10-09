const mongoose = require('mongoose');
const Course = require('./CourseModel')

//connect 
mongoose.connect('mongodb://127.0.0.1:27017/mongoose-excercises')
.then(() => console.log("connected succssfully to db"))
.catch((err) => console.log("error when connecting", err.message));

async function getAllCourses() {
    try {
        const courses = await Course
        .find({
        price:{$gt :40},
        name:/.*by*./

    })
        .sort({price:-1})

        console.log(courses);
    } catch (error) {
        console.error(error);
    } 
}
getAllCourses()