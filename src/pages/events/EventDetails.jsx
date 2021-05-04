import React, {useContext, useEffect, useState} from 'react';
import {getEvent, signUp} from "../../services/eventsService";
import {Paper, Typography} from "@material-ui/core";
import './EventDetails.scss'
import TextField from "@material-ui/core/TextField";
import moment from 'moment';
import {getAvatars} from "../../services/userService";
import Avatar from "@material-ui/core/Avatar";
import defaultImage from '../../assets/images/defaultUser.jpg'
import {UserContext} from "../../store/Store";
import Button from "@material-ui/core/Button";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Notifications from '../../components/Notifications/Notifications';
import MetaTags from 'react-meta-tags';
const notifications = new Notifications();

const EventDetails = (props) => {
    const [userProfile] = useContext(UserContext);
    const [event, setEvent] = useState(false)
    const [creator, setCreator] = useState(false)
    const [addedUsers, setAddedUsers] = useState([])
    const [signedUp, setSignedUp] = useState(false);
    useEffect(() => {
        getEvent(props.match.params.eventId).then((result) => {
            setEvent(result.data);
        })
    }, [signedUp])


    useEffect(() => {
        if (event.creator) {
            getAvatars([event.creator]).then((result) => {
                setCreator(result.data[0])
            })
        }
        if (event.users && event.users.length > 0) {
            getAvatars(event.users).then((result) => {
                setAddedUsers(result.data)
            })
        }
    }, [event])

    useEffect(() => {
    }, [addedUsers])

    const getImage = (url) => {
        return(
            <div>
                <img className="EventImage" alt={'game'} src={url}/>
                <div className="EventMask"/>
            </div>

        )

    }

    const userSignUp = () => {

        if(!userProfile || !userProfile._id){
            notifications.sendToast('error', 6000, 'Error', `You need to be logged in to sign up`)
            return;
        }

        signUp(userProfile, event.eventID)
            .then((result) => {
                if (result.data.status === 'SUCCESS') {
                    notifications.sendToast('success', 6000, 'Success', `You are now signed up for this event`)
                } else {
                    notifications.sendToast('info', 99999, 'Info', `You are already signed up to this event 😒`)
                }
                setSignedUp(true);
            })
            .catch((error) =>   notifications.sendToast('error', 6000, 'Error', error))
    }

    return (
        <div className="EventDetails">
            <MetaTags>
                <title>[RWG] Event: {event.subtitle}</title>
                <meta name="description" content={event.description} />
                <meta property="og:title" content={`[RWG] Event: ${event.subtitle}`} />
                <meta property="og:image" content={event.thumbnailUrl ? event.thumbnailUrl : defaultImage} />
            </MetaTags>
            <Paper className="Paper">
                {
                    event && event.game
                    ?  <div>
                            <div className="EventContainer">
                                <img className="EventImage" alt={''}
                                     src={event.thumbnailUrl ? event.thumbnailUrl : defaultImage}/>
                                <div className="EventMask"/>
                            </div>
                            <div className="EventContainer">
                                <Avatar className="EventAvatar" alt={''}
                                        src={event.thumbnailUrl ? event.thumbnailUrl : defaultImage}/>
                            </div>
                        </div>
                        :
                        null
                }
                <Typography variant="h4">{event.subtitle}</Typography>
                {
                    event
                        ?
                        <div>
                            <div>
                                <TextField
                                    className="Input Text"
                                    id="outlined-multiline-static"
                                    label="Event Description"
                                    multiline
                                    rows={10}
                                    value={event.description}
                                    variant="outlined"
                                    disabled
                                />
                            </div>
                            {
                                event.type === 'GAME'
                                    ?
                                    <div>
                                        <TextField className="Input Text"
                                                   variant="outlined"
                                                   label="Game"
                                                   value={event.game}
                                                   disabled
                                        />
                                    </div>
                                    :
                                    null
                            }
                            <div>
                                <TextField className="Input Text"
                                           variant="outlined"
                                           label="Start Date"
                                           value={moment(event.start).format('LLLL')}
                                           disabled
                                />
                            </div>
                            {
                                creator
                                    ?
                                    <div>
                                        <Typography className="CenterContainer Input"
                                                    variant="body1">{`Created By: ${creator.userName}`}</Typography>
                                        <div className="CenterContainer">
                                            <Avatar alt={creator.userName}
                                                    className="Creator"
                                                    onClick={() => {window.location.href = `https://app.redwinegaming.com/profile/${event.creator}`}}
                                                    src={`https://cdn.discordapp.com/avatars/${event.creator}/${creator.avatar}`}/>
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                            {
                                addedUsers.length > 0
                                    ?
                                    <div>
                                        <Typography className="CenterContainer Input"
                                                    variant="body1">{`${addedUsers.length} Members Taking Part:`}</Typography>
                                        <div className="Center">
                                            <div className="AvatarContainer">
                                                {addedUsers.map((user) => {
                                                        return (
                                                            <div className="Avatar">
                                                                <Avatar alt={user.userName}
                                                                        className="User"
                                                                        title={user.userName}
                                                                        src={user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar.toString()}` : defaultImage}
                                                                        onClick={() => {window.location.href = `https://app.redwinegaming.com/profile/${user.id}`}}
                                                                />
                                                            </div>
                                                        )
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    :
                                    null

                            }
                            {
                                 creator
                                    ?
                                    <div id="buttonContainer">
                                        <Button variant="contained" onClick={() => userSignUp()} color="secondary" startIcon={<PersonAdd/>}>
                                            Sign Up
                                        </Button>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                        :
                        null
                }
            </Paper>
        </div>
    )
}

export default EventDetails