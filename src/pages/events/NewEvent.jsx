import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../../store/Store";
import './newevents.scss'
import {Paper} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import {KeyboardDateTimePicker} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import NotAuthorised from "../notAuthorised/NotAuthorised";
import {publishEvent} from "../../services/eventsService";
import Notifications from "../../components/Notifications/Notifications";
import { useHistory } from 'react-router-dom'


function NewEvent(props) {
    const [userProfile] = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [event, setEvent] = useState('');
    const [eventError, setEventError] = useState(false);
    const [game, setGame] = useState('');
    const [gameError, setGameError] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [dateError, setDateError] = useState(false);
    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState(false);
    const [pageLoad] = useState(true);
    const notifications = new Notifications();
    const history= useHistory();

    const checkForm = () => {
        let foundError = false
        const dateNow = new Date();
        const diff = (startDate - dateNow);
        const hoursDiff = Math.floor((diff % 86400000) / 3600000);
        if (title === '') {
            setTitleError(true)
            foundError = true
        }

        if (event === '') {
            setEventError(true)
            foundError = true
        }

        if (event === 'GAME' && game === '') {
            setGameError(true)
            foundError = true
        }

        if (description === '') {
            setDescriptionError(true)
            foundError = true;
        }

        if (startDate < dateNow) {
            setDateError(true)
            foundError = true
        }

        if (endDate < dateNow) {
            setDateError(true)
            foundError = true
        }

        if (foundError) {
            return;
        }

        submitEvent()

    }

    const submitEvent = () => {
        const data = {
            title,
            event,
            game,
            startDate,
            endDate,
            description
        }
        publishEvent(data, userProfile).then((result) => {
            notifications.sendToast('success',5000, 'Success', `Event ${title} has been successfully posted`)
            resetForm()
            history.push('/events')
        }).catch((err) => {
            notifications.sendToast('error', 5000, 'Error', 'Yikes... There was an Error please try again')
        })

    }
    const resetForm = () => {
        setTitleError(false)
        setTitle('')
        setEventError(false)
        setEvent('')
        setGameError(false)
        setGame('')
        setDescriptionError(false)
        setDescription('')
        setDateError(false)
        setStartDate(new Date())
        setEndDate(new Date())
    }


    return (
        <div className="NewEvents">

            {
                userProfile && userProfile.staff ?
                    <Paper className="Paper">
                        <h1>Create New Event</h1>
                        <div>
                            <TextField className="Input Text"
                                       variant="filled"
                                       label="Event Title"
                                       error={titleError}
                                       value={title}
                                       onChange={(event) => {
                                           setTitle(event.target.value)
                                       }}
                            />
                        </div>
                        <div>
                            <FormControl className="Input Text" variant="filled">
                                <InputLabel>Event Type</InputLabel>
                                <Select
                                    label="Event Type"
                                    value={event}
                                    error={eventError}
                                    onChange={(event) => {
                                        setEvent(event.target.value)
                                    }}
                                >
                                    <MenuItem value={'GENERAL'}>General Event</MenuItem>
                                    <MenuItem value={'GAME'}>Game</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        {event === 'GAME' ?
                            <div>
                                <FormControl className="Input Text" variant="filled">
                                    <InputLabel>Game</InputLabel>
                                    <Select
                                        label="Game"
                                        value={game}
                                        error={gameError}
                                        onChange={(event) => {
                                            setGame(event.target.value)
                                        }}
                                    >
                                        <MenuItem value={'AMONGUS'}>Among Us</MenuItem>
                                        <MenuItem value={'DESTINY2'}>Destiny 2</MenuItem>
                                        <MenuItem value={'QUIZ'}>Quiz</MenuItem>
                                        <MenuItem value={'GOLF'}>Golf With Your Friends</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            : null
                        }
                        <div>
                            <TextField
                                className="Input Text"
                                id="outlined-multiline-static"
                                label="Event Description"
                                multiline
                                rows={10}
                                error={descriptionError}
                                value={description}
                                onChange={(event) => {
                                    setDescription(event.target.value)
                                }}
                                variant="filled"
                            />
                        </div>
                        <div>
                            <KeyboardDateTimePicker
                                variant="filled"
                                className="Input"
                                margin="normal"
                                error={dateError}
                                helperText={'Must be at least 3 hours in the future'}
                                id="date-picker-dialog"
                                format="dd/MM/yyyy HH:mm"
                                value={startDate}
                                ampm={false}
                                label="Event Start Date"
                                disablePast
                                onChange={(date) => {
                                    setStartDate(date)
                                }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </div>
                        <div>
                            <KeyboardDateTimePicker
                                variant="filled"
                                className="Input"
                                margin="normal"
                                error={dateError}
                                helperText={'Must be at least 4 hours in the future'}
                                id="date-picker-dialog"
                                format="dd/MM/yyyy HH:mm"
                                value={endDate}
                                ampm={false}
                                label="Event End Date"
                                disablePast
                                onChange={(date) => {
                                    setEndDate(date)
                                }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </div>
                        <div id="buttonContainer">
                            <Button variant="contained" onClick={checkForm} color="primary" startIcon={<SaveIcon/>}>
                                Save Event
                            </Button>
                        </div>
                    </Paper>
                    : <NotAuthorised/>
            }
        </div>
    )
}

export default NewEvent;