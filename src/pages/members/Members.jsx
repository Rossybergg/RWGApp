import React, { useState, useEffect } from 'react';
import { Paper, Typography } from "@material-ui/core";
import { getAllUserData } from '../../services/userService';
import { lastSeen } from "../profile/timeTransformer";
import './members.scss'
import Button from "@material-ui/core/Button";
import defaultUserPic from '../../assets/images/defaultUser.jpg'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";



const Members = () => {

    const [userData, setUserData] = useState([]);
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [filter, setFilter] = useState('gems');

    useEffect(() => {
        getAllUserData().then( (result) => {
            setUserData(result.data.sort((a, b) => a.userName.toLowerCase().localeCompare(b.userName.toLowerCase())));
            setRows([...result.data])
        })
    }, [])

    useEffect(() => {
        if (rows) {
            setFilteredRows(filterData(filter, rows))
        }
    }, [filter, rows])

    const filterData = ( filter, data ) => {
        switch( filter ) {
            case 'gems':
                return data.sort((a, b) => b.gems - a.gems).slice(0, 5);
            case 'voice':
                return data.sort((a, b) => b.voiceTime - a.voiceTime).slice(0, 5);
            case 'messages':
                return data.sort((a, b) => b.messages - a.messages).slice(0, 5);
            case 'steals':
                return data.sort((a, b) => b.steals - a.steals).slice(0, 5);
            default:
                break;
        }
    }


    const getUserCards = () => {
        if (userData[0]) {
            return (
                userData.map((user) => {
                    let userPic = '';

                    if(user.avatar) {
                        userPic = `https://cdn.discordapp.com/avatars/${user._id}/${user.avatar}`
                    } else {
                        userPic = defaultUserPic
                    }

                    return (
                        <Paper className={`UserCard ${user.voiceStartTime > user.voiceEndTime ? 'online' : null}`} elevation={3}>
                            <img className="ProfileImage" alt={''}
                                 src={userPic}/>
                            <Typography className="CardTitle" variant="body2">{user.userName}</Typography>
                            {
                                user.staff ?
                                    <Typography className="CardContent" variant="body2">Admin</Typography>
                                    :
                                    <Typography className="CardContent" variant="body2">Member</Typography>
                            }
                            <Typography className="CardContent" variant="body2">{`Last Seen: ${lastSeen(user.voiceStartTime, user.voiceEndTime)}`}</Typography>
                            <div className="CardButtonContainer">
                                <Button variant="outlined" onClick={() => window.location.href =`https://app.redwinegaming.com/profile/${user._id}`} color="secondary"
                                        startIcon={<PersonOutlineIcon/>}>
                                    View Profile
                                </Button>
                            </div>
                        </Paper>
                    )
                })
            )
        } else {
            return 'No data'
        }
    }

    return (
        <div className="Members">
            <Paper className="Paper">
                <div className="TitleContainer">
                    <div className="HeadingBg"/>
                    <h1>Members</h1>
                </div>
                <div className="SortContainer">
                    <div className="SortByTitle">
                        <h3>Top 5 Leaderboard</h3>
                    </div>
                    <FormControl className="Input Text" variant="filled">
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            label="Sort By"
                            value={filter}
                            onChange={(event) => {
                                setFilter(event.target.value)
                            }}
                        >
                            <MenuItem value={'gems'}>Gems</MenuItem>
                            <MenuItem value={'voice'}>Voice Time</MenuItem>
                            <MenuItem value={'messages'}>Messages</MenuItem>
                            <MenuItem value={'steals'}>Steals</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <TableContainer component={Paper}>
                    <Table className="Table" size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Member</TableCell>
                                <TableCell align="right">Gems 💎</TableCell>
                                <TableCell align="right">Voice Time</TableCell>
                                <TableCell align="right">Messages</TableCell>
                                <TableCell align="right">Steals</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {
                                            <div >
                                                <Avatar className="ProfileAvatar TableUser" alt={''}
                                                        src={`https://cdn.discordapp.com/avatars/${row._id}/${row.avatar}`}/>
                                                <div className="TableUserName">{row.userName}</div>
                                            </div>
                                        }
                                    </TableCell>
                                    <TableCell align="right">{row.gems.toLocaleString()}</TableCell>
                                    <TableCell align="right">{row.voiceTime.toLocaleString()}</TableCell>
                                    <TableCell align="right">{row.messages.toLocaleString()}</TableCell>
                                    <TableCell align="right">{row.steals.toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="MembersContainer">
                    {getUserCards()}
                </div>
            </Paper>
        </div>
    )
}

export default Members