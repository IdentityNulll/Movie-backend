const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  name: {
    uz: { type: String },
    en: { type: String },
    rus: { type: String },
  },
  description: {
    uz: { type: String },
    en: { type: String },
    rus: { type: String },
  },
  ageRestrict: { type: Number },
  createdCountry: { type: String },
  rating: { type: Number },

  poster: { type: String },
  video: { type: String }, 
  trailerLink: {type: String},

  genres: {type: String},
  originatedYear: {type: Number},
  runningTime: {type: String},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Movie", dataSchema);