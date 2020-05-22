import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { capitalizeFirstLetter } from '../utils';

const Crop = ({
  id,
  thumbnail_url,
  name, slug,
  localCrop: { inGarden },
  onAddToGardenClick = f => f,
  onDetailsClick = f => f,
  onAddToPlantingsClick = f => f,
}) => {
  const history = useHistory();

  const showDetails = () => {
    history.push({
      // pathname: `/details/${id}`
      pathname: `/details/${id}/${slug}`,
    });
  };

  const addToGardenClick = (id) => {
    console.log('addToGarden', id);
    onAddToGardenClick(id);
  };

  return (
    <section className="card">
      <span className="card-header">
        {capitalizeFirstLetter(name)}
      </span>
      <div className="card-image">
        <img className="crop-image" src={thumbnail_url} />
      </div>
      <div className="card-buttons">
        {inGarden ? (
          <span></span>
        ) : (
          <span>
            <button onClick={() => addToGardenClick(id)}>Add to my garden</button>
          </span>
        )}
        <span>
          <button onClick={showDetails}>Details</button>
        </span>
        <span>
          <button onClick={() => onAddToPlantingsClick(id)}>Plant me!</button>
        </span>
        {/* <button onClick={() => onDetailsClick(id)}>Details</button> */}
      </div>
    </section>
  );
};
export default Crop;
