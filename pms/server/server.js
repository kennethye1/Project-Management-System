require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/auth", require("./routes/JwtServer"));
app.use("/api/projects", require("./routes/ProjectsServer"));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`hello at port ${port}`);
});
