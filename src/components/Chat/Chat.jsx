import React from 'react';
import './chat.scss'
import Avatar from '@material-ui/core/Avatar';
import defaultImage from '../../assets/images/defaultUser.jpg';
import hangoutChatHeaderImage from '../../assets/images/hangout.jpg'
import SendIcon from '@material-ui/icons/Send';
import Button from "@material-ui/core/Button";


const Chat = (props) => {

    const me = '500376050103222273';

    const formatMessages = (message) => {

        if (message.userId !== me) {
            return(
                <div className="individual-message-container">
                    <div className="name-and-date-container">
                        <section className="inline-left">
                            <Avatar alt={message.userName}
                                    className="display-pic"
                                    title={message.userName}
                                    src={message.avatar ? `https://cdn.discordapp.com/avatars/${message.userId}/${message.avatar.toString()}` : defaultImage}
                            />
                        </section>
                        <section className="inline-left name-left">
                            {message.userName}
                        </section>
                        <section className="inline-left date-left">
                            {message.timeStamp}
                        </section>
                    </div>
                    <br className="clear-both"/>
                    <div className="comment-bubble-left">
                        <p>{message.message}</p>
                    </div>
                </div>
            )
        } else {
            return(
                <div className="individual-message-container">
                    <div className="name-and-date-container">
                        <section className="inline-right">
                            <Avatar alt={message.userName}
                                    className="display-pic"
                                    title={message.userName}
                                    src={message.avatar ? `https://cdn.discordapp.com/avatars/${message.userId}/${message.avatar.toString()}` : defaultImage}
                            />
                        </section>
                        <section className="inline-right name-right">
                            {message.userName}
                        </section>
                        <section className="inline-right date-right">
                            {message.timeStamp}
                        </section>
                    </div>
                    <br className="clear-both"/>
                    <div className="comment-bubble-right">
                        <p>{message.message}</p>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="chat">
            <div className="header">
                <img src={hangoutChatHeaderImage} alt="Hangout Chat" className="header-image"/>
            </div>
            <div className="messages">
                {props.messages.map((message) => formatMessages(message))}
            </div>
            <div className="compose">
                <div className="send-box">
                  Send Message....
                </div>
                <Button className="send-button"
                        variant="contained"
                        color="secondary"
                        startIcon={<SendIcon/>}>
                    Send
                </Button>
            </div>
        </div>
    )
}

export default Chat