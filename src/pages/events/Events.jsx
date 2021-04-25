import React, {useContext, useEffect, useState} from 'react'
import {Paper, Typography} from '@material-ui/core';
import {Calendar, Views, momentLocalizer} from 'react-big-calendar';
import {useHistory} from 'react-router-dom'
import moment from 'moment';
import {UserContext} from "../../store/Store";
import './events.scss'
import './calendar.scss'
import Button from "@material-ui/core/Button";
import Add from "@material-ui/icons/Add";
import {getEvents} from "../../services/eventsService";
import logo from "../../assets/images/logo.svg";

const Events = (props) => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        document.title = "[RWG] Red Wine Gaming - Events"
        getEvents().then((result) => {
            setEvents(result.data)
        })
    }, [])

    const [userProfile] = useContext(UserContext);
    const localizer = momentLocalizer(moment);
    const history = useHistory();

    return (
        <div className="Events">
            <Paper className="Paper">
                <div className="HeadingBg"/>
                <h1>Upcoming Events</h1>
                <Typography className="Body2" variant="body2">Click an event for more info.</Typography>
                <div id="logoContainer">
                    <img src={logo} alt="Red Wine Gaming" id="logo"/>
                </div>
                <div id="buttonContainer">
                    {
                        userProfile && userProfile.staff
                            ?
                            <Button variant="contained" onClick={() => history.push('/newevent')} color="secondary"
                                    startIcon={<Add/>}>
                                Create New Event
                            </Button>
                            :
                            null
                    }
                </div>
                <Calendar
                    className="Calendar"
                    selectable
                    events={events}
                    views={{
                        month: true,
                    }}
                    localizer={localizer}
                    defaultView={Views.MONTH}
                    defaultDate={new Date()}
                    onSelectEvent={event => history.push(`events/${event.eventID}`)}
                />
            </Paper>
        </div>
    )
}

export default Events;