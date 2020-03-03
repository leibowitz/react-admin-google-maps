import React from 'react';
import {
  Marker,
  GoogleMap,
} from '@react-google-maps/api';

const Map = ({
      center,
      onMapClick,
      onMarkerClick,
      markers,
      defaultZoom,
      children
    }) => {
    const putMarkers = () => {
      if (!markers) {
        return;
      }

      if (markers instanceof Array) {
        return markers.map((mrk, i) => (
          <Marker
            key={`mrk${i}`}
            position={mrk}
            onClick={e => onMarkerClick(e)}
          />
        ));
      }

      return (
        <Marker
          key="mrk"
          position={markers}
          onClick={e => onMarkerClick(e)}
        />
      );
    };

    return (
      <GoogleMap
        mapContainerStyle={{
          height: "400px",
          width: "100%"
        }}
        zoom={defaultZoom}
        center={center}
        onClick={e => onMapClick(e)}
      >
        {putMarkers()}
        {children}
      </GoogleMap>
    );
};

export default Map;
