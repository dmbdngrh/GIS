import React, { Fragment } from "react";
import './header.css';


const Header = () => {
    return (
        <Fragment>
            <div className="top-bar">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="tittle-logo"
                version="1.1"
                viewBox="0 0 128 128"
                xmlSpace="preserve"
                >
                <path d="M122.4 112.5h-4.1c-1.3-4.3-5.1-7.4-9.6-7.6-2.2-5-7-8.2-12.5-8.2-2.1 0-4 .5-5.8 1.3v-4.3h24.2c.7 0 1.4-.4 1.7-1 .3-.6.3-1.4-.2-2l-16.4-22h11.8c.7 0 1.4-.4 1.7-1.1.3-.6.2-1.4-.2-2L97.6 46.2h6.4c.7 0 1.4-.4 1.7-1 .3-.6.2-1.4-.2-2l-18-23.9-.1-.1-.1-.1-.2-.2H87c-.1 0-.1-.1-.2-.1 0 0-.1 0-.1-.1-.1 0-.1-.1-.2-.1h-1.2c-.1 0-.1 0-.2.1 0 0-.1 0-.1.1-.1 0-.1.1-.2.1h-.1l-.2.2-.1.1-.1.1-2.8 3.7L68 5.1l-.1-.1-.1-.1-.2-.2h-.1c-.1-.1-.1-.1-.2-.1 0 0-.1 0-.1-.1-.1 0-.1-.1-.2-.1H66.1 66c-.1 0-.1 0-.2.1h-.1c-.1 0-.2.1-.2.1h-.1l-.2.2-.1.1-.1.1-14.4 19.1-3.7-4.8-.1-.1-.1-.1-.2-.2h-.1c-.1 0-.1-.1-.2-.1 0 0-.1 0-.1-.1-.1 0-.1-.1-.2-.1h-1.2c-.1 0-.1 0-.2.1 0 0-.1 0-.1.1-.1 0-.1.1-.2.1h-.1l-.2.2-.1.1-.1.1-17.8 23.9c-.4.6-.5 1.3-.2 2 .3.6 1 1 1.7 1h6.4L18.4 65.8c-.4.6-.5 1.3-.2 2 .3.6 1 1.1 1.7 1.1h11.8l-16.4 22c-.4.6-.5 1.3-.2 2 .3.6 1 1 1.7 1H41V98c-1.7-.7-3.5-1.1-5.4-1.1-6.4 0-11.9 4.5-13.3 10.6-2.4 1-4.4 2.8-5.5 5.2h-6.1c-1 0-1.9.8-1.9 1.9 0 1 .8 1.9 1.9 1.9h111.8c1 0 1.9-.8 1.9-1.9-.1-1.2-.9-2.1-2-2.1zm-35.7 0h-4.9c.8-.9 1.9-1.6 3.2-1.9.7-.2 1.2-.8 1.4-1.5.7-4.9 4.9-8.5 9.8-8.5 4.4 0 8.2 2.8 9.5 6.9.3.8 1.1 1.4 1.9 1.3H108.2c2.7 0 5 1.6 6.1 3.9H86.7zm-15.2 0V93.8H81.6V108c-1.8 1-3.3 2.6-4.2 4.5h-5.9zm-6.1 0v-19h2.4v19h-2.4zm-7.7 0c-1.1-3.7-4.1-6.5-7.8-7.3V93.8h11.7v18.7h-3.9zm-11.6 0H21.2c.8-.9 1.9-1.6 3.2-1.9.7-.2 1.2-.8 1.4-1.5.7-4.9 4.9-8.5 9.8-8.5 4.4 0 8.2 2.8 9.5 6.9.3.8 1.1 1.4 1.9 1.3H47.6c2.7 0 5 1.6 6.1 3.9h-7.6zm-9.2-44.4c.4-.6.5-1.3.2-2-.3-.6-1-1-1.7-1H23.7l15.4-19.6c.4-.6.5-1.3.2-2-.3-.6-1-1.1-1.7-1.1h-6.5l14.3-18.9 2.8 3.7-4.8 6.3c-.4.6-.5 1.3-.2 2 .3.6 1 1 1.7 1h8.4L34.5 60.6c-.4.6-.5 1.3-.2 2 .3.6 1 1.1 1.7 1.1h14.8L31.1 90.1H20.5l16.4-22zM66.5 9.3l17.8 23.5h-8.5c-.7 0-1.4.4-1.7 1.1-.3.6-.2 1.4.2 2L93.2 60H78.6c-.7 0-1.4.4-1.7 1-.3.6-.3 1.4.2 2l20 26.8H36L56 63c.4-.6.5-1.3.2-2-.3-.6-1-1-1.7-1H39.8l18.9-24.1c.4-.6.5-1.3.2-2-.3-.6-1-1.1-1.7-1.1h-8.5L66.5 9.3zM86 23.6l14.3 18.9h-6.5c-.7 0-1.4.4-1.7 1.1-.3.6-.2 1.4.2 2l15.4 19.6H96.1c-.7 0-1.4.4-1.7 1-.3.6-.3 1.4.2 2l16.4 22h-9L82.3 63.7h14.8c.7 0 1.4-.4 1.7-1.1.3-.6.2-1.4-.2-2l-18.9-24h8.4c.7 0 1.4-.4 1.7-1 .3-.6.2-1.4-.2-2L84 26.2l2-2.6zm.7 77.1c-.5.5-.9 1-1.4 1.5v-8.4h1.4v6.9zm-41.9-6.9h1.4v7.9c-.4-.5-.9-1-1.4-1.4v-6.5z"></path>
                </svg>
                
                <h1 className ="tittle-text">DiverVenture</h1>
            </div>
        </Fragment>
    );
};

export default Header;