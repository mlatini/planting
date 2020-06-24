const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const Crop = require('./models/crop');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Mongoose!
mongoose.connect('mongodb://localhost/garden', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once ('open', function() {
  // we're connected!
  console.log('connected to mongo!')
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/crop/:id', (req, res) => {
  console.log('api/crop/:id', req.params.id);
  if (req.params.id) {
    Crop.findById(req.params.id, (err, crop) => {
      console.log('crop in api/crop/:id', crop);
      if (!err && crop) {
        res.json(crop);
      } else {
        res.send(null);
      }
    });
  }
});

app.get('/api/crops', (req, res) => {
  // Return local info from the mongo db and also return growstuff data from the growstuff api in
  // an object named growstuffData.
  // TODO; Also add trefle or others to the results. 
  //
  // local crops from the mongo db
  Crop.find((err, localCrops) => {
    if (!err) {
    // growstuff api version 0
      fetch('http://growstuff.org/crops.json')
        .then(response => response.json())
        .then(growstuffCrops => res.json(growstuffCrops.map((growstuffCrop) => {
          const localCrop = localCrops.find(localCrop => (
            localCrop.growstuffId === growstuffCrop.id)
          ) || {};
          let id = '';
          let growstuffId = '';
          let inGarden = false;
          let slug = '';
          let plantings = [];

          if (localCrop) {
            id = localCrop._id;
            growstuffId = localCrop.growstuffId;
            inGarden = localCrop.inGarden;
            slug = localCrop.slug;
            plantings = localCrop.plantings || [];
          }

          return (
            {
              id: id,
              growstuffId: growstuffId,
              inGarden: inGarden,
              slug: slug,
              plantings: plantings,
              openfarm_data: growstuffCrop.openfarm_data || {},
              growstuffData: { ...growstuffCrop },

            }
          );
        })))
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
    growstuffId: req.body.data.growstuffId,
    inGarden: req.body.data.inGarden,
    slug: req.body.data.slug,
  });
  if (req.body.data.planting) {
    cropToSave.plantings.push(req.body.data.planting);
  }
  cropToSave.save((err, crop) => {
    if (!err) {
      // Return the saved crop, along with the attached data from growstuff.
      const url = `http://growstuff.org/crops/${crop.slug}.json`;
      fetch(url)
        .then(response => response.json())
        .then(data => res.json({ crop, growstuffData: { ...data } }))
        .catch(err => console.log('error in api', err));
    } else {
      console.log('error saving crop to database in /api/crop', err);
    }
  });
});

app.put('/api/crop/', (req, res) => {
  console.log('api/crop/:crop put', req.body);
  // Return the updated crop and create new crop is existing crop is not found.
  const id = req.body.crop.id;
  const inGarden = req.body.crop.inGarden;
  const planting = req.body.crop.planting || undefined;

  const updateCrop = async (crop) => {
    const updatedCrop = await crop.save();
    return updatedCrop;
  };

  Crop.findById(id, (err, cropToUpdate) => {
    if (!err) {
      cropToUpdate.inGarden = inGarden;
      if (planting !== undefined) {
        cropToUpdate.plantings.push(planting);
      }
      updateCrop(cropToUpdate)
        .then(updatedCrop => {
          // Return the saved crop, along with the attached data from growstuff.
          const url = `http://growstuff.org/crops/${updatedCrop.slug}.json`;
          fetch(url)
            .then(response => response.json())
            .then(data => res.json({
              crop: updatedCrop,
              growstuffData: { ...data }
            }))
          // return (
          //   {
          //     id: id,
          //     growstuffId: growstuffId,
          //     inGarden: inGarden,
          //     slug: slug,
          //     plantings: plantings,
          //     openfarm_data: growstuffCrop.openfarm_data || {},
          //     growstuffData: { ...growstuffCrop },
          
            .catch(err => console.log('error in api', err));
        });
    } else {
      console.log('error saving crop to database in /api/crop', err);
    }
  });
});
app.listen(port, () => console.log(`Express listening on port ${port}`));
