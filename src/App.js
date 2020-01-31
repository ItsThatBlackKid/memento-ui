import React, {Component, useEffect} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import {Navbar, NavItem, Icon} from 'react-materialize'

import {isEmpty} from 'lodash'

import {
    AppBar, Toolbar, IconButton,
    ThemeProvider, createMuiTheme, Container,
    Typography, Button
} from "@material-ui/core";
import MLink from "@material-ui/core/Link"
import MenuIcon from '@material-ui/icons/Menu'

import AllMemento from './components/AllMemento'
import EditMemento from './components/EditMemento'
import NewMemento from './components/NewMemento'

import PersonIcon from '@material-ui/icons/Person';
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#ffeb3b"
        },
        secondary: {
            main: "#7091a3"
        }
    }
});

const useStyles = makeStyles({
    title: {
        flexGrow: 1,
    }
});

const App = () => {
    const classes = useStyles();

    let user = useSelector( (state) => state.user);


    return (
        <ThemeProvider theme={theme}>
            <Router>
                <AppBar position={"sticky"}>
                    <Toolbar>
                        <IconButton edge={"start"}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h5" className={classes.title}>
                            <MLink href={"/"} color={"textPrimary"} underline={"none"}>Memento</MLink>
                        </Typography>
                        {
                            isEmpty(user) ?
                                <Button variant={"text"}
                                        onClick={
                                            () => {
                                                window.location.assign(`http://test-sheku.com:3000/login/?redirect=${encodeURIComponent(window.location)}`)
                                            }
                                        }
                                        disableElevation
                                >Login
                                </Button> :
                                <IconButton>
                                    <PersonIcon/>
                                </IconButton>

                            }
                            </Toolbar>
                            </AppBar>
                            <Container  fixed>

                            {/*<nav className="navbar App-header" role="navigation" aria-label="main navigation">
                            <div className="navbar-brand">
                            <Link to="/" className="navbar-item">Memento</Link>
                            </div>

                            <div className="navbar-end">
                            <Link to="/" className="navbar-item">Your Memento</Link>
                            <Link to="/newmemento" className="navbar-item">
                            New Memento
                            </Link>
                            <a className={"navbar-item"}
                            href={`http://test-sheku.com:3000/login/?redirect=${encodeURIComponent(window.location)}`}>Login</a>
                            </div>

                            </nav>*/}
                            <Route exact path="/" component={AllMemento}/>
                            <Route path="/newmemento" component={NewMemento}/>
                            <Route path="/memento/:id" component={EditMemento}/>

                            </Container>
                            </Router>
                            </ThemeProvider>
                            )
                            };

                            export default App;