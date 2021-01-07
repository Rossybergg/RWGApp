import React from 'react'
import {Paper, Typography} from '@material-ui/core';
import Block from '@material-ui/icons/Block';
import './notAuthorised.scss'

function NotAuthorised() {

    return(
        <div className="NotAuthorised">
            <Paper className="Paper" elevation="2">
                <div id="iconContainer">
                    <Block id="blockIcon"/>
                </div>
                <div id="textContainer">
                    <Typography variant="h3">
                        Wait a minute!
                    </Typography>
                    <Typography variant="subtitle1">
                        You either need to log in to do that or you dont have the required privileges.
                    </Typography>
                </div>
            </Paper>
        </div>
    )

}

export default NotAuthorised