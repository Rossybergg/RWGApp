import React from 'react'
import {Paper, Typography} from "@material-ui/core";
import './quiz.scss'
import quizBG from '../../assets/images/QuizBG.jpg'
import Button from "@material-ui/core/Button";
import EventSeat from "@material-ui/icons/EventSeat";
import EmojiEvents from "@material-ui/icons/EmojiEvents";
import Chat from "../../components/Chat/Chat";

function Quiz(props) {

    return (
        <div className="Quiz">
            <Paper className="paper-quiz">
                <img className="QuizBg" src={quizBG} alt="QuizBG"/>
                <div className="PaperContents">
                    <Typography variant="h4">Disclaimer:</Typography>
                    <Typography variant="subtitle1" gutterBottom>This is pre-release software and does not represent the final product. When taking part in Beta tests please provide feedback and bugs encountered on our Discord.</Typography>
                    <div className="centerButton">
                        <Button variant="contained" onClick={() => {}} color="secondary"
                                startIcon={<EventSeat/>}>
                            Join As Host
                        </Button>
                    </div>
                    <div className="centerButton">
                        <Button variant="contained" onClick={() => {}} color="secondary"
                                startIcon={<EmojiEvents/>}>
                            Join As Player
                        </Button>
                    </div>
                </div>
            </Paper>
            <div className="chat-container">
                <Chat/>
            </div>
        </div>
    )
}


export default Quiz