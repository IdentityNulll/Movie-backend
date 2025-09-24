const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, "uploads/posters");  // all images go here
    } else if (file.mimetype.startsWith("video")) {
      cb(null, "uploads/videos");   // all videos go here
    } else {
      cb(new Error("Only image or video files allowed"), false);
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;
