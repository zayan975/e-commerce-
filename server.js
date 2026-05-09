const app = require("./src/app");
const connectDB = require("./src/config/db");
const connectCloudinary = require("./src/config/cloudianry");



// Connect to MongoDB
connectDB();

// Connect to Cloudinary
connectCloudinary();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

