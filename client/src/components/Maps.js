import { useState, useEffect, useMemo, useCallback } from 'react';
import { GoogleMap, LoadScript, MarkerF, PolylineF, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import mountainIcon from '../icons/mountains.png';
import hikeIcon from '../icons/hike.png';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const Maps = ({ onMarkerClick, putMarkerState, locationMarkerCoor, currentSelectedCard }) => {

    // Define the center of the map using the useMemo hook
    const center = useMemo(() => ({ lat: -6.742540, lng: 106.757082 }), []);

    // Define the options for the map using the useMemo hook
    const options = useMemo(() => ({
        mapId: 'ae4b64d137d842b3',
        disableDefaultUI: true,
        clickableIcons: false,
    }), []);

    // State variables for routes, places, route, location marker, directions, directions status,
    // selected marker ID, selected place marker, place name, distance, and duration
    const [routes, setRoutes] = useState([]);
    const [places, setPlaces] = useState([]);
    const [route, setRoute] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [directions, setDirections] = useState(null);
    const [directionsStatus, setDirectionsStatus] = useState(null);
    const [selectedMarkerId, setSelectedMarkerId] = useState(null);
    const [selectedPlaceMarker, setSelectedPlaceMarker] = useState(null);
    const [placeName, setPlaceName] = useState('');
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);

    // Function to fetch all routes from the server
    const getRoutes = async () => {
        try {
            const response = await fetch("http://localhost:5000/routes");
            const jsonData = await response.json();
            setRoutes(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    // Function to fetch all places from the server
    const getPlaces = async () => {
        try {
            const response = await fetch("http://localhost:5000/place");
            const jsonData = await response.json();
            setPlaces(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }
    
    // Function to fetch a specific route by ID from the server
    const getRoutesId = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/routes/${id}`);
            const jsonData = await response.json();
            setRoute(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    // Fetch places and routes at the start
    useEffect(() => {
        getPlaces();
        getRoutes();
    }, []);

    // Set the selected marker ID when the currentSelectedCard changes
    useEffect(() => {
        if (currentSelectedCard !== null) {
            setSelectedMarkerId(currentSelectedCard);
        }
    }, [currentSelectedCard])

    // Fetch the route data when the selectedMarkerId changes
    useEffect(() => {
        if (selectedMarkerId !== null) {
            getRoutesId(selectedMarkerId);
        }
    }, [selectedMarkerId]);

    // Perform actions when putMarkerState, locationMarker, route change
    // locationMarker and route will be passed to the parent component
    useEffect(() => {
        console.log(putMarkerState);
        locationMarkerCoor(locationMarker);
        onMarkerClick(route);
    })

    // Update distance, duration, and place name when directions and directionsStatus change
    useEffect(() => {
        if (directions && directionsStatus === 'OK') {
            // Extract distance and duration from directions response
            const leg = directions.routes[0].legs[0];
            const endAddress = directions.routes[0].legs[0].end_address;
            // Set the extracted place name, distance, and duration
            setPlaceName(endAddress);
            setDistance(leg.distance.text);
            setDuration(leg.duration.text);
        }
    }, [directions, directionsStatus]);

    // Function to handle map click event
    const handleMapClick = (event) => {
        // Extract the latitude and longitude coordinates of the clicked location
        const clickedLat = event.latLng.lat();
        const clickedLng = event.latLng.lng();

         // Check if the putMarkerState is true (when trying to make a custom location)
        if (putMarkerState) {
            // Clear the existing location marker if it exists
            if (locationMarker) {
                setLocationMarker(null);
            }
            // Create a new marker object with the clicked coordinates
            const newMarker = {
                lat: clickedLat,
                lng: clickedLng,
            };
            // Set the new location marker with the clicked coordinates
            setLocationMarker(newMarker);
            console.log(locationMarker);
        } else {
            // Clicking on the map will
            // Reset the route, selected marker ID, selected place marker, location marker, and directions status
            setRoute(null)
            setSelectedMarkerId(null)
            setSelectedPlaceMarker(null);
            setLocationMarker(null)
            setDirectionsStatus(null)
        }
        console.log('Clicked coordinates:', clickedLat, clickedLng);
    };

    // Function to handle marker click events
    const markerOnClick = useCallback(
        (data) => {
            setSelectedMarkerId(data);
            setDirections(null);
        },
        [setSelectedMarkerId]
    );

    // Function to handle place(mountain) marker click events
    const placeMarkerOnClick = useCallback(
        (data) => {
            setSelectedPlaceMarker(data);
        },
        [setSelectedPlaceMarker]
    );

        console.log(placeName);
    return (<>
        <div className='map-container'>
            <LoadScript googleMapsApiKey="[GMAPS_API_KEY]">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12}
                    options={options}
                    onClick={handleMapClick}
                >
                    {directions && directionsStatus === 'OK' && (
                        <DirectionsRenderer directions={directions} />
                    )}

                    {locationMarker && (
                        <MarkerF
                            position={{ lat: locationMarker.lat, lng: locationMarker.lng }}
                        />
                    )}
                    {places.map(place => {
                        // console.log(place.location_coor[0]);
                        return (
                            <MarkerF key={`${place.id}-p`} position={place.location_coor[0]} icon={{
                                url: mountainIcon,
                                labelOrigin: new window.google.maps.Point(15, -1)
                            }}
                                label={place.name} onClick={() => placeMarkerOnClick(place.id)} />
                        );
                    })}
                    {routes.map(route => {
                        const firstLocation = route.route_geometry[0];
                        console.log('test')

                        return (
                            <MarkerF key={route.route_id} position={firstLocation} icon={{
                                url: hikeIcon,
                                labelOrigin: new window.google.maps.Point(15, 40)
                            }}
                                label={route.route_name}
                                onClick={() => markerOnClick(route.route_id)} />
                        );
                    })}
                    {route && route.map(route => {

                        let mainPolylineOptions = {
                            strokeColor: 'white',
                            zIndex: -1,
                            strokeOpacity: 1,
                            strokeWeight: 3,
                        };
                        let borderPolylineOptions = {
                            strokeColor: 'darkgreen',
                            zIndex: -2,
                            strokeOpacity: 0.5,
                            strokeWeight: 10,
                        };

                        if (route.difficulty === 'Easy') {
                            mainPolylineOptions.strokeColor = 'green';
                        } else if (route.difficulty === 'Moderate') {
                            mainPolylineOptions.strokeColor = 'orange';
                        } else if (route.difficulty === 'Hard') {
                            mainPolylineOptions.strokeColor = 'red';
                        }
                        return (<>
                            <PolylineF key={`${route.route_id}-b`} path={route.route_geometry} options={borderPolylineOptions} />
                            <PolylineF key={route.route_id} path={route.route_geometry} options={mainPolylineOptions} />
                        </>
                        )
                    })}

                    {selectedPlaceMarker && routes
                        .filter(route => route.place_id === selectedPlaceMarker)
                        .map(route => {
                            let polylineOptions = {
                                strokeColor: 'white',
                                zIndex: -1,
                                strokeOpacity: 0.5,
                                strokeWeight: 5,
                            };
                            if (route.difficulty === 'Easy') {
                                polylineOptions.strokeColor = 'green';
                            } else if (route.difficulty === 'Moderate') {
                                polylineOptions.strokeColor = 'orange';
                            } else if (route.difficulty === 'Hard') {
                                polylineOptions.strokeColor = 'red';
                            }
                            return <PolylineF key={route.id} path={route.route_geometry} options={polylineOptions} />
                        }
                        )}
                    {directionsStatus !== 'OK' && route && locationMarker && (
                        <DirectionsService
                            options={{
                                destination: route[0].route_geometry[0],
                                origin: locationMarker,
                                travelMode: 'DRIVING',
                            }}
                            callback={(response, status) => {
                                if (status === 'OK') {
                                    setDirections(response);
                                } else {
                                    console.log('Directions request failed:', status);
                                }
                                setDirectionsStatus(status);
                            }}
                        />
                    )}

                </GoogleMap>
            </LoadScript>
        </div>
    </>
    );
};

export default Maps;
