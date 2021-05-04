import React, {useContext, useState} from 'react';
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
import VisibilityIcon from '@material-ui/icons/Visibility'
import NotAuthorised from "../notAuthorised/NotAuthorised";
import {publishEvent} from "../../services/eventsService";
import Notifications from "../../components/Notifications/Notifications";
import { useHistory } from 'react-router-dom'
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Avatar from "@material-ui/core/Avatar";
import logo from "../../assets/images/logo.svg";


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
    const [thumbnailType, setThumbnailType] = useState('');
    const [thumbnailTypeError, setThumbnailTypeError] = useState(false);
    const [thumbnailUrl, setThumbnailTUrl] = useState('');
    const [thumbnailUrlError, setThumbnailTUrlError] = useState(false);
    const [thumbnailUrlErrorMsg, setThumbnailTUrlErrorMsg] = useState('');
    const [descriptionError, setDescriptionError] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const notifications = new Notifications();
    const history= useHistory();
    const URLREGEX = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/);

    const toggleModal = () => {
        if (openModal) {
            setOpenModal(false);
        } else {
            setOpenModal(true);
        }
    }

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

        if (event === 'GAME' && thumbnailType === '') {
            setThumbnailTypeError(true);
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

        if(thumbnailType === 'CUSTOM' && !checkURL(thumbnailUrl)){
            setThumbnailTUrlError(true);
            setThumbnailTUrlErrorMsg('Not A Valid URL')
            return;
        }

        if(thumbnailType === 'DEFAULT' && thumbnailUrl.length > 0){
            setThumbnailTUrl('')
        }

        if(thumbnailUrl !== '' && thumbnailUrl.slice(0,4) !== 'http'){
            setThumbnailTUrlError(true);
            setThumbnailTUrlErrorMsg('URL must start with \'http\' / \'https\' ')
            return;
        }

        if(thumbnailUrl.length > 2048) {
            setThumbnailTUrlError(true);
            setThumbnailTUrlErrorMsg('Thumbnail URL too long, Max 2048 characters')
            return;
        }

        if (foundError) {
            return;
        }

        submitEvent()
    }

    const checkURL = (url) => {
        return URLREGEX.test(url);
    }

    const checkThumbnail = () => {

        if(checkURL(thumbnailUrl)){
            console.log(thumbnailUrl.length)
            toggleModal()
            setThumbnailTUrlErrorMsg('');
            setThumbnailTUrlError(false);
        } else {
            setThumbnailTUrlError(true);
            setThumbnailTUrlErrorMsg('Not A Valid URL');
        }
    }

    const submitEvent = () => {
        const data = {
            title,
            event,
            game,
            thumbnailType,
            thumbnailUrl,
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
        setThumbnailTUrlError(false)
        setThumbnailTUrlErrorMsg('')
        setThumbnailTUrl('')
    }


    return (
        <div className="NewEvents">

            {
                userProfile && userProfile.staff ?
                    <Paper className="Paper">
                        <div className="HeadingBg"/>
                        <h1 id="TitleText">Create New Event</h1>
                        <div id="logoContainer">
                            <img src={logo} alt="Red Wine Gaming" id="logo"/>
                        </div>
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
                                <TextField className="Input Text"
                                           variant="filled"
                                           label="Game Title"
                                           error={gameError}
                                           value={game}
                                           onChange={(event) => {
                                               setGame(event.target.value)
                                           }}
                                />
                                <FormControl className="Input Text" variant="filled">
                                    <InputLabel>Event Thumbnail</InputLabel>
                                    <Select
                                        label="Event Type"
                                        value={thumbnailType}
                                        error={thumbnailTypeError}
                                        onChange={(event) => {
                                            setThumbnailType(event.target.value)
                                        }}
                                    >
                                        <MenuItem value={'DEFAULT'}>Default</MenuItem>
                                        <MenuItem value={'CUSTOM'}>Custom</MenuItem>
                                    </Select>
                                </FormControl>
                                {thumbnailType === 'CUSTOM' ?
                                    <div>
                                    <TextField className="Input Text"
                                               variant="filled"
                                               label="Custom Thumbnail URL"
                                               error={thumbnailUrlError}
                                               helperText={thumbnailUrlErrorMsg}
                                               value={thumbnailUrl}
                                               onChange={(event) => {
                                                   setThumbnailTUrl(event.target.value)
                                               }}
                                    />
                                        <div id="buttonContainer">
                                            <Button variant="contained" onClick={checkThumbnail} color="secondary" startIcon={<VisibilityIcon/>}>
                                                Preview Thumbnail
                                            </Button>
                                        </div>
                                    </div>
                                    : null
                                }
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
                            <Button variant="contained" onClick={checkForm} color="secondary" startIcon={<SaveIcon/>}>
                                Save Event
                            </Button>
                        </div>
                    </Paper>
                    : <NotAuthorised/>
            }
            <Dialog
                open={openModal}
                onClose={() => {
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <Avatar className="ThumbnailImage" alt={''}
                            src={thumbnailUrl}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleModal} color="secondary" autoFocus>
                        CLOSE
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default NewEvent;