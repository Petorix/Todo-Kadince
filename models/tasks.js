const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const TaskSchema = new Schema({
  name: String,
  description: String,
  completed: Boolean,
  dueDate: Date,
  userId: String,
});

// Model
const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
