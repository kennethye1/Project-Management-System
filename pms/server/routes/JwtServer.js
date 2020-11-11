const router = require("express").Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("../utils/createToken");
const validInfo = require("../authorization/validInfo");
const auth = require("../authorization/Auth");

router.post("/register", validInfo, async (req, res) => {
  try {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      req.body.email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists");
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(req.body.password, salt);

    const newUser = await db.query(
      "INSERT INTO users (username, email, password) values ($1, $2, $3) returning *",
      [req.body.username, req.body.email, hash]
    );

    const token = jwt(newUser.rows[0].user_id);
    res.status(201).json({
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  try {
    const user = await db.query("SELECT * from users where email = $1", [
      req.body.email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Password or Email");
    }

    const valid = await bcrypt.compare(
      req.body.password,
      user.rows[0].password
    );
    if (!valid) {
      return res.status(401).json("Invalid Password or Email");
    }

    const token = jwt(user.rows[0].user_id);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/is-auth", auth, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(403).send("Not Authorized");
  }
});
module.exports = router;
