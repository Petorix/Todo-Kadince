const express = require("express");
const router = express.Router();
const Task = require("../models/tasks");

router.get("/api", (req, res) => {
  Task.find({})
    .then((data) => {
      // Reverse the data to show the most recently added task first
      res.json(data.reverse());
    })
    .catch((e) => {
      console.log("Error fetching tasks: ", e);
    });
});

router.post("/api/save", (req, res) => {
  const data = req.body;
  const newTask = new Task(data);

  newTask.save((e) => {
    if (e) {
      res.status(500).json({ msg: `Error saving data: ${e}` });
      return;
    }

    return res.json({ msg: "Saved data." });
  });
});

router.post("/api/update", (req, res) => {
  const data = req.body;
  const task = new Task(data);

  task.updateOne(task, task, (e, docs) => {
    if (e) {
      console.log("Error on update: ", e);
    }

    return res.json({ msg: `Updated ${docs.nModified} data.` });
  });
});

router.post("/api/delete", (req, res) => {
  const data = req.body;
  const task = new Task(data);

  task.deleteOne(task, (e) => {
    if (e) {
      console.log("Error deleting task: ", e);
    }

    return res.json({ msg: "Deleted task." });
  });
});

router.get("/*", (req, res) => {
  const data = "Error 404 - Page not found.";
  res.json(data);
});

module.exports = router;
