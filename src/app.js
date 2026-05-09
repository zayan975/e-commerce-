const express = require("express");
const UserRoutes = require("./routes/UserRoutes");

const app = express();

app.use(express.json());

// api endpoints
app.use("/api/user", UserRoutes);


module.exports = app;