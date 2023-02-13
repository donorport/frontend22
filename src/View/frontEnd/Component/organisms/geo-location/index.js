import React, { useState, useEffect } from 'react';
import { Button, Dropdown, InputGroup } from 'react-bootstrap';
import { ReactComponent as SearchIcon } from '../../../../../assets/svg/search.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { light, solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import './style.scss';
import helper from '../../../../../Common/Helper';
import ReactMapboxGl, { Marker, ScaleControl } from 'react-mapbox-gl';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import {
  setDistance,
  setLatLong,
  setLocationFilter,
  setMapLock,
  setZoomLevel
} from '../../../../../user/user.action';

mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default; // eslint-disable-line

let Map = ReactMapboxGl({
  accessToken: helper.MapBoxPrimaryKey
});

const GeoLocation = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(false);
  const mapStyles = {
    day: 'mapbox://styles/mapbox/navigation-day-v1',
    night: 'mapbox://styles/mapbox/navigation-night-v1'
  };

  const [state, setState] = useState({
    locked: false
  });
  const onDropdownToggle = (state) => {
    setHidden(state);
  };
  const [objectVal, setObjectVal] = useState();

  const [location, setLocation] = useState({
    organizationLocation: '',
    locationName: '',
    lng: 0,
    lat: 0,
    zoomlevel: 0
  });
  // const scale = new mapboxgl.ScaleControl({
  //   unit: "imperial"
  // });
  // scale.setUnit("metric");
  // Map.addControl(scale)
  // scale.setUnit('metric')
  // console.log(scale)
  // document.getElementById("scale").appendChild(scale.onAdd(Map));
  // scale.onAdd(Map)
  //

  const ToggleButton = React.forwardRef(({ children, onClick }, ref) => {
    return (
      <Button
        ref={ref}
        variant="link"
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
        className="p-0 icon__btn text-decoration-none"
      >
        {children}
      </Button>
    );
  });

  const toggleState = () => {
    if (state.locked) {
      setState({ ...state, locked: false });
      dispatch(setMapLock(false));
    } else {
      // setLocation({
      //   ...location,
      //   lat: user.lat ? Number(user.lat) : 0,
      //   lng: user.lng ? Number(user.lng) : 0,
      //   zoomlevel: 13
      // })
      setState({ ...state, locked: true });
      dispatch(setMapLock(true));
    }
  };

  const sugg = (result, lat, lng, text) => {
    // console.log("result", result)
    // console.log("lat", lat)
    // console.log("lng", lng)
    // console.log("text", text)

    // setLocation({
    //   ...stateData,
    //   address: result,
    //   lat: lat,
    //   lng: lng,

    // })
    setLocation({
      ...location,
      locationName: result,
      lat: lat,
      lng: lng
    });

    let locationData = {};
    locationData.lat = lat;
    locationData.lng = lng;
    dispatch(setLatLong(locationData));
  };

  useEffect(() => {
    setLocation({
      ...location,
      organizationLocation: user.countrySortName,
      lat: user.lat ? Number(user.lat) : 0,
      lng: user.lng ? Number(user.lng) : 0,
      zoomlevel: user.zoom ? Number(user.zoom) : 0
    });

    setState({ ...state, locked: user.isMapLocked });
  }, [user]);

  /*let Obj = {
    // "circle-radius": 100,
    'circle-radius': {
      stops: [
        [0, 0],
        // [12, 100]
        // [12, 2],
        [10, 220]
      ],
      base: 2
    },

    'circle-color': 'rgba(29,161,242,.2)',
    // "circle-stroke-color": "purple",
    'circle-stroke-color': 'rgba(29,161,242,.2)',

    'circle-opacity': 1,
    'circle-stroke-opacity': 1,
    'circle-stroke-width': 1
  };*/

  useEffect(() => {
    // console.log(objectVal)

    if (user.distance === '') {
      if (objectVal?.includes('© Mapbox ')) {
        const after_ = objectVal?.substring(objectVal.indexOf('map') + 3);
        dispatch(setDistance(after_));
      } else {
        dispatch(setDistance(objectVal));
      }
    }

    if (!user.isMapLocked) {
      dispatch(setLocationFilter('false'));
      // console.log(objectVal)
      if (objectVal?.includes('© Mapbox ')) {
        const after_ = objectVal?.substring(objectVal.indexOf('map') + 3);
        // console.log(after_)
        dispatch(setDistance(after_));
      } else {
        dispatch(setDistance(objectVal));
      }
    }

    // console.log(objectVal)

    // Map.setPaintProperty("point-blip", "circle-radius", 8)
    // Map.on("load", () => {
    //   Map.addLayer({
    //     id: "snotel-sites-circle",
    //     type: "circle",
    //     source: "snotel-sites",
    //     paint: {
    //       "circle-color": "#1d1485",
    //       "circle-radius": 8,
    //       "circle-stroke-color": "#ffffff",
    //       "circle-stroke-width": 2,
    //     },
    //   })
    // })

    // console.log(Map)
  }, [objectVal]);

  return (
    <>
      <div
        className={`selected__overlay ${!hidden ? 'hidden' : ''}`}
        onClick={() => setHidden(true)}
      ></div>

      <Dropdown className="d-flex" autoClose="outside" onToggle={onDropdownToggle}>
        <Dropdown.Toggle as={ToggleButton}>
          <span className="d-flex align-items-center icon">
            <FontAwesomeIcon icon={solid('circle-location-arrow')} />
          </span>
        </Dropdown.Toggle>

        <Dropdown.Menu
          renderOnMount
          className="geo__dropdown mobile__dropdown dropdown-top-arrow w-310"
        >
          <div className="dropdown__inner position-relative">
            <div className="geo_dropdown-top d-flex align-items-center">
              <InputGroup className="input-group__alpha">
                <InputGroup.Text>
                  <SearchIcon size={2} className="mapbox-searchicon" />
                </InputGroup.Text>
                {/* <FormControl placeholder="Search" /> */}
                <MapboxAutocomplete
                  publicKey={helper.MapBoxPrimaryKey}
                  inputClass="form-control search"
                  // query={location.locationName}
                  // defaultValue={location.locationName}
                  onSuggestionSelect={sugg}
                  country={location.organizationLocation}
                  resetSearch={false}
                />
              </InputGroup>

              <div className="geo__distance" id="">
                <div className="me-1 fs-5">
                  {/* {objectVal} */}
                  {user.distance}
                </div>
              </div>

              <div className="geo__lock d-flex align-items-center">
                <Button
                  variant="link"
                  className="p-0 text-decoration-none mx-auto"
                  onClick={() => toggleState()}
                >
                  <span className="d-flex align-items-center icon fs-5">
                    {!state.locked ? (
                      <FontAwesomeIcon icon={light('lock-open')} />
                    ) : (
                      <FontAwesomeIcon icon={solid('lock')} />
                    )}
                  </span>
                </Button>
              </div>
            </div>
            <div className="mapboxgl-map" style={{ maxWidth: '100% !important' }}>
              <Map
                style={mapStyles.day}
                zoom={[location.zoomlevel]}
                onRender={(e) => {
                  // console.log('e.boxZoom._container.outerText', e.boxZoom._container.outerText)
                  setObjectVal(e.boxZoom._container.outerText);
                }} //boxZoom._container.outerText
                containerStyle={{
                  height: '300px',
                  maxWidth: '100% !important'
                  //width: '310px'
                }}
                center={[location.lng, location.lat]}

                // onStyleLoad={onStyleLoad}
              >
                <div className="radius-container">
                  <div className="radius-circle"></div>
                </div>

                {/* <Layer
                  type="circle"
                  id="circle"
                  paint={Obj}
                  coordinates={[location.lng, location.lat]}
                >
                  <Feature coordinates={[location.lng, location.lat]} />
                </Layer>*/}

                {/*     <Source
                  id="point"
                  geoJsonSource={{
                    type: 'geojson',
                    data: {
                      type: 'Point',
                      coordinates: [0, 0]
                    }
                  }}
                />

                <Layer
                  id="point-blip"
                  type="circle"
                  sourceId="point"
                  paint={{
                    'circle-radius': 8,
                    'circle-radius-transition': { duration: 0 },
                    'circle-opacity-transition': { duration: 0 },
                    'circle-color': '#007cbf'
                  }}
                />
                <Layer
                  id="point"
                  type="circle"
                  sourceId="point"
                  paint={{
                    'circle-radius': 8,
                    'circle-color': '#007cbf'
                  }}
                />
                */}
                <ScaleControl style={{ zIndex: '-1' }} />

                <Marker coordinates={[location.lng, location.lat]} anchor="bottom">
                  <div className="mapboxgl-user-location-dot"></div>
                </Marker>
              </Map>
            </div>

            <div className="geo__slider">
              <Slider
                handleStyle={{
                  width: '26px',
                  height: '26px',
                  border: 'none',
                  background: '#3596F3',
                  marginTop: '-10px',
                  opacity: '1'
                }}
                min={1}
                max={220}
                value={location.zoomlevel * 10}
                railStyle={{ backgroundColor: '#C7E3FB', height: '9px' }}
                disabled={state.locked}
                onChange={(e) => {
                  setLocation({ ...location, zoomlevel: e / 10 });
                  dispatch(setZoomLevel(e / 10));
                }}
              />
            </div>

            <div className="d-grid gap-2 p-2">
              <Button
                className="toggle__btn"
                variant="success"
                onClick={() => dispatch(setLocationFilter('true'))}
              >
                Update Results{' '}
                {user.locationProductCount > 0 ? ' ( ' + user.locationProductCount + ' ) ' : ''}
              </Button>
            </div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default GeoLocation;
