general workflow. 
  1. supplies needed - 
    1. cup to grow it in (foam cup)
    2. dirt
    3 seed
    4 pen to write on the cup
    5. water
  2. Planting process
    1. write on the cup what you're putting in there, with the date
    2. Put a hole in the bottom of the cup for water to drain
    2. put the dirt in the cup
    3. make a little hole for the seed with your finger
    4. Put the seed in
    5. cover the seed with some dirt
    6. put some water
    7. pray that the seed grows

Once the seed is planted and probably in a greenhouse then you...
  1. water it twice a week in the morning. You should see growth within a week

Daily checklist. 
  1. make sure the plant is not wilted
  2. make sure it's not leggy which means it's too tall with now leaves. If it is, you pull it
  3. check for bugs or bug damage
  4. check for mold or diseases

App
Seed / Plant - one plant card with an image and a description, which includes how to plant it
and other stuff. This plant will have a rating. 

tsk6 - save plantings to db
  - Updated crop model to contain fields from plantings as an array of plantings.
  - added growstuffId to onAddToPlantingsClick in crop.js so I can pass it if I need to create a
    new local crop. 
  - updated addToPlantings function in app.js to save the updated crop to the database, along 
    with the plancing info.
  - updated post /api/crop in server.js to push the planting to crop if it's present. 
  - Updated put /api/crop to use findById and update the crop instead of findByIdAndUpdate. 
  - Added setPlantingCrops in useEffect in app.js
  - Updated get /api/crops to return plantings from the db call. 
  *Comitt*

  Issues: 
    - plantingCrops only has one entry per crop, which means that all the plantings for a crop 
      don't show in plantings in the garden. Only one planting per crop. 
    - when first adding a crop to plantings, using the 'plant' button, there is no picture shown
      in plantings in garden. 

