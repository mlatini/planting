import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { capitalizeFirstLetter } from '../utils';
import PropTypes from 'prop-types';

const Crop = ({
  growstuffData: { id: growstuffId },
  growstuffData: { thumbnail_url},
  growstuffData: { name },
  growstuffData: { slug },
  id: localId,
  inGarden,
  onAddToGardenClick = f => f,
  onRemoveFromGardenClick = f => f,
  onDetailsClick = f => f,
  onAddToPlantingsClick = f => f,
}) => {
  const history = useHistory();

  const showDetails = () => {
    history.push({
      // pathname: `/details/${growstuffId}`
      pathname: `/details/${growstuffId}/${slug}`,
    });
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
          <span>
            <button onClick={() => onRemoveFromGardenClick(localId)}>Remove from garden</button>
          </span>
        ) : (
          <span>
            <button onClick={() => onAddToGardenClick({ growstuffId, localId })}>Add to my garden</button>
          </span>
        )}
        <span>
          <button onClick={showDetails}>Details</button>
        </span>
        <span>
          <button onClick={() => onAddToPlantingsClick(growstuffId, localId)}>Plant</button>
        </span>
        {/* <button onClick={() => onDetailsClick(growstuffId)}>Details</button> */}
      </div>
    </section>
  );
};
Crop.propTypes = {
  id: PropTypes.string,
  inGarden: PropTypes.bool,
  onAddToGardenClick: PropTypes.func,
  onRemoveFromGardenClick: PropTypes.func,
  onDetailsClick: PropTypes.func,
  onAddToPlantingsClick: PropTypes.func,
};
export default Crop;
