import React from 'react'
import {Paper, Typography} from '@material-ui/core';
import PanTool from '@material-ui/icons/PanTool';
import '../notAuthorised/notAuthorised.scss'

function NotFound() {

    return(
        <div className="NotAuthorised">
            <Paper className="Paper" elevation="2">
                <div id="iconContainer">
                    <PanTool id="blockIcon"/>
                </div>
                <div id="textContainer">
                    <Typography variant="h3">
                        Not Found
                    </Typography>
                    <Typography variant="subtitle1">
                        Woah... What were you looking for? Whatever it was you won't find it here!
                    </Typography>
                </div>
            </Paper>
        </div>
    )

}

export default NotFound