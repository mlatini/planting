import React from 'react';
import Crop from './Crop';

const Crops = ({ crops , addToGarden = f => f, showDetails = f => f }) => {
  console.log('crops', crops);

  return (
    <section>
      <h1>Crops</h1>
      {crops.length === 0 ? (
        <h1>No crops loaded yet</h1>
      ) : (
        crops.map((crop) => (
          <Crop
            {...crop}
            key={crop.id}
            onAddToGardenClick={addToGarden}
            onDetailsClick={showDetails}
          />
        ))
      )}
    </section>
  );
};
export default Crops;
