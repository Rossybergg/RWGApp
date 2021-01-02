import React, {useContext, useEffect, useState} from "react";
import './home.scss';
import {Typography} from "@material-ui/core";
import logo from '../../assets/images/logo.svg'

function Home(props) {

    return (
        <div className="Home">
            <div id="logoContainer">
                <img src={logo} alt="Red Wine Gaming" id="logo"/>
            </div>
            <div className="BannerContainer">
                <Typography id="bannerText" variant="h3">Coming Soon</Typography>
            </div>
        </div>
    );
}

export default Home;




