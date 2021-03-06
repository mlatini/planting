import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Crops from './components/Crops';
import Details from './components/Details';
import Garden from './components/Garden';
import { Switch, Route, Link } from 'react-router-dom';
import { GiSunflower } from 'react-icons/gi';

function App () {
  const [crops, setCrops] = useState([]);
  const [gardenCrops, setGardenCrops] = useState([]);
  const [plantingCrops, setPlantingCrops] = useState([]);

  useEffect(() => {
    // growstuff api version 0
    // fetch('https://cors-anywhere.herokuapp.com/http://growstuff.org/crops.json')
    //   .then(response => response.json())
    //   .then(crops => setCrops(crops));

    // local info for dev
    fetch('http://localhost:3001/api/crops')
      .then(response => response.json())
      // .then(crops => console.log('crops', crops));
      .then(crops => {
        setCrops(crops);
        setGardenCrops(crops.filter(crop => crop.inGarden));
        setPlantingCrops(crops.filter(crop => crop.plantings.length >= 1));
      });
  }, []);

  console.log('crops', crops);
  console.log('gardenCrops', gardenCrops);
  console.log('plantingCrops', plantingCrops);

  const saveCrop = async (crop) => {
    try {
      const response = await axios.post('http://localhost:3001/api/crop', { data: crop });
      return response;
    } catch (e) {
      console.error(e);
    }
  };

  const updateCrop = async ({ id, inGarden, slug, planting }) => {
    try {
      const crop = { id, inGarden, slug, planting };
      const url = 'http://localhost:3001/api/crop/';
      const response = await axios.put(url, { crop });
      return response;
    } catch (e) {
      console.error(e);
    }
  };

  const removeFromGarden = (localId) => {
    console.log('localId in removeFromGarden function', localId);
    // Save the crop to the database with the inGarden state updated
    updateCrop({
      id: localId,
      inGarden: false,
    })
      // .then(response => console.log('response', response.data));
      // Update changed crop locally,in crops, to reflect the inGarden state from the database save.
      .then(response => {
        setCrops(crops.map(crop => {
          return (
            response.data.crop._id === crop.id
              ? { ...crop, ...response.data.crop, id: response.data.crop._id }
              : { ...crop }
          );
        }));
        // Update gardenCrops
        setGardenCrops(gardenCrops.filter(gardenCrop => {
          return (
            gardenCrop.id !== response.data.crop._id
          );
        }));
      });
  };

  const existingLocalCrop = async (localId) => {
    // Check the database for an existing crop by id. Return true if exists, false if not exists.
    const url = `http://localhost:3001/api/crop/${localId}`;
    const response = await axios.get(url);
    if (response.data === '') {
      return false;
    } else {
      return true;
    }
  };

  const addToGarden = ({ growstuffId, localId = null }) => {
    // Save the crop to the database with the inGarden state updated/added
    // If there's an existing local crop, update it. If not, create a new local crop.
    existingLocalCrop(localId)
      .then(response => response === true
        ? updateCrop({
          id: localId,
          inGarden: true,
        })
        : saveCrop({
          growstuffId: growstuffId,
          inGarden: true,
          slug: crops.find(crop => crop.growstuffData.id === growstuffId).growstuffData.slug,
        })
      )
      // Update changed crop locally,in crops, to reflect the inGarden state from the database save.
      .then(response => {
        setCrops(crops.map(crop => {
          return (
            // There's some inconsistancy in the type of the id field in growstuff api.
            // In this case the returned id in response.data.id is a number.crop.id is a string
            // Therefore I'm using parseInt to do a comparison
            parseInt(crop.growstuffData.id, 10) === parseInt(response.data.growstuffData.id, 10)
              ? { ...crop, ...response.data.crop, id: response.data.crop._id }
              : { ...crop }
          );
        }));
        // Add the crop to gardenCrops with the updated localCrop data from the database save
        setGardenCrops([
          ...gardenCrops,
          {
            ...crops.find(crop => crop.growstuffData.id === growstuffId),
            ...response.data.crop,
            id: response.data.crop._id,
          },
        ]);
      });
  };

  const addToPlantings = (growstuffId, localId = null) => {
    // Save the planting to the database.
    // If there's an existing local crop update it. If there isn't, create a new local crop.
    existingLocalCrop(localId) 
      .then(response => response === true
        ? updateCrop({
          id: localId,
          planting: {
            plantingDate: new Date(),
            soilType: '',
            expectedGerminationDate: new Date(),
            source: '',
            cost: 1.25,
            locationInGarden: '',
          },
        })
        : saveCrop({
          growstuffId: growstuffId,
          slug: crops.find(crop => crop.growstuffData.id === growstuffId).growstuffData.slug,
          planting: {
            plantingDate: new Date(),
            soilType: '',
            expectedGerminationDate: new Date(),
            source: '',
            cost: 1.25,
            locationInGarden: '',
          },
        })
      )
      // Update crop locally, in crops.
      .then(response => {
        console.log('response', response);
        setCrops(crops.map(crop => {
          return (
            // There's some inconsistancy in the type of the id field in growstuff api.
            // In this case the returned id in response.data.id is a number.crop.id is a string
            // Therefore I'm using parseInt to do a comparison
            parseInt(crop.growstuffData.id, 10) === parseInt(response.data.growstuffData.id, 10)
              ? { ...crop, ...response.data.crop, id: response.data.crop._id }
              : { ...crop }
          );
        }));
        setPlantingCrops([
          ...plantingCrops,
          {
            ...response.data.crop,
            id: response.data.crop._id,
            growstuffData: response.data.growstuffData,
          },
        ]);
      });
  };

  return (
    <Switch>
      <div className="app">
        <header className="nav-wrapper">
          <nav className="top-nav">
            <div className="top-nav-left-image">
              <GiSunflower />
            </div>
            <div className="top-nav-left-app-name">
              <h1>
                Planting
              </h1>
            </div>
            <div className="top-nav-links">
              <ul>
                <li><Link to='/garden'>Go to your garden</Link></li>
                <li><Link to='/crops'>All crops</Link></li>
              </ul>
            </div>
          </nav>
        </header>
        <Route path='/garden'>
          <Garden
            crops={gardenCrops}
            plantingCrops={plantingCrops}
            addToPlantings={addToPlantings}
            removeFromGardenClick={removeFromGarden}/>
        </Route>
        <Route path='/crops'>
          <Crops
            crops={crops}
            addToGarden={addToGarden}
            addToPlantings={addToPlantings}
            removeFromGardenClick={removeFromGarden}
          />
        </Route>
        <Route exact path='/details/:id/:slug'>
          <Details />
        </Route>
      </div>
    </Switch>
  );
}

export default App;
