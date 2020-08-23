import React, {Component} from "react";
import './intro.scss';
import Button from "@material-ui/core/Button";
import { TextField, Typography } from '@material-ui/core';
import logo from '../../assets/images/logo.svg'

class Intro extends Component {

    constructor(props) {
        super(props);

        this.state = {passwordFailed: false};
    }

    componentDidMount() {
        if (localStorage.getItem('loggedIn') === 'true')
            this.props.history.push('/home')
    };

    checkPass = (event) => {
        if (document.getElementById('inputPassword').value === process.env.REACT_APP_ENTER) {
            localStorage.setItem('loggedIn', 'true');
            this.props.history.push('/home')
        } else {
            this.setState({passwordFailed: true})
        }
    }

    render() {
        const error = this.state.passwordFailed;
        return (
            <div id="intro">
                <header className="App-header">
                    <img src={logo} id="logo" alt="Red Wine Gaming"/>
                    <div id="text">
                    <Typography variant="h3">We aren't quite ready yet</Typography>
                    <Typography variant="h5">If you have a password you can enter below</Typography>
                    </div>
                    <div id="input">
                        <TextField error={error} id="inputPassword" label="Enter Password" type="password" size="small" />
                        <Button id="inputButton" color="secondary" variant="contained" onClick={this.checkPass}>
                            Enter Site
                        </Button>
                    </div>
                </header>
            </div>
        );
    }

}

export default Intro;
