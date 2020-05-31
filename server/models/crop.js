// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  growstuffId: String,
  inGarden: Boolean,
  slug: String,
});

const Crop = mongoose.model('Crop', cropSchema);
module.exports = Crop;
