import React from "react";

import {
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";

import "@reach/combobox/styles.css";

const libraries = ["places"];
const mapContainerStyle = {
  height: "50vh",
  width: "50vh",
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: -26.9187,
  lng: -49.066,
};

export function MapaInterativo(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [marker, setMarker] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  
    React.useEffect(async () => {
      props.funcao(marker);
    }, [marker]);

  const onMapClick = React.useCallback((e) => {
    setMarker(() => 
      ({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      }),
    );
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        options={options}
        onLoad={onMapLoad}
        onClick={onMapClick}
      >
        {marker && (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {              
              setSelected(marker); 
            }}

            icon={{
              url: 'https://i.imgur.com/cF0FVK0.png',  
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        )}

      </GoogleMap>
    </div>
  );
}

