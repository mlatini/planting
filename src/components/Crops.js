import React from 'react';
import Crop from './Crop';
import PropTypes from 'prop-types';

const Crops = ({
  crops,
  addToGarden = f => f,
  removeFromGardenClick = f => f,
  addToPlantings = f => f,
}) => {
  console.log('crops', crops);

  return (
    <section>
      <div className="crops-header">
        <h1>Crops</h1>
      </div>
      <div>
        {crops.length === 0 ? (
          <h1>No crops loaded yet</h1>
        ) : (
          crops.map((crop) => (
            <Crop
              {...crop}
              key={crop.id !== '' ? crop.id : crop.growstuffData.id}
              onAddToGardenClick={addToGarden}
              onRemoveFromGardenClick={removeFromGardenClick}
              onAddToPlantingsClick={addToPlantings}
              // onDetailsClick={showDetails}
            />
          ))
        )}
      </div>
    </section>
  );
};
Crops.propTypes = {
  crops: PropTypes.array,
  addToGarden: PropTypes.func,
  removeFromGardenClick: PropTypes.func,
  addToPlantings: PropTypes.func,
};
export default Crops;
