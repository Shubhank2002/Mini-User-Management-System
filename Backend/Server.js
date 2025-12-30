require("dotenv").config();
const express = require("express");
const cookie_parser=require('cookie-parser')
const ConnectDB = require("./config/db");
const AuthRoutes = require("./Routes/AuthRoutes");
const app = express();
const cors = require("cors");
const AdminRoutes = require("./Routes/AdminRoutes");
const UserRoutes = require("./Routes/UserRoutes");

app.use(cors());
app.use(cookie_parser())
app.use(express.json());
ConnectDB();

const port = process.env.PORT || 8000;

app.use("/api/auth", AuthRoutes);

app.use('/api/admin',AdminRoutes)

app.use('/api/users',UserRoutes)

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
