import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import "./google-map.scss";

const Map = ({lat,lng}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCpc1dvCT_4xCO34w-2tr5slaTfffPfkOo',
  });
  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  return (
    <div className="Map">
      {!isLoaded ? (
       <></>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
        >
          <Marker position={{ lat, lng }} />
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;