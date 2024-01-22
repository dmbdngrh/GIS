import React, { useState, useEffect } from 'react';

const Cards = ({ clickedCard }) => {
    const [routes, setRoutes] = useState(null);

    const getRoutes = async () => {
        try {
            const response = await fetch("http://localhost:5000/routes");
            const jsonData = await response.json();
            setRoutes(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleOnClick = (id) => {
        clickedCard(id)
    }

    useEffect(() => {
        getRoutes();
    }, []);

    return (<div>
        {routes && routes.map(route => {
            return (<div key={route.route_id} className='card' onClick={() => handleOnClick(route.route_id)}>
                <div className='card-details-left'>
                    <div className='card-details-top-left'>
                        <span className='card-text'>{route.place_name}</span>
                    </div>
                    <div className='card-details-bot-left'>
                        <span className='card-text'>{route.route_name}</span>
                    </div>
                </div>
                <div className='card-details-right'>
                    <div className='card-details-top-right'>
                        <span className='card-text'>{`${route.city}, ${route.province}`}</span>
                    </div>
                    <div className='card-details-bot-right'>
                        <span className='card-text'>{route.difficulty}</span>
                    </div>
                </div>
            </div>

            );
        })}
    </div>
    )

}

export default Cards;