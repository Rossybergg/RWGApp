import React, {Component} from "react";
import './menubar.scss';
import AccountCircle from '@material-ui/icons/AccountCircle'

class MenuBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false
        };
    }

    render() {
        return (
            <div id="menuBar">
                <header id="nav-wrapper">
                    <nav id="nav">
                        <div className="nav left">
                            <span className="gradient skew"><h1 className="logo un-skew"><a
                                href="/">[RWG]</a></h1></span>
                            <button id="menu" className="btn-nav"><span
                                className="fas fa-bars"></span></button>
                        </div>
                        <div className="nav right">
                            <a href="#home" className="nav-link active"><span
                                className="nav-link-span"><span className="u-nav">Home</span></span></a>
                            <a href="#about" className="nav-link"><span
                                className="nav-link-span"><span
                                className="u-nav">About</span></span></a>
                            <a href="#work" className="nav-link"><span
                                className="nav-link-span"><span className="u-nav">Members</span></span></a>
                            <a href="#contact" className="nav-link"><span className="nav-link-span"><span
                                className="u-nav">Login  </span><AccountCircle id="accountCircle" fontSize="default"/></span></a>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }

}

export default MenuBar;
