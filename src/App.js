import React from 'react';
import {Router, Route} from 'react-router'
import {useHistory} from 'react-router-dom'
import Home from './pages/home/Home'
import Events from "./pages/events/Events";
import Footer from "./components/Footer/Footer";
import './App.scss';
import MenuBar from './components/menuBar/MenuBar';
import Store from './store/Store';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function App() {
    return (
        <div className="App">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Store>
                    <div>
                        <MenuBar/>
                    </div>
                    <div className="Page">
                        <Router history={useHistory()}>
                            <Route exact path="/" component={Home}/>
                            <Route path="/events" component={Events}/>
                        </Router>
                    </div>
                    <div>
                        <Footer/>
                    </div>
                </Store>
            </MuiPickersUtilsProvider>
        </div>
    );
}

export default App;
