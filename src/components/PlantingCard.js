import React from 'react';
import { capitalizeFirstLetter } from '../utils';

const PlantingCard = ({ plantingDate, name, soilType, thumbnail_url, source, cost,
  expectedGerminationDate, scientific_name, locationInGarden }) => {
  return (
    <section className="planting-card">
      <div className="planting-card-header">
        <span className="planting-card-header-left">
          <span className="plant-name">
            {`${capitalizeFirstLetter(name)} `}
          </span>
          <span className="scientific-name">
            {scientific_name}
          </span>
        </span>
        <span className="planting-card-header-right">
          <img className="small-image" src={thumbnail_url} />
        </span>
      </div>
      <div className="planting-card-body">
        <div className="planting-card-attribute">
          <div className="planting-card-attribute-key">
            Planting date
          </div>
          <div className="platning-card-attribute-value">
            {`${plantingDate.getMonth() + 1}-${plantingDate.getDate()}-${plantingDate
              .getFullYear()}`}
          </div>
        </div>
        <div className="planting-card-attribute">
          <div className="planting-card-attribute-key">
            Expected germination date
          </div>
          <div className="platning-card-attribute-value">
            {`${expectedGerminationDate
            .getMonth() + 1}-${expectedGerminationDate.getDate()}-${expectedGerminationDate
              .getFullYear()}`}
          </div>
        </div>
        <div className="planting-card-attribute">
          <div className="planting-card-attribute-key">
            Soil type
          </div>
          <div className="platning-card-attribute-value">
            {soilType}
          </div>
        </div>
        <div className="planting-card-attribute">
          <div className="planting-card-attribute-key">
            Source
          </div>
          <div className="platning-card-attribute-value">
            {source}
          </div>
        </div>
        <div className="planting-card-attribute">
          <div className="planting-card-attribute-key">
            Cost
          </div>
          <div className="platning-card-attribute-value">
            {cost}
          </div>
        </div>
        <div className="planting-card-attribute">
          <div className="planting-card-attribute-key">
            Location in garden
          </div>
          <div className="platning-card-attribute-value">
           {locationInGarden}
          </div>
        </div>
      </div>

    </section>
  );
};
export default PlantingCard;