import React from 'react';
import logo from './rwg.svg';
import bgVideo from './media/appBG.mp4'
import './App.css';

function App() {
  return (
    <div className="App">
        <video playsInline autoPlay muted loop id="bgVid">
            <source src={bgVideo} type="video/mp4"/>
        </video>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Soon
        </p>
      </header>
    </div>
  );
}

export default App;
