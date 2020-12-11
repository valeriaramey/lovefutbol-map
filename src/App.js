import React, { useState, useEffect } from 'react'
import ReactMapGl, {Marker, Popup} from "react-map-gl"
import fieldData from "./data/fields.json"


function App() {
    const [viewport, setViewport] = useState({
      latitude: 40.68313619450496,
      longitude:-73.98128935812457,
      width: "100vw",
      height: "100vh",
      zoom: 10
    });
    const[selectedField, setSelectedField] = useState(null);

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

    function handleClick(e) {
      e.preventDefault();
    }

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
            onClose={() => {
              setSelectedField(null);
            }}
          >
            <div>
              <h2>{selectedField.name}</h2>
              <p>{selectedField.address}</p>
              <img width={240} src={selectedField.image} />
              <div onClick={handleClick}>
                <a href="www.google.com">
                  More
                </a>
                </div>
              </div>
          </Popup>
          ) : null}
      </ReactMapGl>
     </div>
    );
}

export default App;
