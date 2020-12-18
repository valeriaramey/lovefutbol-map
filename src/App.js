import React, { useState, useEffect } from 'react'
import ReactMapGl, {Marker, Popup, NavigationControl, FullscreenControl} from "react-map-gl"
import fieldData from "./data/fields.json"


function App() {
    const [viewport, setViewport] = useState({
      latitude: 34.94030819947061,
      longitude:-41.632647956063714,
      width: "100vw",
      height: "100vh",
      zoom: 1
    });


    const[selectedField, setSelectedField] = useState(null);

    const navStyle = {
          position: 'absolute',
          top: 36,
          left: 0,
          padding: '10px'
    };


    useEffect(() => {
      const listener = e => {
        if (e.key === "Escape") {
          setSelectedField(null);
        }
      };
      window.addEventListener("keydown", listener);

      return () => {
        window.removeEventListener("keydown", listener);
      };
  }, []);

    return (
     <div>
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoidmFscmFtIiwiYSI6ImNrZGl6MmVzdjA5dzcycWxqZTBleGRsdGEifQ.UB5yez5jsQVEkrMajr2mog"
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"

        onViewportChange={viewport => {
          setViewport(viewport);
       }}
       >

       <div className="nav" style={navStyle}>
          <NavigationControl />
        </div>

        {fieldData.map((field) => (
          <Marker
            key={field.field_id}
            latitude={field.coordinates[0]}
            longitude={field.coordinates[1]}
          >
           <button
             className="marker-btn"
             onClick={ e => {
              e.preventDefault();
              setSelectedField(field);
            }}
           >
             <img src= "/ball.png" alt="field icon" />
           </button>
          </Marker>
        ))}


        {selectedField ? (
          <Popup
            latitude={selectedField.coordinates[0]}
            longitude={selectedField.coordinates[1]}
            closeOnClick={false}
            onClose={() => {
              setSelectedField(null);
            }}
          >
            <div>
              <h2>{selectedField.name}</h2>
              <p>{selectedField.address}</p>
              <a href={selectedField.link} target="_blank">
                <img width={240} src={selectedField.image} />
              </a>
            </div>
          </Popup>
          ) : null}
      </ReactMapGl>
     </div>
    );
}

export default App;

