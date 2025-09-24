const express = require("express");
const router = express.Router();
const movieController = require("../controllers/dataController");
const upload = require("../middleware/upload");

// CRUD routes
router.post(
  "/movies",
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  movieController.createMovie
);

router.get("/movies", movieController.getMovies);
router.get("/movies/:id", movieController.getMovieById);

router.put(
  "/movies/:id",
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  movieController.updateMovie
);

router.delete("/movies/:id", movieController.deleteMovie);

module.exports = router;
