import React, {useContext, useEffect, useState} from "react";
import './home.scss';
import {Link, Paper, Typography} from "@material-ui/core";
import logo from '../../assets/images/logo.svg'
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

function Home(props) {

    const goToDiscord = () => {
        const url = 'http://www.discord.gg/hBxWqdh';
        window.open(url, '_blank', 'noopener');
    }

    return (
        <div className="Home">
            <Paper className="Paper">
                <div id="logoContainer">
                    <img src={logo} alt="Red Wine Gaming" id="logo"/>
                </div>
                <div className="BannerContainer">
                    <Typography id="bannerText" variant="h4">Coming Soon</Typography>
                </div>
                <Typography variant="body1">Welcome to Red Wine Gaming</Typography>
                    <Typography variant="body2">Our site is still a little far off but you can come and join us on discord!</Typography>
                <div className="ButtonContainer">
                    <Button variant="contained"  color="primary" onClick={goToDiscord}>
                        Take me to Discord!
                    </Button>
                </div>
            </Paper>
        </div>
    );
}

export default Home;




