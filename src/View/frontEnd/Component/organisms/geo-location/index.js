import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Button, Dropdown, InputGroup, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import ReactMapboxGl, { Marker, ScaleControl, Layer, Feature } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
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

// 1) Added minZoom, maxZoom, reuseMaps, and prefetch to reduce tile calls.
let Map = ReactMapboxGl({
  accessToken: helper.MapBoxPrimaryKey,
  attributionControl: false,
  reuseMaps: true,        // Reuse map instance
  prefetch: false,        // Disable tile prefetching
  minZoom: 1,             // Prevent zooming out too far (adjust as needed)
  maxZoom: 16             // Prevent zooming in too far (adjust as needed)
});

const getCustomMarkerData = (productDetails) => {
  const image = productDetails.image;
  const price = productDetails.displayPrice;
  const fullImageUrl = helper.CampaignProductImagePath + image;
  return { imageUrl: fullImageUrl, price: price }; // Include price in the returned object
};

const groupProductsByLocation = (products) => {
  // go through each item
  // if we already have a group for the current lat/lng, add it to that group
  // else, create a new group
  const grouped = products.reduce((accum, currentItem) => {
    const { lat, lng } = currentItem;
    const loc = `${lat},${lng}`; // our key for looking up the groups in the map

    // if we have the location saved, grab out the group and append our currentItem
    if (accum[loc] !== undefined) {
      const foundGroup = accum[loc];
      foundGroup.push(currentItem);
      accum[loc] = foundGroup;
    } else {
      accum[loc] = [currentItem];
    }

    return accum;
  }, {});

  // console.log({ grouped });
  const groupedArrayOfEntries = Object.entries(grouped);

  // the grouped result is a map with key: locationString, and value: [item | ...items]
  // console.log('groupProductsByLocation:', { groupedArrayOfEntries });

  return groupedArrayOfEntries;
};

const GeoLocation = (props) => {
  const listOfGroupedProducts = groupProductsByLocation(props.productList);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [mapTheme, setMapTheme] = useState(() => {
    // Set initial map theme based on the HTML data-theme attribute
    const htmlTheme = document.documentElement.getAttribute('data-theme');
    return htmlTheme === 'dark' ? 'night' : 'day';
  });

  useLayoutEffect(() => {
    const handleThemeChange = () => {
      const htmlTheme = document.documentElement.getAttribute('data-theme');
      setMapTheme(htmlTheme === 'dark' ? 'night' : 'day');
    };

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, { attributes: true });
    handleThemeChange();

    return () => {
      observer.disconnect();
    };
  }, []);

  const [locked, setLocked] = useState(false);
  const [zoomLevel, setZoom] = useState(1);
  const [hidden, setHidden] = useState(false);
  const [objectVal, setObjectVal] = useState();
  const [viewState, setViewState] = useState({
    zoom: 1
  });

  const onDropdownToggle = (isOpen) => setHidden(isOpen);

  useEffect(() => {
    const handleScrolling = () => {
      if (hidden && window.innerWidth <= 768) {
        // Change 768 to the desired mobile breakpoint
        document.body.style.overflow = 'hidden'; // Disable scrolling
      } else {
        document.body.style.overflow = 'auto'; // Enable scrolling
      }
    };

    // Initial call
    handleScrolling();

    // Attach the event listener
    window.addEventListener('resize', handleScrolling);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleScrolling);
    };
  }, [hidden]);

  const ToggleButton = React.forwardRef(({ children, onClick }, ref) => (
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
  ));

  const toggleState = () => {
    dispatch(setMapLock(!locked));
    setLocked(!locked);
  };

  const sugg = (result, lat, lng) => {
    const locationData = {
      lat: lat,
      lng: lng
    };
    dispatch(setLatLong(locationData));
  };

  useEffect(() => {
    if (user) {
      setZoom(user.zoom ? Number(user.zoom) : 6.3);
      setLocked(user.isMapLocked);
    }
  }, [user]);

  const updateDistance = () => {
    if (user?.distance === '') {
      if (objectVal?.includes('© Mapbox ')) {
        const after_ = objectVal?.substring(objectVal.indexOf('map') + 3);
        dispatch(setDistance(after_));
      } else {
        dispatch(setDistance(objectVal));
      }
    }
  };

  const updateUnlockedDistance = () => {
    if (!user.isMapLocked) {
      dispatch(setLocationFilter('false'));
      if (objectVal?.includes('© Mapbox ')) {
        const after_ = objectVal?.substring(objectVal.indexOf('map') + 3);
        dispatch(setDistance(after_));
      } else if (objectVal?.trim() !== '0 m') {
        dispatch(setDistance(objectVal));
      }
    }
  };

  useEffect(() => {
    updateDistance();
    updateUnlockedDistance();
  }, [dispatch, objectVal, user.distance, user.isMapLocked]);

  const onUpdateResults = () => {
    dispatch(setLocationFilter('true'));
    setHidden(false);
  };

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
          className="geo__dropdown mobile__dropdown dropdown-top-arrow w-350"
        >
          <div className="dropdown__inner position-relative">
            <div className="geo_dropdown-top d-flex align-items-center">
              <InputGroup className="d-flex flex-nowrap input-group__alpha">
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
                <h6 className="me-1">
                  {user.distance === '0 m' ? '50 km' : `${parseInt(user.distance, 10)} km`}
                </h6>
              </div>

              <div className="d-flex align-items-center">
                <Button
                  variant="link"
                  className="geo__lock d-flex justify-content-center p-0 text-decoration-none"
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
              <Map
                {...viewState}
                style={`mapbox://styles/mapbox/navigation-${mapTheme}-v1`}
                zoom={[zoomLevel]}
                center={[user.lng, user.lat]}
                // This manages the update results and displaying the scale level for zoom in KM:
                onRender={(e) => setObjectVal(e.boxZoom._container.outerText)}
                onMove={(event) => {
                  setViewState(event.viewState);
                }}
              >
                <div className="radius-container">
                  <div className="radius-circle"></div>
                </div>
                <ScaleControl style={{ zIndex: '-1' }} />
                <Marker coordinates={[user.lng, user.lat]} className="mapbox-marker-user">
                  <div className="mapboxgl-user-location-dot"></div>
                </Marker>

                {listOfGroupedProducts.length > 0 &&
                  listOfGroupedProducts.map(([loc, groupOfItems], index) => {
                    if (groupOfItems.length > 0) {
                      const [lat, lng] = loc.split(',');
                      return (
                        <Marker
                          key={index}
                          coordinates={[lng, lat]}
                          className="mapbox-marker-custom"
                        >
                          <div className="d-flex align-items-center justify-content-center mapbox-dot-marker">
                            <span style={{ color: '#fff' }} className="fw-bolder fs-7">
                              {groupOfItems.length}
                            </span>
                          </div>
                        </Marker>
                      );
                    }
                  })}
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
                min={0}
                max={220}
                value={zoomLevel * 20}
                railStyle={{ backgroundColor: '#C7E3FB', height: '9px' }}
                disabled={locked}
                onChange={(e) => {
                  setZoom(e / 20);
                  dispatch(setZoomLevel(e / 20));
                }}
              />
            </div>

            <div className="d-grid gap-2 p-2">
              <Button size="lg" className="toggle__btn" variant="success" onClick={onUpdateResults}>
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
