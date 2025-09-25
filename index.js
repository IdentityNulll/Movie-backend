const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const movieRoutes = require("./src/routes/dataRoutes");

dotenv.config();

const app = express();

// ✅ CORS config
app.use(cors({
  origin: ["http://localhost:5173", "https://movie.techinfo.uz"],
  credentials: true
}));

// ✅ Katta requestlar uchun limit oshirish
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));

// ✅ Static fayllar
app.use("/uploads", express.static("uploads"));

// ✅ API routes
app.use("/api", movieRoutes);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
