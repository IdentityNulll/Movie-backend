const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const movieRoutes = require("./src/routes/dataRoutes");

dotenv.config();

const app = express();

// ✅ Ruxsat berilgan domenlar
const allowedOrigins = [
  "http://localhost:5173",
  "https://movie-crm.netlify.app",
];

// ✅ CORS sozlamasi
app.use(
  cors({
    origin: function (origin, callback) {
      // Postman yoki server ichki so‘rovlari uchun origin yo‘q bo‘lishi mumkin
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS: This origin is not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
    credentials: true,
  })
);

// ✅ OPTIONS so‘rovlariga avtomatik javob
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
app.use("/api", movieRoutes);

// ✅ Fayl yuklashdagi xatoliklarni ushlash
app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ error: "File too large. Max size is 5GB." });
  }
  if (err.message === "Only image or video files allowed") {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});

// ✅ MongoDB ulanish
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
