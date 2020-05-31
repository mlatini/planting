import React from 'react';
import Crop from './Crop';
import PlantingCard from './PlantingCard';
import { FaTractor } from 'react-icons/fa';
import { GiFlowerPot, GiSunflower, GiFlowers } from 'react-icons/gi'
import PropTypes from 'prop-types';

const Garden = ({
  crops,
  plantings,
  addToPlantings = f => f,
  removeFromGardenClick = f => f,
}) => {
  console.log('crops', crops);
  return (
    <div className="garden-wrapper">
      <div className="garden-left">
        <div className="garden-left-header">
          <span>
            <h1>Your garden</h1>
          </span> 
          <span className="garden-left-image">
            {/* <GiFlowerPot /> */}
          </span>
        </div>
        <div className="garden-left-body">
          {crops.length === 0 ? (
            <p>Your garden is empty. You can browse crops and add them to your garden</p>
          ) : (
            crops.map((crop) => (
              <Crop
                {...crop}
                key={crop.id !== '' ? crop.id : crop.growstuffData.id}
                onAddToPlantingsClick={addToPlantings}
                onRemoveFromGardenClick={removeFromGardenClick}
              />
            ))
          )}
        </div>
      </div>
      <div className="garden-right">
        <div className="plantings">
          <div className="plantings-header">
            <span>
              <h1>{`Plantings - ${plantings.length}`}</h1>
            </span>
            <span className="plantings-header-image">
              {/* <GiFlowers /> */}
            </span>
          </div>
          {plantings.length >= 1 ? (
            plantings.map((planting) => (
              <PlantingCard
                {...planting}
                key={planting.id}
                plantingDate={new Date(Date.now())}
                soilType={'phosphate'}
                expectedGerminationDate={new Date(Date.now())}
                source={'Glendora Nursery'}
                cost={'$5.00'}
                locationInGarden={'Left rear'}
                // image={planting.thumbnail_url}
                // scientificName={planting.scientificName}
                // name={planting.name}
              />
            ))
          ) : (
            <span></span>
          )}
        </div>
        <div className="harvests">
          <div className="harvests-header">
            <span>
              <h1>Harvests</h1>
            </span>
            <span className="harvests-header-image">

            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
Garden.propTypes = {
  crops: PropTypes.array,
  plantings: PropTypes.array,
  addToPlantings: PropTypes.func,
  removeFromGardenClick: PropTypes.func,
};
export default Garden;
