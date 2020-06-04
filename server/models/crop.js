// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  growstuffId: String,
  inGarden: Boolean,
  slug: String,
  plantings: [
    {
      plantingDate: Date,
      soilType: String,
      expectedGerminationDate: Date,
      source: String,
      cost: mongoose.Types.Decimal128,
      locationInGarden: String,
    },
  ],
});

const Crop = mongoose.model('Crop', cropSchema);
module.exports = Crop;
