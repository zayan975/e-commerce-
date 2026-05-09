const express = require("express");
const UserRoutes = require("./routes/UserRoutes");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

// api endpoints
app.use("/api/user", UserRoutes);


module.exports = app;