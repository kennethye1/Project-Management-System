const router = require("express").Router();
const db = require("../db");
const auth = require("../authorization/Auth");

router.get("/", auth, async (req, res) => {
  try {
    const user = await db.query(
      "SELECT u.username, p.id, p.name, p.description, p.progress from users AS u LEFT JOIN projects AS p ON u.user_id = p.user_id WHERE u.user_id = $1",
      [req.user.id]
    );
    res.status(200).json({
      results: user.rows.length,
      data: {
        project: user.rows,
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
    const project = await db.query(
      "SELECT * from projects where id= $1 AND user_id = $2",
      [req.params.id, req.user.id]
    );

    if (project.rows.length === 0) {
      return res.status(401).json("Unauthorized Access");
    }

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
      "INSERT INTO projects (user_id, name, description) values ($1, $2, $3) returning *",
      [req.user.id, req.body.name, req.body.description]
    );
    console.log(req.user.id);
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
router.put("/:id", auth, async (req, res) => {
  try {
    const project = await db.query(
      "UPDATE projects SET name = $1, description = $2 WHERE id=$3 AND user_id = $4 returning *",
      [req.body.name, req.body.description, req.params.id, req.user.id]
    );
    if (project.rows.length === 0) {
      return res.status(401).json("Unauthorized Access");
    }

    res.status(200).json({
      data: {
        project: project.rows[0],
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
    const results = await db.query(
      "DELETE FROM projects where id = $1 AND user_id = $2 RETURNING *",
      [req.params.id, req.user.id]
    );
    if (results.rows.length === 0) {
      return res.status(401).json("Unauthorized Access");
    }
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
