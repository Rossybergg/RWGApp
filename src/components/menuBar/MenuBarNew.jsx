import React, {useEffect, useState, useContext} from 'react';
import miniLogo from '../../assets/images/r.png'
import './MenuBarNew.scss'
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from 'react-router-dom'
import { UserContext } from '../../store/Store';
import Avatar from "@material-ui/core/Avatar";
import {getUser} from "../../services/userService";

function MenubarNew() {

    const [userProfile, setUserProfile] = useContext(UserContext);
    const [pageLoad] = useState(true)
    let navbar;
    let navbarToggle;
    let navbarMenu;
    let navbarLinksContainer;

    useEffect( () => {
        if (!userProfile){
            console.log(userProfile)
            getUser().then( ({ data }) => {
                setUserProfile(data);
                console.log(data);
            }).catch((error) => {
                console.log(error)
            })
        }
    }, [pageLoad])

    useEffect(() => {
        navbar = document.getElementById("navbar");
        navbarToggle = navbar.querySelector(".navbar-toggle");
        navbarMenu = navbar.querySelector(".navbar-menu");
        navbarLinksContainer = navbar.querySelector(".navbar-links");

        navbarToggle.addEventListener("click", () => {
            if (navbar.classList.contains("opened")) {
                closeMobileNavbar();
            } else {
                openMobileNavbar();
            }
        });

        navbarLinksContainer.addEventListener("click", (clickEvent) => {
            clickEvent.stopPropagation();
        });

        navbarMenu.addEventListener("click", closeMobileNavbar);
    }, [pageLoad])

    const openMobileNavbar = () => {
        navbar.classList.add("opened");
        navbarToggle.setAttribute("aria-label", "Close navigation menu.");
    }

    const closeMobileNavbar = () => {
        navbar.classList.remove("opened");
        navbarToggle.setAttribute("aria-label", "Open navigation menu.");
    }

    const login = () => window.location.href = 'https://service.redwinegaming.com/api/auth/discord';


    return(
        <div className="MenuBar">
            <header id="navbar">
                <nav className="navbar-container container">
                    <a href="/" className="home-link">
                        <img src={miniLogo} id="logo" alt="logo"/>
                    </a>
                    <button type="button" className="navbar-toggle" aria-label="Open navigation menu">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <div className="navbar-menu">
                        <ul className="navbar-links">
                            <li className="navbar-item"><Link className="navbar-link" to="/">Home</Link></li>
                            <li className="navbar-item"><Link className="navbar-link" to="/events">Events</Link></li>
                            <li className="navbar-item"><Link className="navbar-link" to="/members">Members</Link></li>
                            {
                                !userProfile ?
                                    <li className="navbar-item"><a className="navbar-link" href="http://service.redwinegaming.com/api/auth/discord" >Login<AccountCircle id="defaultAccountCircle" fontSize="default"/></a></li>
                                    :
                                    <li className="navbar-item"><Link className="navbar-link" onClick={login}>{userProfile.userName}<Avatar id="accountCircle" alt={userProfile.userName} src={`https://cdn.discordapp.com/avatars/${userProfile._id}/${userProfile.avatar}`}/></Link></li>
                            }
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default MenubarNew