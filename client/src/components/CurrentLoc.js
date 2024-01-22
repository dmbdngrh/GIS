import React, { useEffect, useState } from 'react';

function getPlaceDataFromCoordinates(lat, lng, callback) {
  const geocoder = new window.google.maps.Geocoder();
  const latLng = new window.google.maps.LatLng(lat, lng);

  geocoder.geocode({ location: latLng }, (results, status) => {
    if (status === window.google.maps.GeocoderStatus.OK) {
      if (results.length > 0) {
        const placeData = results[0];
        callback(placeData); 
      }
    } else {
      console.error('Geocoder failed due to: ' + status);
    }
  });
}

const CurrentLocation = ({handlePutMarkerState , currentLocationCoor}) => {
  const [currentLocation, setCurrentLocation] = useState(null)
  const [currentCoor, setCurrentCoor] = useState(null)
  const [putMarkerState, setPutMarkerState] = useState(false)

  useEffect(() => {
    if (currentLocationCoor !== null && window.google) {
      getPlaceDataFromCoordinates(
        currentLocationCoor.lat,
        currentLocationCoor.lng,
        setCurrentLocation
      );
      setCurrentCoor([currentLocationCoor.lat, currentLocationCoor.lng]);
    }
  }, [currentLocationCoor]);

  useEffect(() => {
    if (currentCoor !== null && window.google) {
      getPlaceDataFromCoordinates(currentCoor[0], currentCoor[1], setCurrentLocation);
    }
  }, [currentCoor]);

  useEffect(() =>{
    handlePutMarkerState(putMarkerState);
  })

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position) => {
    const { latitude, longitude } = position.coords;
    // console.log("Current Location:", latitude, longitude);
    setCurrentCoor([latitude, longitude]);
    // console.log(currentCoor);
  };

  return (
    <div className="current-loc-container">
      <button className="current-loc-button" onClick={getLocation}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="800"
          height="800"
          fill="#000"
          className="gpsIcon"
          data-name="Flat Line"
          viewBox="0 0 24 24"
        >
          <path
            fill="var(--color-3)"
            strokeWidth="2"
            d="M14 11a2 2 0 00-4 0c0 2 2 4 2 4s2-2 2-4z"
          ></path>
          <path
            fill="none"
            stroke="var(--color-1-dark)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v2m9 7h-2m-7 9v-2m-9-7h2m9-1a2 2 0 00-4 0c0 2 2 4 2 4s2-2 2-4zm-2-6a7 7 0 107 7 7 7 0 00-7-7z"
          ></path>
        </svg>
      </button>
      <div className="current-loc-texts-container">
        <div className="current-loc-text-label-container" style={{ backgroundColor: 'var(--color-1-light)' }}>
          <div className="current-loc-label-text-container">
            <span className="current-loc-label-text">My Location</span>
          </div>
          <button className="current-loc-put-marker-button" 
          style={putMarkerState ? {
            backgroundColor: 'var(--color-3)',
            borderColor: 'var(--color-4)',
          } : null}
          onClick={() =>setPutMarkerState(!putMarkerState)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="800"
              height="800"
              viewBox="0 0 1024 1024"
              className="mapSelectIcon"
            >
              <path d="M800 416a288 288 0 10-576 0c0 118.144 94.528 272.128 288 456.576C705.472 688.128 800 534.144 800 416zM512 960C277.312 746.688 160 565.312 160 416a352 352 0 01704 0c0 149.312-117.312 330.688-352 544z"></path>
              <path d="M512 448a64 64 0 100-128 64 64 0 000 128zm0 64a128 128 0 110-256 128 128 0 010 256zm345.6 192L960 960H672v-64H352v64H64l102.4-256h691.2zm-68.928 0H235.328l-76.8 192h706.944l-76.8-192z"></path>
            </svg>

          </button>
        </div>
        <div className="current-loc-text-container"><span className="current-loc-text">{currentLocation ? (
          <p>{currentLocation.formatted_address}</p>
        ) : (
          <p>Loading...</p>
        )}</span></div>
      </div>
    </div>
  );
};

export default CurrentLocation;
