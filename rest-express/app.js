const express = require("express");
const app = express();
const Joi = require("joi");
const { courses } = require("./db");

//midlewares

app.use(express.json());
//routes
app.get("/", (req, res) => {
  res.send("Home page");
});
app.get("/api/courses", (req, res) => {
  res.send(courses);
});
//get single course
app.get("/api/courses/:id", (req, res) => {
  const id = req.params.id;
  const course = courses.find((c) => c.id === parseInt(id));

  if (!course) return res.status(404).send("course is not found ");
  res.send(course);
});

//add single course
app.post("/api/courses", async (req, res) => {
  const { name, instructor, duration, description } = req.body;
  const course = {
    id: courses.length + 1,
    name,
    instructor,
    duration,
    description,
  };
  const { error } = validateCourse(course);
  if (error) {
    return res
      .status(400)
      .send(
        `Validation error for course with id ${course.id}: ${error.details[0].message}`
      );
  }
  //push to the dbS
  courses.push(course);
  res.send(course);
});
//update course
app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course) return res.status(404).send("course is not found ");

  const { error } = validateCourse(course);
  if (error) {
    return res
      .status(400)
      .send(
        `Validation error for course with id ${course.id}: ${error.details[0].message}`
      );
  }

  //push to the dbS
  course.name = req.body.name;
  res.send(course);
});
//Delete course
app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course) return res.status(404).send("course is not found ");

    const index=courses.indexOf(course);
    courses.splice(index,1);
  res.send(course);
});

function validateCourse(course) {
  const courseSchema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required(),
    instructor: Joi.string().required(),
    duration: Joi.string().required(),
    description: Joi.string().required(),
  });

  return courseSchema.validate(course);
}

const port = process.env.PORT || 3000;
//listening
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
