const express = require("express");
const router = express.Router();
const Task = require("../models/tasks");

router.get("/api", (req, res) => {
  Task.find({})
    .then((data) => {
      res.json(data);
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
  const changeTask = new Task(data);

  changeTask.updateOne(changeTask, changeTask, (e, docs) => {
    if (e) {
      console.log("Error on update: ", e);
    }

    return res.json({ msg: "Updated data." });
  });
});

router.get("/*", (req, res) => {
  const data = "Error 404 - Page not found.";
  res.json(data);
});

module.exports = router;
