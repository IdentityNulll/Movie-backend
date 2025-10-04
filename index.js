const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const movieRoutes = require("./src/routes/dataRoutes");

dotenv.config();

const app = express();

// ✅ Kengaytirilgan CORS sozlamasi (Netlify uchun ham ishlaydi)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // barcha domenlarga ruxsat
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
app.use("/api", movieRoutes);

// ✅ Fayl hajmi va turiga xatoliklarni ushlash
app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ error: "File too large. Max size is 5GB." });
  }
  if (err.message === "Only image or video files allowed") {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});

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


































// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const movieRoutes = require("./src/routes/dataRoutes");

// dotenv.config();

// const app = express();

// // ✅ CORS - hamma domenlarga ruxsat
// app.use(cors({
//   origin: "*",
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// // ✅ OPTIONS (preflight)
// app.options("*", cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/uploads", express.static("uploads"));
// app.use("/api", movieRoutes);

// app.use((err, req, res, next) => {
//   if (err.code === "LIMIT_FILE_SIZE") {
//     return res.status(400).json({ error: "File too large. Max size is 5GB." });
//   }
//   if (err.message === "Only image or video files allowed") {
//     return res.status(400).json({ error: err.message });
//   }
//   next(err);
// });

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("✅ MongoDB connected");
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => console.error("❌ MongoDB connection error:", err));
