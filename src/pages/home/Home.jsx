import React, {useContext, useEffect, useState} from "react";
import './home.scss';
import {Paper, Typography} from "@material-ui/core";
import logo from '../../assets/images/logo.svg'

function Home(props) {

    return (
        <div className="Home">
            <Paper className="Paper">
                <div id="logoContainer">
                    <img src={logo} alt="Red Wine Gaming" id="logo"/>
                </div>
                <div className="BannerContainer">
                    <Typography id="bannerText" variant="h4">Coming Soon</Typography>
                </div>
            </Paper>
        </div>
    );
}

export default Home;




