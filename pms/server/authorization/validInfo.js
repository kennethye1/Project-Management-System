const validator = require("validator");

module.exports = (req, res, next) => {
  const { email, username, password } = req.body;

  if (req.path == "/register") {
    if (![email, username, password].every(Boolean)) {
      return res.status(401).json("Missing Fields");
    } else if (!validator.isEmail(email)) {
      return res.status(401).json("Invalid Email Address");
    }
  } else if (req.path == "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).json("Missing Fields");
    } else if (!validator.isEmail(email)) {
      return res.status(401).json("Invalid Email Address");
    }
  }
  next();
};
