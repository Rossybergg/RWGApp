import React from "react";
import './home.scss';
import { Paper, Typography} from "@material-ui/core";
import logo from '../../assets/images/logo.svg'
import Button from "@material-ui/core/Button";

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
                <video playsInline autoPlay muted loop className="video">
                    <source src="https://r1---sn-aigl6nl7.c.drive.google.com/videoplayback?expire=1619322767&ei=T6-EYPT9MLucwtQPvNGk0AU&ip=82.5.202.12&cp=QVRGQURfUVdUSFhPOnBiMWRoLVBCNHhFZkpEdlpZRnE2LWljX1BtSWVLMnJ5TXl3ZHhNNU5vR20&id=44587b7fe5dc526a&itag=22&source=webdrive&requiressl=yes&mh=X1&mm=32&mn=sn-aigl6nl7&ms=su&mv=u&mvi=1&pl=22&ttl=transient&susc=dr&driveid=1rAD7EnLbp6-Zc9HQWaIOpgPDzi_OioGL&app=explorer&mime=video/mp4&vprv=1&prv=1&dur=15.487&lmt=1619308078576995&mt=1619307999&sparams=expire,ei,ip,cp,id,itag,source,requiressl,ttl,susc,driveid,app,mime,vprv,prv,dur,lmt&sig=AOq0QJ8wRQIhAMgrr-DOUoQWYNIFH8fCbwxAOOlzSbPdOrclc1sg4CVyAiAeAIF4-hee8ge7blAwXDJFWbcDjXGYvw2FZVYZ6F5Ftw==&lsparams=mh,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRAIgQdHegL-VYsrM7FHT2Hu86A1Yi9Z-gyC6eq4Jz47v-OoCIE3Gnipbupl7kBiFAXJ7jxDLGkFsRpoafw6cvon2I26h&cpn=NkAVxN5D6ZIVZ_XQ&c=WEB_EMBEDDED_PLAYER&cver=1.20210421.1.0" type="video/mp4"/>
                            Your browser does not support video
                </video>
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




