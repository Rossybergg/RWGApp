import React, {useEffect, useState} from "react";
import './home.scss';
import { Paper, Typography} from "@material-ui/core";
import logo from '../../assets/images/logo.svg'
import Button from "@material-ui/core/Button";
import LinearProgress from '@material-ui/core/LinearProgress';

function Home(props) {

    const [loadingVideo, setLoadingVideo] = useState(true);

    useEffect(() => {
        const vid = document.getElementById("video");
        vid.onloadeddata = () => {
            setLoadingVideo(false);
        };
    }, [])

    const goToDiscord = () => {
        const url = 'http://www.discord.gg/hBxWqdh';
        window.open(url, '_blank', 'noopener');
    }

    return (
        <div className="Home">
            <Paper className="Paper">
                { loadingVideo ?
                    <div className="progressContainer">
                        <LinearProgress className="progressBar" color="secondary" />
                        <Typography id="bannerText" variant="body2">Loading...</Typography>
                    </div>
                    : null
                }
                <div id="logoContainer">
                    <img src={logo} alt="Red Wine Gaming" id="logo"/>
                </div>
                <div className="BannerContainer">
                    <Typography id="bannerText" variant="h4">Coming Soon</Typography>
                </div>
                <Typography variant="body1">Welcome to Red Wine Gaming</Typography>
                    <Typography variant="body2">Our site is still a little far off but you can come and join us on discord!</Typography>
                <video autoPlay muted loop playsInline className="video" id="video">
                    <source src="https://drive.google.com/uc?export=download&id=1rAD7EnLbp6-Zc9HQWaIOpgPDzi_OioGL" type='video/mp4'/>
                </video>
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




