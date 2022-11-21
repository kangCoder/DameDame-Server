const express = require("express");
const app = express();
const PORT = 8080;
require("dotenv").config();

const api = require("./src/routes/index.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", api);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
