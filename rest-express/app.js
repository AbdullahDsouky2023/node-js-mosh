const express = require("express");
const app = express();
const authenticator = require("./middlewares/auth");
const morgan = require("morgan");
const hemlet = require("helmet");
const config = require("config");
const appDebuger = require("debug")("app:appDebugger");
const coursesRouter = require("./routes/courses");
const homeRouter = require("./routes/home");
//midlewares

app.use(express.json());
app.use(authenticator);
app.use(hemlet());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/courses", coursesRouter);
app.use("/", homeRouter);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
  appDebuger(config.get("dbPassword"));
}

//routes

const port = process.env.PORT || 3000;
//listening
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
