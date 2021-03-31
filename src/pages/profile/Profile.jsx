import React, {useContext, useEffect, useState} from 'react'
import {Paper, Typography} from '@material-ui/core';
import './profile.scss'
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import {getUserData, changeCasinoStatus} from '../../services/userService';
import {lastSeen, formatVoiceTime, getKD} from './timeTransformer';
import {UserContext} from '../../store/Store';
import Notifications from '../../components/Notifications/Notifications';

const notifications = new Notifications();


function Profile(props) {
    const [casinoChecked, setCasinoChecked] = useState(false);
    const [casinoLabel, setCasinoLabel] = useState('Opted Out');
    const [casinoDialog, setCasinoDialog] = useState(false);
    const [profileData, setProfileData] = useState(false)
    const [userProfile] = useContext(UserContext);

    useEffect(() => {
        getUserData([props.match.params.userId]).then((result) => {
            setProfileData(result.data[0]);
            setCasinoChecked(result.data[0].casinoOptIn);
        })
    }, [])

    useEffect(() => {
        if (casinoChecked) {
            setCasinoLabel('Opted In')
        } else {
            setCasinoLabel('Opted Out')
        }
    }, [casinoChecked]);

    const toggleModal = () => {
        if (casinoDialog) {
            setCasinoDialog(false);
        } else {
            setCasinoDialog(true);
        }
    }

    const onCardDelete = () => {
        notifications.sendToast('info', 6000, 'Info', `Feature Coming Soon!, Contact an Admin to update your roles.`)
    }

    const getRoles = () => {
        if (profileData?.roles) {
            return (
                profileData.roles.map((role) => {
                    return (
                        <Chip
                            className="Chip"
                            label={role}
                            clickable
                            color="secondary"
                            onDelete={onCardDelete}
                            variant="outlined"
                        />
                    )
                })
            )
        } else {
            return 'No Roles'
        }
    }

    const getNotifications = () => {
        if (profileData?.notifications) {
            return (
                profileData.notifications.map((notification) => {
                    return (
                        <Chip
                            className="Chip"
                            label={notification}
                            clickable
                            onDelete={onCardDelete}
                            variant="outlined"
                        />
                    )
                })
            )
        } else {
            return 'No Notifications'
        }
    }

    const updateCasinoStatus = (status) => {
        if (userProfile._id === profileData._id) {
            changeCasinoStatus(profileData._id, status).then(() => {
                notifications.sendToast('success', 6000, 'Success', `Your Casino status has been updated.`)
            }).catch(() => {
                notifications.sendToast('error', 6000, 'Error', `Looks like we have hit a snag 😢. Contact an Admin for assistance.`)
            });
            setCasinoChecked(status)
        }
    }

    return (
        <div className="Profile">
            <Paper className="Paper">

                {
                    profileData ?
                        <div>
                            <div>
                                <img className="ProfileImage" alt={''}
                                     src={`https://cdn.discordapp.com/avatars/${profileData._id}/${profileData.avatar}`}/>
                            </div>
                            <div className="ProfileContainer">
                                <Avatar className="ProfileAvatar" alt={''}
                                        src={`https://cdn.discordapp.com/avatars/${profileData._id}/${profileData.avatar}`}/>
                            </div>
                            <div className="TitleContainer">
                                <Typography variant="h4">{profileData.userName}</Typography>
                            </div>
                            <div className="SubTitleContainer">
                                <Typography variant="subtitle1" gutterBottom>
                                    Level: {profileData.level} XP: {profileData.xp}
                                </Typography>
                            </div>
                            <div className="SubTitleContainer">
                                <Typography variant="subtitle1" gutterBottom>
                                    Last Seen: {lastSeen(profileData.voiceStartTime, profileData.voiceEndTime)}
                                </Typography>
                            </div>
                            <div className="SubContainer">
                                <Typography variant="h5">Casino Games</Typography>
                            </div>
                            <div className="CasinoContainer">
                                <FormControl component="fieldset">
                                    {
                                        userProfile ?
                                            <div>
                                                {userProfile._id === profileData._id ?
                                                    <div>
                                                        <FormGroup>
                                                            <FormControlLabel
                                                                control={<Switch checked={casinoChecked}
                                                                                 onChange={(event) => {
                                                                                     updateCasinoStatus(event.target.checked)
                                                                                 }}
                                                                                 name="gilad"/>}
                                                                label={casinoLabel}
                                                            />
                                                        </FormGroup>
                                                        <Link href="#" className="Link" onClick={toggleModal}>
                                                            What's Casino Opt In?
                                                        </Link>
                                                    </div>
                                                    :
                                                    <div>
                                                        <FormGroup>
                                                            <FormControlLabel
                                                                control={<Switch checked={casinoChecked}
                                                                                 name="gilad"/>}
                                                                label={casinoLabel}
                                                                disabled
                                                            />
                                                        </FormGroup>
                                                        <Link href="#" className="Link" onClick={toggleModal}>
                                                            What's Casino Opt In?
                                                        </Link>
                                                    </div>
                                                }
                                            </div>
                                            :
                                            <div>
                                                <FormGroup>
                                                    <FormControlLabel
                                                        control={<Switch checked={casinoChecked}
                                                                         name="gilad"/>}
                                                        label={casinoLabel}
                                                        disabled
                                                    />
                                                </FormGroup>
                                                <Link href="#" className="Link" onClick={toggleModal}>
                                                    What's Casino Opt In?
                                                </Link>
                                            </div>
                                    }
                                </FormControl>
                            </div>
                            <div className="SubContainer">
                                <Typography variant="h5">Roles</Typography>
                            </div>
                            <div className="ChipContainer">
                                {getRoles()}
                            </div>
                            <div className="SubContainer">
                                <Typography variant="h5">Notifications</Typography>
                            </div>
                            <div className="ChipContainer">
                                {getNotifications()}
                            </div>
                            <div className="SubContainer">
                                <Typography variant="h5">Stats</Typography>
                            </div>
                            <div className="StatsContainer">
                                <TextField className="Input Text Small"
                                           variant="outlined"
                                           label="Wallet"
                                           value={`💎 ${profileData.gems.toLocaleString()}`}
                                           disabled
                                />
                                <TextField className="Input Text Small"
                                           variant="outlined"
                                           label="Voice Chat Time"
                                           value={formatVoiceTime(profileData.voiceTime)}
                                           disabled
                                />
                                <TextField className="Input Text Small"
                                           variant="outlined"
                                           label="Messages Sent"
                                           value={profileData.messages.toLocaleString()}
                                           disabled
                                />
                                <TextField className="Input Text Small"
                                           variant="outlined"
                                           label="Duel K/D"
                                           value={getKD(profileData.duelWins, profileData.duelLosses)}
                                           disabled
                                />
                                <TextField className="Input Text Small"
                                           variant="outlined"
                                           label="Successful Steals"
                                           value={profileData.steals.toLocaleString()}
                                           disabled
                                />
                                <TextField className="Input Text Small"
                                           variant="outlined"
                                           label="Dog House Wins"
                                           value={profileData.doghouseWins.toLocaleString()}
                                           disabled
                                />

                            </div>
                        </div>
                        :
                        <div>No Profile</div>
                }


            </Paper>
            <Dialog
                open={casinoDialog}
                onClose={() => {
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Casino Opt In"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Opting in allows you to play games in the Casino Channel on the Discord. Being opted in
                        opens your 💎's to being stolen by other members.
                        You can change your Casino Discord Notification preferences by right clicking the channel name.
                        Members not opted in can still earn gems from Events, Voice chat and Messages but will not be
                        open to being stolen from or gambling.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleModal} color="primary" autoFocus>
                        CLOSE
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}


export default Profile