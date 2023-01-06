const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/users.js");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userRoutes);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
