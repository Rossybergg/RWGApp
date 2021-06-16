import React, {useContext, useState, useEffect} from 'react'
import {Paper, Typography} from "@material-ui/core";
import './quiz.scss'
import quizBG from '../../assets/images/QuizBG.jpg'
import Button from "@material-ui/core/Button";
import EventSeat from "@material-ui/icons/EventSeat";
import EmojiEvents from "@material-ui/icons/EmojiEvents";
import Chat from "../../components/Chat/Chat";
import {UserContext} from "../../store/Store";
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

const messagesTest = [
    {
        system: true,
        message: 'Rossybergg joined the Hangout Chat 👋🏻'
    },
    {
        userId: '500376050103222273',
        avatar: 'a_28d5a787578797c40f1c7e16c160e0ce',
        userName: 'Rossybergg',
        message: 'All ya\'ll going down, theres only 1 king quizzer in town!!!',
        timeStamp: '01/02/2020 14:30'
    },
    {
        userId: '500376050103222272',
        avatar: '',
        userName: 'The Scottish Unicorn',
        message: 'Naaa we are gonna win!!!',
        timeStamp: '01/02/2020 14:31'
    },
    {
        system: true,
        message: 'Test User 2 joined the Hangout Chat 👋🏻'
    },
    {
        userId: '500376050103222272',
        avatar: '',
        userName: 'Test User',
        message: 'In what planet is an ant-eater not a carnivore!!!',
        timeStamp: '01/02/2020 14:32'
    },
    {
        userId: '500376050103222273',
        avatar: 'a_28d5a787578797c40f1c7e16c160e0ce',
        userName: 'Rossybergg',
        message: 'I know right!!!! 🤬',
        timeStamp: '01/02/2020 14:33'
    },
    {
        userId: '500376050103222272',
        avatar: '',
        userName: 'Test User 2',
        message: 'Em..... it eats ants.... not meat 🙄',
        timeStamp: '01/02/2020 14:34'
    }
]

function Quiz(props) {

    const [userProfile] = useContext(UserContext);
    const [messages, setMessages] = useState(messagesTest);

    useEffect(() => {
        socket.on("chat-message", (data) => {
            setMessages((messages) => [...messages, data]);
        });
        socket.on('user-connected', (data) => {
            console.log('user-connected', data)
        });
        const data = {
            userName: 'RossyB',
            userId: 'testId'
        }
        socket.emit('new-connection', data);
    }, []);

    return (
        <div className="Quiz">
            <div className="quiz-content">
                <Paper className="paper-quiz">
                    <img className="QuizBg" src={quizBG} alt="QuizBG"/>
                    <div className="PaperContents">
                        <Typography variant="h4">Disclaimer:</Typography>
                        <Typography variant="subtitle1" gutterBottom>This is pre-release software and does not represent
                            the final product. When taking part in Beta tests please provide feedback and bugs
                            encountered on our Discord.</Typography>
                        <div className="centerButton">
                            <Button variant="contained" onClick={() => {
                            }} color="secondary"
                                    startIcon={<EventSeat/>}>
                                Join As Host
                            </Button>
                        </div>
                        <div className="centerButton">
                            <Button variant="contained" onClick={() => {
                            }} color="secondary"
                                    startIcon={<EmojiEvents/>}>
                                Join As Player
                            </Button>
                        </div>
                    </div>
                </Paper>
                <Paper className="chat-container">
                    {!userProfile
                        ?
                        <Chat messages={messages}/>
                        :
                        <div className="chat-logged-out">Login to use the Hangout Chat</div>
                    }
                </Paper>
            </div>
        </div>
    )
}


export default Quiz