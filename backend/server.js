const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const categoryRoutes = require("./routes/categoryroutes");
const productRoutes = require("./routes/productroutes");
const cartRoute=require("./routes/cartRoute");
const buyNowRoutes = require("./routes/buyNowRoutes");
const orderRoutes = require("./routes/orderRoutes");

const contactRoutes=require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const sellerRoutes =require("./routes/sellerRoutes");
const scategoryRoutes=require("./routes/scategoryRoutes");
const sproductRoutes=require("./routes/sproductRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
console.log("JWT_SECRET:", process.env.JWT_SECRET);

// ✅ MongoDB connection using ENV
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// mongoose.connect("mongodb://127.0.0.1:27017/gostyle");

app.use("/", categoryRoutes);
app.use("/", productRoutes);
app.use("/", cartRoute);
app.use("/",buyNowRoutes);
app.use("/api/order", orderRoutes);
app.use("/",sellerRoutes);
app.use("/",scategoryRoutes);
app.use("/", userRoutes);
app.use("/",contactRoutes);
app.use("/",adminRoutes);
app.use("/",wishlistRoutes);
app.use("/",sproductRoutes);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
