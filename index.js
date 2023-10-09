const mongoose = require("mongoose");
const CourseModel = require("./CourseModel");
mongoose
  .connect("mongodb://127.0.0.1:27017/mongoose-excercises")
  .then(() => console.log("connected succssfully to db"))
  .catch((err) => console.log("error when connecting", err.message));

//schema
// createCourse();

async function createCourse() {
  try {
    //Model
    //new course
    const newCourse1 = new CourseModel({
      duration: "45 Months",
      author: "ibrna ",
      isPublished: true,
      price: 12,
    });
    //saving Model
    const result = await newCourse1.save();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}
// getCourses();
async function getCourses() {
  try {
    //Model
    const pageSize = 10;
    const pageNumber = 3;
    const course = await CourseModel.find() //get all
      .or([{ author: "ibrna " }, { isPublished: false }]) // what doc you want to get
      .select() //show what data you want get by adding filtering like author and price
      .count() //get num
      .limit(pageSize) //work like skip function
      .skip((pageNumber - 1) * pageSize); //pagination

    console.log(course);
  } catch (err) {
    console.log(err);
  }
}
// updateCourse();
async function updateCourse(id) {
  try {
    const course = await CourseModel.findById(id);
    if (!course) return;
    course.set({
      name: "React Native Course",
      author: "abdullah",
      price: 100,
    });
    course.save();
    console.log(course);
  } catch (err) {
    console.log("====================================");
    console.log(err);
    console.log("====================================");
  }
}
//removeCourse
async function removeCourse(id) {
  try {
    const result = await CourseModel.deleteOne({ _id: id });

    console.log(result);
  } catch (err) {
    console.log("====================================");
    console.log(err);
    console.log("====================================");
  }
}
removeCourse("65240eae23c274cb48d72ceb");
