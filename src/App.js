import React from 'react';
import {Route} from 'react-router-dom'
import './App.css';

import {isEmpty} from 'lodash'

import {
    AppBar,
    Button,
    CircularProgress,
    createMuiTheme,
    CssBaseline,
    IconButton,
    ThemeProvider,
    Toolbar,
    Typography
} from "@material-ui/core";
import MLink from "@material-ui/core/Link"

import AllMemento from './components/AllMemento'
import MementoComposer from './components/EditMemento'

import PersonIcon from '@material-ui/icons/Person';
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";

import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import {userLogin} from "./redux/actions";
import ModalContainer from "react-router-modal/lib/modal_container";
import ModalRoute from "react-router-modal/lib/modal_route";
import LandingPage from "./components/LandingPage";

// get the user profile from the backend
const GET_USER = gql`
    {
        getUser {
            first_name
            last_name
            email
            createdAt
            updatedAt
        }
    }
`


const theme = createMuiTheme({
    palette: {
        type: "dark",

        primary: {
            main: "#f9c12c"
        },
        secondary: {
            main: "#bcfe67"
        },

        tonalOffset: 0.3
    }
});

const useStyles = makeStyles({
    title: {
        flexGrow: 1,
    }
});

const App = () => {

        const classes = useStyles();
        const dispatch = useDispatch();

        const user = useSelector((state) => state.user);

        const {loading} = useQuery(GET_USER, {
            onCompleted: (data) => {
                dispatch(userLogin(data.getUser))
            },
            onError: (error) => {
            }
        });

        let hasUser = false;

        const whichUser = () => {

            if (loading) {
                return <CircularProgress/>
            }

            hasUser = !isEmpty(user);

            const redirectUri = `/?redirect=${encodeURIComponent(window.location)}`;


            if (hasUser) {
                return <IconButton>
                    <PersonIcon/>
                </IconButton>
            }
            else {
                return <Button variant={"text"}
                               onClick={() => {
                                   window
                                       .location
                                       .assign((process.env.REACT_APP_AUTH_LOGIN && process.env.REACT_APP_AUTH_LOGIN + redirectUri)
                                           || `http://test-sheku.com:3000/login${redirectUri}`
                                       )
                               }}
                               disableElevation
                >Login
                </Button>
            }
        };


        return (
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position={!hasUser ? "sticky" : "fixed"} elevation={hasUser ? 2 : 0}>
                    <Toolbar>
                        <Typography variant="h5" className={classes.title}>
                            <MLink href={"/"} color={"textPrimary"} underline={"none"}>Memento</MLink>
                        </Typography>
                        {
                            whichUser()
                        }
                    </Toolbar>
                </AppBar>
                    {
                        hasUser ? <Route exact path="/" component={AllMemento}/> :
                            <Route exact path="/" component={LandingPage}/>

                    }
                    {/*<Route path="/memento/:id" component={EditMemento}/>*/}

                    <ModalRoute path={"/memento"} component={MementoComposer} parentPath={"/"}/>
                    <ModalRoute path={"/memento/:id"} component={MementoComposer} parentPath={"/"}/>
                    <ModalContainer/>
            </ThemeProvider>
        )
    }
;

export default App;