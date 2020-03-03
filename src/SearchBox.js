import React, { Component } from 'react';
import { StandaloneSearchBox, Autocomplete } from '@react-google-maps/api';


export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();

    this.autocomplete = null;

    this.onLoad = (autocomplete) => {
      this.autocomplete = autocomplete;
    };

    this.onPlaceChanged = () => {
      const { input, multipleMarkers, putMarker } = this.props;
      if (this.autocomplete == null) {
        return;
      }
      const place = this.autocomplete.getPlace();
      const markerPos = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      putMarker({ markerPos, input, multipleMarkers });
    };

    this.defaultSearchStyles = {
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
  }

  render() {
    const { props, onPlaceChanged, onLoad, input } = this;

    return (
      <div data-standalone-searchbox="">
        <Autocomplete
          ref={input}
          bounds={props.bounds}
          onPlaceChanged={onPlaceChanged}
          onLoad={onLoad}
        >
          <input
            type="text"
            placeholder="Search location"
            style={{
              ...this.defaultSearchStyles,
            }}
          />
        </Autocomplete>
      </div>
    );
  }
}
