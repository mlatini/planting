import React, { useState, useEffect } from 'react';
import './App.css';
import cropData from './crops.json';
import Crops from './components/Crops';
import Crop from './components/Crop';
import Details from './components/Details';
import Garden from './components/Garden';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App () {
  const [crops, setCrops] = useState([]);
  const [gardenCrops, setGardenCrops] = useState([]);

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

  const addToGarden = (id) => {
    setGardenCrops([...gardenCrops, crops.find(crop => crop.id === id)]);
  };

  const showDetails = (id) => {
    console.log('showDetails', id);
  };

  return (
      <Switch>
        <div className="app">
          <header>
            <nav>
              <ul>
                <li><Link to='/garden'>Go to your garden</Link></li>
                <li><Link to='/crops'>All crops</Link></li>
              </ul>
            </nav>
          </header>
          <Route path='/garden'>
            <Garden crops={gardenCrops} showDetails={showDetails} />
          </Route>
          <Route path='/crops'>
            <Crops crops={crops} addToGarden={addToGarden} showDetails={showDetails} /> 
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
