import React, { Component } from 'react';
import { LoadScript } from '@react-google-maps/api';
import Map from './Map';
import SearchBox from './SearchBox';
import { getMarkers, getPosition } from './utils';

export default class GMap extends Component {
  constructor(props) {
    super(props);
    const { defaultZoom, defaultCenter } = this.props;

    this.state = {
      center: defaultCenter || { lat: 0, lng: 0 },
      zoom: defaultZoom || 3,
    };

    this.putMarker = ({ markerPos, input, multipleMarkers }) => {
      const currentValue = getMarkers(input);
      if (multipleMarkers) {
        if (currentValue && currentValue !== null) {
          return input.onChange([...currentValue, markerPos]);
        }
        return input.onChange([markerPos]);
      }
      return input.onChange(markerPos);
    };

    this.setCenter = markerPos => this.setState({ center: markerPos });

    this.putMarkerFromSearch = ({
      markerPos, input, justShow, multipleMarkers,
    }) => {
      this.putMarker({ markerPos, input, multipleMarkers });
      this.setCenter(markerPos);
    };

    this.deleteMarker = ({ markerPos, input, multipleMarkers }) => {
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
  }

  componentDidMount() {
    const { input } = this.props;
    const markers = getMarkers(input);
    if (markers) {
      if (markers instanceof Array) {
        this.setState({ center: markers[markers.length - 1] });
      } else {
        this.setState({ center: markers });
      }
    }
  }

  render() {
    const {
      googleKey,
      input,
      multipleMarkers,
      searchable,
      justShow,
    } = this.props;
    const childrenProps = {
      input,
      markers: getMarkers(input),
      multipleMarkers,
    };

    const { center, zoom } = this.state;

    const googleMapsLibraries = ['drawing', 'visualization', 'places'];

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
                putMarker={!justShow ? this.putMarkerFromSearch : () => { }}
                input={input}
              />
            )
          }
          <Map
            mapElement={<div style={{ height: '100%' }} />}
            center={center}
            defaultZoom={zoom}
            onMapClick={e => this.putMarker({
              input,
              multipleMarkers,
              markerPos: getPosition(e),
            })}
            onMarkerClick={e => this.deleteMarker({
              input,
              multipleMarkers,
              markerPos: getPosition(e),
            })}
            {...childrenProps}
          />
        </div>
      </LoadScript>
    );
  }
}

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
