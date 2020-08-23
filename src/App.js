import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Intro from './pages/intro/Intro'
import Home from './pages/home/Home'
import './App.css';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Switch>
            <Route exact path ="/" component={Intro} />
            <Route exact path ="/home" component={Home} />
        </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
