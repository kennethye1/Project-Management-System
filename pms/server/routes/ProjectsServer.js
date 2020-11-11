const router = require("express").Router();
const db = require("../db");
const auth = require("../authorization/Auth");

router.get("/", auth, async (req, res) => {
  try {
    const results = await db.query("SELECT * from projects");
    res.status(200).json({
      results: results.rows.length,
      data: {
        project: results.rows,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//get one project
router.get("/:id", auth, async (req, res) => {
  try {
    const project = await db.query("SELECT * from projects where id= $1", [
      req.params.id,
    ]);

    const tasks = await db.query("SELECT * from tasks where proj_id= $1", [
      req.params.id,
    ]);

    res.status(200).json({
      data: {
        project: project.rows[0],
        tasks: tasks.rows,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//create a project
router.post("/", auth, async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO projects (name, description) values ($1, $2) returning *",
      [req.body.name, req.body.description]
    );
    res.status(201).json({
      data: {
        project: results.rows[0],
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const project = await db.query(
      "UPDATE projects SET name = $1, description = $2 where id=$3 returning *",
      [req.body.name, req.body.description, req.params.id]
    );

    res.status(200).json({
      data: {
        project: results.rows[0],
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//delete
router.delete("/:id", auth, async (req, res) => {
  try {
    const results = await db.query("DELETE FROM projects where id = $1", [
      req.params.id,
    ]);
    res.status(204).json();
  } catch (error) {
    console.error(error.message);
  }
});
// add a Task
router.post("/:id/addTask", async (req, res) => {
  try {
    const newTask = await db.query(
      "INSERT INTO tasks (proj_id, title, description, status) values ($1, $2, $3, $4) returning *;",
      [req.params.id, req.body.title, req.body.description, req.body.status]
    );
    res.status(201).json({
      status: "success",
      data: { task: newTask.rows[0] },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
//update task
router.put("/:project_id/:id", async (req, res) => {
  try {
    const task = await db.query(
      "UPDATE tasks SET title = $1, description = $2, status = $3 where id=$4 returning *",
      [req.body.title, req.body.description, req.body.status, req.params.id]
    );
    console.log(task);

    res.status(200).json({
      data: {
        task: task.rows[0],
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:project_id/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM tasks where id = $1", [
      req.params.id,
    ]);
    res.status(204).json();
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
