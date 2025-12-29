require("dotenv").config();
const express = require("express");
const ConnectDB = require("./config/db");
const AuthRoutes = require("./Routes/AuthRoutes");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());
ConnectDB();

const port = process.env.PORT;

app.use("/api/users", AuthRoutes);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
