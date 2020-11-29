import React, { useState } from 'react'
import ReactMapGl, {Marker} from "react-map-gl"
import fieldData from "./data/fields.json"



function App() {

  const [viewport, setViewport] = useState({
    latitude: 40.68313619450496,
    longitude:-73.98128935812457,
    width: "100vw",
    height: "100vh",
    zoom: 10
  });


  return (
   <div>
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1IjoidmFscmFtIiwiYSI6ImNrZGl6MmVzdjA5dzcycWxqZTBleGRsdGEifQ.UB5yez5jsQVEkrMajr2mog"
      mapStyle="mapbox://styles/valram/ckf2tl39x01hi19jwu9e8alzp"
      onViewportChange={viewport => {
        setViewport(viewport);
     }}
     >
      {fieldData.map((field) => (
        <Marker
          key={field.field_id}
          latitude={field.coordinates[0]}
          longitude={field.coordinates[1]}
        >
        <button class="marker-btn">
          <img src= "/ball.png" alt="field icon" />
        </button>
        </Marker>
      ))}
    </ReactMapGl>
   </div>
  );
}

export default App;
