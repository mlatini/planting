import React from 'react';
import { useHistory } from 'react-router-dom';

const Crop = ({ id, thumbnail_url, name, slug, onAddToGardenClick = f => f, onDetailsClick = f => f }) => {
  const history = useHistory();

  const showDetails = () => {
    history.push({
      // pathname: `/details/${id}`
      pathname: `/details/${id}/${slug}`,
    });
  }
  return (
    <section className="card">
      <div className="card-image">
        <img className="crop-image" src={thumbnail_url} />
        <span className="card-name">{name}</span>
        <button onClick={() => onAddToGardenClick(id)}>Add to my garden</button>
        <button onClick={showDetails}>Details</button>
        {/* <button onClick={() => onDetailsClick(id)}>Details</button> */}
      </div>
    </section>
  );
};
export default Crop;
