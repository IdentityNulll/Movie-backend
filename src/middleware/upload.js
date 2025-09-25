const multer = require("multer");
const path = require("path");

// ✅ Disk storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, "uploads/posters"); // Rasmlar shu yerga tushadi
    } else if (file.mimetype.startsWith("video")) {
      cb(null, "uploads/videos");  // Videolar shu yerga tushadi
    } else {
      cb(new Error("Only image or video files allowed"), false);
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// ✅ Multer config (200MB limit)
const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 } // 200 MB
});

module.exports = upload;
