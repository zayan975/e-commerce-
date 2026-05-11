const express = require("express");
const UserRoutes = require("./routes/UserRoutes");
const cookieParser = require("cookie-parser");
const ProductRoutes = require("./routes/ProductRoutes");
const AdminRoute = require("./routes/AdminRoute");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: 'http://localhost:5174', 
    credentials: true             
}));

app.use(express.json());
app.use(cookieParser());

// api endpoints
app.use("/api/user", UserRoutes);
app.use("/api/product", ProductRoutes);
app.use("/api/admin", AdminRoute);


module.exports = app;