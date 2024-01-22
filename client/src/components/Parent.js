import React, { useState } from 'react';
import Maps from './Maps';
import Details from './Details';
import CurrentLocation from './CurrentLoc';
import Cards from './Cards';

const ParentComponent = () => {
    const [currentSelectedRoute, setcurrentSelectedRoute] = useState(null);
    const [currentPutMarkerState, setCurrentPutMarkerState] = useState(null);
    const [currentLocationMarkerCoor, setCurrentLocationMarkerCoor] = useState(null);
    const [currentSelectedCard, setcurrentSelectedCard] = useState(null);


    const handleMarkerClick = (markerId) => {
        setcurrentSelectedRoute(markerId);
        // console.log(currentSelectedRoute);
    };
    const handlePutMarkerButton = (state) => {
        setCurrentPutMarkerState(state);
        // console.log(currentPutMarkerState);
    };

    const handleClickedCard = (cardId) => {
        setcurrentSelectedCard(cardId);
        // console.log(currentSelectedCard);
    };

    // console.log(currentLocationMarkerCoor);

    return (
        <div className='content-container-col'>
            <div className='content-container-row'>
                <div className='left-container-col'>
                    <CurrentLocation handlePutMarkerState={handlePutMarkerButton} currentLocationCoor={currentLocationMarkerCoor} />
                    {/* <div className='search-bar-container'>
                        <input type="text" className="search-input-text-field" placeholder="Search..."></input>
                    </div> */}
                    <div className='cards-container'>
                        <Cards clickedCard={handleClickedCard} />
                    </div>
                </div>
                <div className='right-container-col'>
                    {currentSelectedRoute && (
                        <div className='details-container'>
                            <Details detailName={`Difficulty`} details={`${currentSelectedRoute[0].difficulty}`} />
                            <Details detailName={`Length`} details={`${currentSelectedRoute[0].distance} km`} />
                            <Details detailName={`Elevation Gain`} details={`${currentSelectedRoute[0].elevation} km`} />
                            <Details detailName={`Est. Duration`} details={`~${currentSelectedRoute[0].duration.hours} hours`} />
                        </div>
                    )}
                    <Maps onMarkerClick={handleMarkerClick} putMarkerState={currentPutMarkerState} locationMarkerCoor={setCurrentLocationMarkerCoor} currentSelectedCard={currentSelectedCard}/>

                </div>
            </div>
            <div className='bottom-container'>
            </div>
        </div>
    );
};

export default ParentComponent;