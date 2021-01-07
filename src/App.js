import React from 'react';
import {Router, Route, Switch} from 'react-router'
import {useHistory} from 'react-router-dom'
import Home from './pages/home/Home'
import Events from "./pages/events/Events";
import Footer from "./components/Footer/Footer";
import './App.scss';
import Store from './store/Store';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import MenubarNew from "./components/menuBar/MenuBarNew";
import NotAuthorised from "./pages/notAuthorised/NotAuthorised";
import NotFound from "./pages/notFound/NotFound";

function App() {
    return (
        <div className="App">
            <div className="Background">
                <div className="BgImage"/>
                <div className="Overlay"/>
                <div className="Mask"/>
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Store>
                        <MenubarNew/>
                    <div className="Page">
                        <Router history={useHistory()}>
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route path="/events" component={Events}/>
                                <Route path="/401" component={NotAuthorised}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </Router>
                    </div>
                        <Footer/>
                </Store>
            </MuiPickersUtilsProvider>
        </div>
    );
}

export default App;
