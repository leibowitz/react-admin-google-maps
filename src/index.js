import React, { useState, useEffect } from 'react';
import { LoadScript } from '@react-google-maps/api';
import Map from './Map';
import SearchBox from './SearchBox';
import { getMarkers, getPosition } from './utils';

const googleMapsLibraries = ['drawing', 'visualization', 'places'];

const GMap = props => {
    const {
      defaultZoom,
      defaultCenter,
      googleKey,
      input,
      multipleMarkers,
      searchable,
      justShow
    } = props;
    const [center, setCenter] = useState(defaultCenter || { lat: 0, lng: 0 });
    const [zoom, setZoom] = useState(defaultZoom || 3);

    const putMarker = ({ markerPos, input, multipleMarkers }) => {
      const currentValue = getMarkers(input);
      if (multipleMarkers) {
        if (currentValue && currentValue !== null) {
          return input.onChange([...currentValue, markerPos]);
        }
        return input.onChange([markerPos]);
      }
      return input.onChange(markerPos);
    };

    const putMarkerFromSearch = ({
      markerPos, input, justShow, multipleMarkers,
    }) => {
      putMarker({ markerPos, input, multipleMarkers });
      setCenter(markerPos);
    };

    const deleteMarker = ({ markerPos, input, multipleMarkers }) => {
      const currentValue = getMarkers(input);
      let newValue;
      if (multipleMarkers) {
        newValue = currentValue.filter(mrk => mrk.lat !== markerPos.lat
          && mrk.lng !== markerPos.lng);
        if (!newValue.length) {
          newValue = null;
        }
      } else { newValue = null; }
      input.onChange(newValue);
    };

    useEffect(() => {
      const markers = getMarkers(input);
      if (markers) {
        if (markers instanceof Array) {
          setCenter(markers[markers.length - 1]);
        } else {
          setCenter(markers);
        }
      }
    }, []);

    const childrenProps = {
      input,
      markers: getMarkers(input),
      multipleMarkers,
    };

    return (
      <LoadScript
        googleMapsApiKey={googleKey}
        language='en'
        region='EN'
        version='weekly'
        libraries={googleMapsLibraries}
      >
        <div style={{ position: 'relative' }}>
          {!!searchable
            && (
              <SearchBox
                putMarker={!justShow ? putMarkerFromSearch : () => { }}
                input={input}
              />
            )
          }
          <Map
            mapElement={<div style={{ height: '100%' }} />}
            center={center}
            defaultZoom={zoom}
            onMapClick={e => putMarker({
              input,
              multipleMarkers,
              markerPos: getPosition(e),
            })}
            onMarkerClick={e => deleteMarker({
              input,
              multipleMarkers,
              markerPos: getPosition(e),
            })}
            {...childrenProps}
          />
        </div>
      </LoadScript>
    );
};

export default GMap;

export const GMapInput = ({ record, source, onChange, ...props }) => (
  <GMap
    {...props}
    input={{ value: record[source], onChange: onChange }}
    searchable={true}
  />
);

export const GMapField = ({ record, source, ...props }) => (
  <GMap
    {...props}
    justShow
    input={{ value: record[source] }}
    searchable={false}
  />
);
