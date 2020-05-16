import React from 'react';
import Crop from './Crop';

const Garden = ({ crops, showDetails = f => f }) => {
  console.log('crops', crops);
  return (
    <header>
      <h1>Your Garden</h1>
      {crops.length === 0 ? (
        <p>Your garden is empty. You can browse crops and add them to your garden</p>
      ) : (
        crops.map((crop) => (
          <Crop 
            {...crop} 
            key={crop.id} 
            onDetailsClick={showDetails}
          />
        ))
      )}
    </header>
  );
};
export default Garden;
