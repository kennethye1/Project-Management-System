require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/projects", async (req, res) => {
  try {
    const results = await db.query("SELECT * from projects");
    res.status(200).json({
      results: results.rows.length,
      data: {
        project: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//get one project
app.get("/api/projects/:id", async (req, res) => {
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
    console.log(error);
  }
});

//create a project
app.post("/api/projects", async (req, res) => {
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
    console.log(error);
  }
});

//update
app.put("/api/projects/:id", async (req, res) => {
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
    console.log(error);
  }
});

//delete
app.delete("/api/projects/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM projects where id = $1", [
      req.params.id,
    ]);
    res.status(204).json();
  } catch (error) {
    console.log(error);
  }
});
// add a Task
app.post("/api/projects/:id/addTask", async (req, res) => {
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
    console.log(error);
  }
});
//update task
app.put("/api/projects/:project_id/:id", async (req, res) => {
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
    console.log(error);
  }
});

app.delete("/api/projects/:project_id/delete/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM tasks where id = $1", [
      req.params.id,
    ]);
    res.status(204).json();
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`hello at port ${port}`);
});
