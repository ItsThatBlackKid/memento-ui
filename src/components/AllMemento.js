import React, {Fragment, useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import gql from 'graphql-tag'
import {isEmpty} from 'lodash';

import "../styles/allMemento.sass"

import {colourBetween} from "../util/colours";

import {useDispatch, useSelector} from "react-redux";
import {addManyMemento} from "../redux/actions";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {CardHeader, Slide} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import {makeStyles} from "@material-ui/core/styles";
import MementoComposer from "./EditMemento";

import {useLocation, Link} from "react-router-dom"
import ComposeMemento from "./ComposeMemento";

const MEMENTO_QUERY = gql`
    {
        allMemento {
            _id
            title
            content
            mood
        }
    }
`

const useStyle = makeStyles(theme => ({
    fab: {
        position: "absolute",
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    },
    fabSlide: {
        marginBottom: theme.spacing(2)
    }
}))

const AllMemento = () => {
    const classes = useStyle();
    const [anchorEl, setAnchorEl] = useState(null);
    const [show, setShow] = useState(false);
    const [showMemento, setShowMemento] = useState(false);

    const handleClick = e => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch();
    const location = useLocation();


    const allMemento = useSelector((state) => state.memento.allMemento);

    const {loading, error} = useQuery(MEMENTO_QUERY, {
        onCompleted: (data) => {
            dispatch(addManyMemento(data.allMemento));
        },
        skip: !isEmpty(allMemento)
    });

    const mouseClick = (e) => {
        setShow(!show);
    };


    if (loading) return "Loading...";
    if (error) {
        console.log(error);
        return `"Error!! ${error.message}`
    }
    ;


    if (!allMemento) {
        return "Error displaying memento"
    }


    return (
        <div className="allmemento-page">
            <Grid container justify={"center"}>
                <ComposeMemento/>
            </Grid>

            <h1 className="page-title">All Memento</h1>
            <Grid container spacing={4}>
                {allMemento.length > 0
                    ? <Fragment>
                        {allMemento.map((memento) => (

                            <Grid item xs={12} md={6} sm={12} lg={4} key={memento._id}>
                                <Card style={{background: `${colourBetween(memento.mood)}`}}>
                                    <CardHeader
                                        title={
                                            <Typography variant={"h6"} color={"textPrimary"}>
                                                {memento.title}
                                            </Typography>
                                        }
                                        action={
                                            <Fragment>
                                                <IconButton onClick={handleClick}>
                                                    <MoreVertIcon/>
                                                </IconButton>
                                                <Menu
                                                    id="card-menu"
                                                    anchorEl={anchorEl}
                                                    open={Boolean(anchorEl)}
                                                    onClose={handleClose}
                                                >
                                                    <MenuItem href="#" component="a">Delete</MenuItem>
                                                </Menu>
                                            </Fragment>
                                        }
                                    >

                                    </CardHeader>
                                    <CardContent className="card-content">
                                        <div className="content">
                                            <p>{memento.content}</p>
                                        </div>
                                    </CardContent>
                                    <CardActions>

                                        <Button variant={"text"} href={`memento/${memento._id}`}
                                        >
                                            Edit
                                        </Button>
                                        <Button variant={"text"} href="#">
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Fragment>
                    :
                    <Grid
                        item
                        xs={12}
                        align={"center"}
                    >
                        <Typography variant={"h2"}>No Memento Found</Typography>
                    </Grid>
                }
            </Grid>
            <Grid className={classes.fab}>
                <Grid>
                    <Slide direction={"down"} in={show} mountOnEnter unmountOnExit>
                            <Link to={{
                                pathname: "/memento",
                                state: {background: location}
                            }}>
                                <Fab
                                    className={classes.fabSlide}
                                    size={"medium"}
                                    color={"secondary"}
                                >
                                    <Icon>post_add</Icon>
                                </Fab>
                            </Link>
                    </Slide>
                </Grid>
                <Grid>
                    <Fab size={"large"} onClick={mouseClick} color="primary">
                        <Icon>{show ? "close" : "add"}</Icon>
                    </Fab>
                </Grid>
            </Grid>

        </div>
    )
}

export default AllMemento;


