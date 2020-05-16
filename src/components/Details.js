import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cropData from '../crops.json';

const Details = () => {
  const { id, slug } = useParams();
  const [crop, setCrop] = useState([]);
  const [trefleCrop, setTrefleCrop] = useState([]);
  const [trefleCropById, setTrefleCropById] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // growstuff api version 1 
    // setLoading(true);
    // fetch(`https://cors-anywhere.herokuapp.com/http://growstuff.org/api/v1/crops/${id}`)
    //   .then(response => response.json())
    //   .then(crop => setCrop(crop));
    // setLoading(false);
    //
    // growStuff api version 0 (this retrieves the most data)
    setLoading(true);
    fetch(`https://cors-anywhere.herokuapp.com/https://www.growstuff.org/crops/${slug}.json`)
      .then(response => response.json())
      .then(crop => setCrop(crop));
    setLoading(false);

  //  local file for dev (based on api version 0)
    // setLoading(true);
    // setCrop(cropData.find(crop => crop.slug === slug));
    // setLoading(false);

    
  }, []);

  useEffect(() => {
    // trefle api for scientific name
    const scientificName = crop.length === 0 ? '' : encodeURIComponent(crop.scientific_names[0].name.trim())
    const query = `https://cors-anywhere.herokuapp.com/https://trefle.io/api/plants?q=${scientificName}&token=WTVFRTRGZUhNK29TV2t2Z29KOURwZz09`
    setLoading(true);
    fetch(query)
      .then(response => response.json())
      .then(crop => setTrefleCrop(crop));
    setLoading(false);
    
  }, [crop]);

  useEffect(() => {
    // trefle api for plant id. Runs after query by scientific name, since scientific name query
    // only returns limited info
    // Only run the query if there is a trefleCrop
    if (trefleCrop.length >= 1) {
      const query = `https://cors-anywhere.herokuapp.com/${trefleCrop[0].link}?token=WTVFRTRGZUhNK29TV2t2Z29KOURwZz09`
      setLoading(true);
      fetch(query)
        .then(response => response.json())
        .then(crop => setTrefleCropById(crop));
      setLoading(false);
    }
    
  }, [trefleCrop])

  console.log('crop', crop);
  console.log('trefleCrop', trefleCrop);
  console.log('trefleCropById', trefleCropById);
  
  if (loading) {
    return (
      <h1>Loading crop...</h1>
    );
  }

  if (crop.length === 0) {
    return (
      <h1>No crop returned yet...</h1>
    );
  }
  
  return (
    <div>
      <h3>ID: {id}</h3>
      <h1>Details</h1>
      <div className="details-top">
        <div className="details-top-card">
          <h1>{crop.name}</h1>
            <em>
              {crop.scientific_names.length >= 1 ? crop.scientific_names.map(sci => ' ' + sci.name + ' ') : '' }
            </em>
          <div className="image-card">
            <img className="large-image" src={crop.openfarm_data.attributes.main_image_path} />
          </div>
        </div>
        <div className="details-top-card">
          <p>{crop.openfarm_data.attributes.description}</p>
          <p>Sowing method: {crop.openfarm_data.attributes.sowing_method}</p>
        </div>
      </div>
      <div>
        <div className="details-section">
          <div className="details-attribute-cards">
            <div className="details-section-top">
              Median days to first harvest
            </div>
            <div className="details-section-middle">
              {crop.median_days_to_first_harvest}
            </div>
          </div>
          <div className="details-attribute-cards">
            <div className="details-section-top">
              Median days to last harvest
            </div>
            <div className="details-section-middle">
              {crop.median_days_to_last_harvest}
            </div>
          </div>
          <div className="details-attribute-cards">
            <div className="details-section-top">
              Median lifespan
            </div>
            <div className="details-section-middle">
              {crop.median_lifespan}
            </div>
            <div className="details-section-bottom">
             days
            </div>
          </div>
          <div className="details-attribute-cards">
            <div className="details-section-top">
              Row spacing
            </div>
            <div className="details-section-middle">
              {crop.openfarm_data.attributes.row_spacing}
            </div>
            <div className="details-section-bottom">
             centimeters
            </div>
          </div>
          <div className="details-attribute-cards">
            <div className="details-section-top">
              Spread (diameter)
            </div>
            <div className="details-section-middle">
              {crop.openfarm_data.attributes.spread}
            </div>
            <div className="details-section-bottom">
              Centimeters
            </div>
          </div>
          <div className="details-attribute-cards">
            <div className="details-section-top">
              Sun requirements
            </div>
            <div className="details-section-middle">
              {crop.openfarm_data.attributes.sun_requirements}
            </div>
          </div>
        </div>
      </div>
      <p>Alternate names:
        {crop.alternate_names.length >= 1 ? crop.alternate_names.map(alt => ' ' + alt.name + ' ') : '' }
      </p>
      <p>Binomial name: {crop.openfarm_data.attributes.binomial_name}</p>
      <p>Common names: {crop.openfarm_data.attributes.common_names}</p>
      <p>Growing degree days: {crop.openfarm_data.attributes.growing_degree_days}</p>
      <p>Guides count: {crop.openfarm_data.attributes.guides_count}</p>
      <p>height: {`${crop.openfarm_data.attributes.height} centimeters`}</p>
      <p>Tags array: {crop.openfarm_data.attributes.tags_array}</p>
      <p>Taxon: {crop.openfarm_data.attributes.taxon}</p>
      <p>Perennial: {crop.perennial ? 'True' : 'False'}</p>
    </div>
  );
};
export default Details;
