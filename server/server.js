const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const Crop = require('./models/crop');
const cropsData = require('../src/crops.json');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Mongoose!
mongoose.connect('mongodb://localhost/garden', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected to mongo!')
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/crops', (req, res) => {
  Crop.find((err, crops) => {
    if (!err) {
    // growstuff api version 0
    fetch('http://growstuff.org/crops.json')
      .then(response => response.json())
        // .then(data => res.json({ crops: crops, growStuffCrops: data }))
        .then(growStuffCrops => res.json(growStuffCrops.map((growStuffCrop) => (
          {
            localCrop: crops.find((crop => crop.growStuffId === growStuffCrop._id)) || {},
            openfarm_data: growStuffCrop.openfarm_data || {},
            ...growStuffCrop,
          }
        ))))
        // .then(data => console.log('data', data))
      .catch(err => console.error(err));
      //
      // local json for dev
      // res.json(cropsData);
    }
  });

});

app.post('/api/crop', (req, res) => {
  const cropToSave = new Crop({
    growStuffId: req.body.data.growStuffId,
    inGarden: req.body.data.inGarden,
    slug: req.body.data.slug,
  });
  // cropToSave.save((err, crop) => err ? res.send(err) : res.json(crop));
  cropToSave.save((err, crop) => {
    if (!err) {
      // Return the saved crop, along with the attached data from growstuff.
      const url = `http://growstuff.org/crops/${crop.slug}.json`;
      fetch(url)
        .then(response => response.json())
        .then(data => res.json({ localCrop: crop, ...data }))
        .catch(err => console.log('error in api', err));
    } else {
      console.log('error saving crop to database in /api/crop', err);
    }
  });
});

app.listen(port, () => console.log(`Express listening on port ${port}`));
