import React, { useState, useEffect } from 'react';
import { Button, Dropdown, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import ReactMapboxGl, { Marker, ScaleControl, Layer, Feature } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as SearchIcon } from '../../../../../assets/svg/search.svg';
import helper from '../../../../../Common/Helper';
import { Link } from 'react-router-dom';

import {
  setDistance,
  setLatLong,
  setLocationFilter,
  setMapLock,
  setZoomLevel
} from '../../../../../user/user.action';
import './style.scss';

mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default; // eslint-disable-line

let Map = ReactMapboxGl({
  accessToken: helper.MapBoxPrimaryKey,
  attributionControl: false // Disable the default attribution control
});

const GeoLocation = (props) => {
  const wishlistproductList = props.wishListproductList;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const mapStyles = {
    day: 'mapbox://styles/mapbox/navigation-day-v1',
    night: 'mapbox://styles/mapbox/navigation-night-v1'
  };

  const [locked, setLocked] = useState(false);
  const [zoomLevel, setZoom] = useState(7);
  const [hidden, setHidden] = useState(false);
  const [objectVal, setObjectVal] = useState();
  const [viewState, setViewState] = useState({
    zoom: 10
  });

  const onDropdownToggle = (isOpen) => setHidden(isOpen);

  useEffect(() => {
    if (hidden) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling
    }
  }, [hidden]);

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
    if (locked) {
      setLocked(false);
      dispatch(setMapLock(false));
    } else {
      setLocked(true);
      dispatch(setMapLock(true));
    }
  };

  const sugg = (result, lat, lng) => {
    let locationData = {};
    locationData.lat = lat;
    locationData.lng = lng;
    dispatch(setLatLong(locationData));
  };

  useEffect(() => {
    if (user) {
      setZoom(user.zoom ? Number(user.zoom) : 6.3);
      setLocked(user.isMapLocked);
    }
  }, [user]);

  useEffect(() => {
    if (user?.distance === '') {
      if (objectVal?.includes('© Mapbox ')) {
        const after_ = objectVal?.substring(objectVal.indexOf('map') + 3);
        dispatch(setDistance(after_));
      } else {
        dispatch(setDistance(objectVal));
      }
    }

    if (!user.isMapLocked) {
      dispatch(setLocationFilter('false'));
      if (objectVal?.includes('© Mapbox ')) {
        const after_ = objectVal?.substring(objectVal.indexOf('map') + 3);
        dispatch(setDistance(after_));
      } else {
        if (objectVal?.trim() !== '0 m') {
          dispatch(setDistance(objectVal));
        }
      }
    }
  }, [dispatch, objectVal, user.distance, user.isMapLocked]);

  const onUpdateResults = () => {
    dispatch(setLocationFilter('true'));
    setHidden(false);
  };
  const [customMarkerImage, setCustomMarkerImage] = useState([]);

  useEffect(() => {
    const markerImages = wishlistproductList.map((item) => {
      const { organizationDetails } = item.productDetails;
      // const image = organizationDetails.logo;
      const image = item.productDetails.image;
      const price = item.productDetails.displayPrice;
      const fullImageUrl = helper.CampaignProductImagePath + image;
      return { imageUrl: fullImageUrl, price: price }; // Include price in the returned object
    });
    setCustomMarkerImage(markerImages);
  }, [wishlistproductList]);

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
                  //defaultValue={location.locationName}
                  onSuggestionSelect={sugg}
                  country={location.organizationLocation}
                  resetSearch={false}
                />
              </InputGroup>

              <div className="geo__distance" id="">
                <div className="me-1 fs-5">
                  {/* {objectVal} */}
                  {user.distance === '0 m' ? '50 km' : user.distance}
                </div>
              </div>

              <div className="geo__lock d-flex align-items-center">
                <Button
                  variant="link"
                  className="p-0 text-decoration-none mx-auto"
                  onClick={() => toggleState()}
                >
                  <span className="d-flex align-items-center icon fs-5">
                    {!locked ? (
                      <FontAwesomeIcon icon={regular('lock-open')} />
                    ) : (
                      <FontAwesomeIcon icon={solid('lock')} />
                    )}
                  </span>
                </Button>
              </div>
            </div>
            <div className="mapboxgl-map-cust">
              {user.lat && user.lng ? (
                <Map
                  {...viewState}
                  style={mapStyles.day}
                  zoom={[zoomLevel]}
                  center={[user.lng, user.lat]}
                  // onRender={(e) => setObjectVal(e.boxZoom._container.outerText)}
                  onMove={(event) => {
                    setViewState(event.viewState);
                  }}
                >
                  <div className="radius-container">
                    <div className="radius-circle"></div>
                  </div>
                  <ScaleControl style={{ zIndex: '-1' }} />
                  <Marker coordinates={[user.lng, user.lat]} className="mapbox-marker-custom">
                    <div className="mapboxgl-user-location-dot"></div>
                  </Marker>
                  {/* Add the custom marker layer */}
                  <Layer type="symbol" id="custom-marker-layer" layout={{ visibility: 'visible' }}>
                    {wishlistproductList?.map((item, index) => (
                      <Feature
                        key={index}
                        coordinates={[item.productDetails.lng, item.productDetails.lat]}
                        onClick={() => {
                        }}
                      />
                    ))}
                  </Layer>
                  {customMarkerImage.map((marker, index) => (
                    <Marker
                      key={index}
                      coordinates={[
                        wishlistproductList[index].productDetails.lng,
                        wishlistproductList[index].productDetails.lat
                      ]}
                      className="mapbox-marker-custom"
                    >
                      <Link
                      className="link"
                        variant="link"
                        target="_blank"
                        to={'/item/' + wishlistproductList[index]?.productDetails?.slug}
                      >
                        {' '}
                        <img
                          src={marker.imageUrl}
                          alt={`Custom Marker ${index}`}
                          style={{ maxHeight: '62px', maxWidth: '68px' }}
                        />
                        <p className="py-1 px-1 rounded-3 fs-4 fw-semibold bg-white text-dark">${marker.price}</p>
                      </Link>
                    </Marker>
                  ))}
                </Map>
              ) : (
                <></>
              )}
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
                min={0}
                max={220}
                value={zoomLevel * 10}
                railStyle={{ backgroundColor: '#C7E3FB', height: '9px' }}
                disabled={locked}
                onChange={(e) => {
                  setZoom(e / 10);
                  dispatch(setZoomLevel(e / 10));
                }}
              />
            </div>

            <div className="d-grid gap-2 p-2">
              <Button className="toggle__btn" variant="success" onClick={onUpdateResults}>
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

export default React.memo(GeoLocation);
