import React, { useState, useEffect } from 'react';
import './App.css';
import cropData from './crops.json';
import Crops from './components/Crops';
import Details from './components/Details';
import Garden from './components/Garden';
import { Switch, Route, Link } from 'react-router-dom';
import { GiSunflower } from 'react-icons/gi'

function App () {
  const [crops, setCrops] = useState([]);
  const [gardenCrops, setGardenCrops] = useState([]);
  const [plantings, setPlantings] = useState([]);

  useEffect(() => {
    // growstuff api version 0
    // fetch('https://cors-anywhere.herokuapp.com/http://growstuff.org/crops.json')
    //   .then(response => response.json())
    //   .then(crops => setCrops(crops));

    // local info for dev
    setCrops(cropData);
  }, []);

  console.log('crops', crops);
  console.log('gardenCrops', gardenCrops);
  console.log('plantings', plantings);

  const addToGarden = (id) => {
    setGardenCrops([...gardenCrops, crops.find(crop => crop.id === id)]);
  };

  const addToPlantings = (id) => {
    console.log('addToPlantings');
    setPlantings([...plantings, crops.find(crop => crop.id === id)]);
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
          <Garden crops={gardenCrops} plantings={plantings} addToPlantings={addToPlantings}/>
        </Route>
        <Route path='/crops'>
          <Crops crops={crops} addToGarden={addToGarden} addToPlantings={addToPlantings} />
        </Route>
        {/* <Route path='/details/:id'> */}
        {/*   <Details /> */}
        {/* </Route> */}
        <Route exact path='/details/:id/:slug'>
          <Details />
        </Route>
      </div>
    </Switch>
  );
}

export default App;
