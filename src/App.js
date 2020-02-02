import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';

import {isEmpty} from 'lodash'

import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    createMuiTheme,
    IconButton,
    ThemeProvider,
    Toolbar,
    Typography
} from "@material-ui/core";
import MLink from "@material-ui/core/Link"
import MenuIcon from '@material-ui/icons/Menu'

import AllMemento from './components/AllMemento'
import EditMemento from './components/EditMemento'
import NewMemento from './components/NewMemento'

import PersonIcon from '@material-ui/icons/Person';
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";

import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import {userLogin} from "./redux/actions";

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
        const dispatch = useDispatch();

        const user = useSelector((state) => state.user);

        const {loading} = useQuery(GET_USER, {
            onCompleted: (data) => {
                console.log("completed");
                dispatch(userLogin(data.getUser))
            },
            onError: (error) => {
                console.log("error");
                console.log(error);
            }
        });

        const whichUser = () => {

            if (loading) {
                return <CircularProgress/>
            }


            if (isEmpty(user)) {
                return <Button variant={"text"}
                               onClick={
                                   () => {
                                       window.location.assign(`http://test-sheku.com:3000/login/?redirect=${encodeURIComponent(window.location)}`)
                                   }
                               }
                               disableElevation
                >Login
                </Button>
            } else {
                return <IconButton>
                    <PersonIcon/>
                </IconButton>
            }
        };


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
                                whichUser()
                            }
                        </Toolbar>
                    </AppBar>
                    <Container fixed>
                        <Route exact path="/" component={AllMemento}/>
                        <Route path="/newmemento" component={NewMemento}/>
                        <Route path="/memento/:id" component={EditMemento}/>

                    </Container>
                </Router>
            </ThemeProvider>
        )
    }
;

export default App;