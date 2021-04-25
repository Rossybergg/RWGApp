import React from 'react';
import './footer.scss'
import {Typography} from "@material-ui/core";
import discord from '../../assets/images/discord.png'

function Footer() {

    const year = new Date().getFullYear()

    const goToDiscord = () => {
        const url = 'http://www.discord.gg/hBxWqdh';
        window.open(url, '_blank', 'noopener');
    }

    return(
        <div className="Footer">
            <div className="FooterMask"/>
            <Typography id="bannerText" variant="body1">{`© ${year} Red Wine Gaming`}</Typography>
            <div className="DiscordInvite">
                <img src={discord}
                     className="DiscordImage"
                     alt="Join us on Discord"
                     onClick={goToDiscord}
                />
            </div>
        </div>
    )

}

export default Footer;