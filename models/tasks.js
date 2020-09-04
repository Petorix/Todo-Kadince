const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const TaskSchema = new Schema({
  name: String,
  completed: Boolean,
});

// Model
const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
