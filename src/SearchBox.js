import React, { useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';

const SearchBox = ({ input, multipleMarkers, putMarker, bounds }) => {
    const inputRef = useRef();
    const autocompleteRef = useRef(null);

    const onLoad = (autocomplete) => {
      autocompleteRef.current = autocomplete;
    };

    const onPlaceChanged = () => {
      if (autocompleteRef.current == null) {
        return;
      }
      const place = autocompleteRef.current.getPlace();
      const markerPos = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      putMarker({ markerPos, input, multipleMarkers });
    };

    const defaultSearchStyles = {
      boxSizing: 'border-box',
      border: '1px solid transparent',
      width: '240px',
      height: '32px',
      padding: '0 12px',
      borderRadius: '3px',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
      fontSize: '14px',
      outline: 'none',
      textOverflow: 'ellipses',
      marginBottom: '15px',
      position: 'absolute',
      top: '15px',
      left: '0px',
      right: '0px',
      margin: '0 auto',
      zIndex: '1',
    };

    return (
      <div data-standalone-searchbox="">
        <Autocomplete
          ref={inputRef}
          bounds={bounds}
          onPlaceChanged={onPlaceChanged}
          onLoad={onLoad}
        >
          <input
            type="text"
            placeholder="Search location"
            style={{
              ...defaultSearchStyles,
            }}
          />
        </Autocomplete>
      </div>
    );
}

export default SearchBox;
