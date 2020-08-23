import React, {Component} from "react";
import bgVideo from '../../assets/video/appBG.mp4'
import logo from '../../assets/images/logo.svg'
import './home.scss';
import {Typography} from "@material-ui/core";
import IntroductionText from "../../components/introductionText/IntroductionText";
import MenuBar from "../../components/menuBar/MenuBar";


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        if (localStorage.getItem('loggedIn') !== 'true')
            this.props.history.push('/')
    };


    render() {
        return (
            <div id="home">
                <MenuBar/>
                <div className="header-unit">
                    <img src={logo} alt="Red Wine Gaming" id="logo"/>
                    <div id="video-container">
                        <video playsInline autoPlay loop className="fillWidth">
                            <source src={bgVideo}/>
                            Your browser does not support the video tag. We suggest you upgrade your
                            browser.
                        </video>
                    </div>
                    <Typography id="bannerText" variant="h5">Welcome to Red Wine Gaming</Typography>
                </div>
                <IntroductionText/>
            </div>
        );
    }

}

export default Home;
