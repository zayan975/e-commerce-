const express = require("express");
const UserRoutes = require("./routes/UserRoutes");
const cookieParser = require("cookie-parser");
const ProductRoutes = require("./routes/ProductRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());

// api endpoints
app.use("/api/user", UserRoutes);
app.use("/api/product", ProductRoutes);


module.exports = app;