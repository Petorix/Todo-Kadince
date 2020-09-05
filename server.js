// Imports
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const routes = require("./routes/api");

// NOT IMPLEMENTED - Local user authentication, to show that this is what I would use if it were to be implemented
//      User model has been created for future use
//      Task model has been adjusted to track user IDs
//
// Docs:
// passport config doc - http://www.passportjs.org/docs/configure/
// passport-local doc - http://www.passportjs.org/packages/passport-local/
// const passport = require("passport");
// const localStrategy = require("passport-local").Strategy;

const server = express();
const PORT = process.env.PORT || 8080;

// Database setup
//  DB Info - make sure to change the whitelist entry for actual use
//  Username: kadinceUser
//  Password: kadince123
//  const MONGODB_URI = 'mongodb+srv://kadinceUser:kadince123@todo-kadince.jvj1g.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect("mongodb://localhost/todo_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (e) => console.log(`DB error: ${e}`));
db.once("open", () => console.log("DB connected."));

server.use(express.json());
server.use(express.urlencoded({ encoded: false }));
server.use(morgan("tiny"));
server.use("/", routes);
server.listen(PORT, console.log(`Server is starting on port: ${PORT}`));
