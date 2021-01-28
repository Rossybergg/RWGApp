import React from 'react';
import './footer.scss'
import {Typography} from "@material-ui/core";

function Footer() {

    const year = new Date().getFullYear()

    return(
        <div className="Footer">
            <Typography id="bannerText" variant="body1">{`© ${year} Red Wine Gaming`}</Typography>
        </div>
    )

}

export default Footer;