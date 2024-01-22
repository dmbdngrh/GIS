import React, {Fragment} from 'react';
import './App.css';

import Header from "./components/header.js"
import Body from "./components/Parent.js"

function App() {
  return (
    <Fragment>
      <div className='main-container'>
        <Header />    
        <Body/>
      </div>
    </Fragment>
  );
};

export default App;
