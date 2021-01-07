import React, {useContext, useState} from 'react';
import {UserContext} from "../../store/Store";
import './events.scss'
import {Paper} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import {KeyboardDatePicker, KeyboardTimePicker} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import {Redirect} from "react-router";


function Events(props) {
    const [userProfile] = useContext(UserContext)
    const [title, setTitle] = useState('')
    const [event, setEvent] = useState('');
    const [game, setGame] = useState('');
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(new Date())
    const [thumbnail, setThumbnail] = useState('')
    const [thumbnailUrl, setThumbnailURL] = useState('')
    const [description, setDescription] = useState('')
    return (
        <div className="Events">

            {
                userProfile && userProfile.staff ?
                    <Paper className="Paper">
                        <h1>Create New Event</h1>
                        <div>
                            <TextField className="Input Text"
                                       variant="filled"
                                       label="Event Title"
                                       onChange={(event) => {setTitle(event.target.value)}}
                            />
                        </div>
                        <div>
                            <FormControl className="Input Text" variant="filled">
                                <InputLabel>Event Type</InputLabel>
                                <Select
                                    label="Event Type"
                                    value={event}
                                    onChange={(event) => {
                                        setEvent(event.target.value)
                                    }}
                                >
                                    <MenuItem value={'GENERAL'}>General Event</MenuItem>
                                    <MenuItem value={'GAME'}>Game</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        { event === 'GAME' ?
                            <div>
                                <FormControl className="Input Text" variant="filled">
                                    <InputLabel>Game</InputLabel>
                                    <Select
                                        label="Game"
                                        value={game}
                                        onChange={(event) => {
                                            setGame(event.target.value)
                                        }}
                                    >
                                        <MenuItem value={'DESTINY2'}>Destiny 2</MenuItem>
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
                                rows={4}
                                value={description}
                                onChange={(event) => {setDescription(event.target.value)}}
                                variant="filled"
                            />
                        </div>
                        <div>
                            <FormControl className="Input Text" variant="filled">
                                <InputLabel>Thumbnail Image</InputLabel>
                                <Select
                                    label="Thumbnail Image"
                                    value={thumbnail}
                                    onChange={(event) => {
                                        setThumbnail(event.target.value)
                                    }}
                                >
                                    <MenuItem value={'DEFAULT'}>Default</MenuItem>
                                    <MenuItem value={'CUSTOM'}>Custom</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        { thumbnail === 'CUSTOM' ?
                            <div>
                                <TextField className="Input"
                                           variant="filled"
                                           label="Custom Thumbnail URL"
                                           onChange={(event) => {setThumbnailURL(event.target.value)}}
                                />
                            </div>
                            : null
                        }
                        <div>
                            <KeyboardDatePicker
                                variant="filled"
                                className="Input"
                                margin="normal"
                                id="date-picker-dialog"
                                format="dd/MM/yyyy"
                                value={date}
                                label="Event Date"
                                onChange={(date) => {
                                    setDate(date)
                                }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </div>
                        <div>
                            <KeyboardTimePicker
                                className="Input"
                                margin="normal"
                                id="time-picker"
                                label="Event Start Time"
                                value={time}
                                onChange={(date) => {
                                    setTime(date)
                                }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </div>
                        <div id="buttonContainer">
                            <Button variant="contained" color="primary"  startIcon={<SaveIcon />}>
                                Save Event
                            </Button>
                        </div>
                    </Paper>
                :
                    <Redirect to="/401"/>
            }

        </div>
    )
}

export default Events;