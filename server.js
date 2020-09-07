// Imports
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const routes = require("./routes/api");

// NOT IMPLEMENTED - Local user authentication, to show that this is what I would use if it were to be implemented
//      * User model has been created for future use
//      * Task model has been adjusted to track user IDs
//
// Docs:
// passport config doc - http://www.passportjs.org/docs/configure/
// passport-local doc - http://www.passportjs.org/packages/passport-local/
// const passport = require("passport");
// const localStrategy = require("passport-local").Strategy;

const server = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/todo_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (e) => console.log(`DB error: ${e}`));
db.once("open", () => console.log("DB connected."));

server.use(express.json());
server.use(express.urlencoded({ encoded: false }));

// For heroku connection
server.use(express.static("client/build"));

server.use(morgan("tiny"));
server.use("/", routes);
server.listen(PORT, console.log(`Server is starting on port: ${PORT}`));
