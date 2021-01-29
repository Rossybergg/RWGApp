import React, {useContext, useState, useEffect} from "react";
import './menubar.scss';
import AccountCircle from '@material-ui/icons/AccountCircle'
import { UserContext } from "../../store/Store";
import { Link } from 'react-router-dom'
import { getUser } from "../../services/userService";
import Notifications from "../Notifications/Notifications";
import Avatar from "@material-ui/core/Avatar";

function MenuBar() {
    const notifications = new Notifications();
    const [userProfile, setUserProfile] = useContext(UserContext);
    const [pageLoad] = useState(true)

    useEffect( () => {
        if (!userProfile){
            getUser().then( ({ data }) => {
                setUserProfile(data);
                notifications.sendToast('success', 5000, 'Success', 'Logged In...');
            }).catch((error) => {
                console.log(error)
                notifications.sendToast('error', 7000, 'Error', 'Sorry Can\'t log you in at the moment')
            })
        }
    }, [pageLoad])


    const login = () => window.location.href = 'http://service.redwinegaming.com/api/auth/discord';

    return (
        <div id="menuBar">
            <header id="nav-wrapper">
                <nav id="nav">
                    <div className="nav left">
                            <span className="gradient skew"><h1 className="logo un-skew"><Link
                                to="/">[RWG]</Link></h1></span>
                        <button id="menu" className="btn-nav"><span
                            className="fas fa-bars"></span></button>
                    </div>
                    { userProfile ?
                        <div className="nav right">
                            <Link to="/" className="nav-link active"><span
                                className="nav-link-span"><span className="u-nav">Home</span></span></Link>
                            <Link to='/events' className="nav-link"><span
                                className="nav-link-span"><span
                                className="u-nav">Events</span></span></Link>
                            <Link to="/" className="nav-link"><span
                                className="nav-link-span"><span className="u-nav">Members</span></span></Link>
                            <Link to="/" className="nav-link profile"><span className="nav-link-span"><span
                                className="u-nav">{userProfile.userName} <Avatar id="accountCircle" variant="rounded" alt={userProfile.userName} src={`https://cdn.discordapp.com/avatars/${userProfile._id}/${userProfile.avatar}`}/> </span></span></Link>
                        </div>
                        :
                        <div className="nav right">
                            <a href="#"  onClick={login} className="nav-link"><span className="nav-link-span"><span
                                className="u-nav">Login  </span><AccountCircle id="defaultAccountCircle"
                                                                               fontSize="default"/></span></a>
                        </div>
                    }

                </nav>
            </header>
        </div>
    );
}

export default MenuBar;
