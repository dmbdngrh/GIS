import React from 'react';

const Details = ({ detailName, details }) => {
    return (
        <div className='detail-container'>
            <div className='detail-name'>
                <span className='detail-name-text'>{detailName}</span>
            </div>
            <div className='detail'>
                <span className='detail-text'>{details}</span>
            </div>
        </div>
    );
};

export default Details;