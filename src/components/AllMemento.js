import React, {Fragment, useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import gql from 'graphql-tag'
import {isEmpty} from 'lodash';

import "../styles/allMemento.sass"

import {colourBetween, getTextContrastColor} from "../util/colours";

import {useDispatch, useSelector} from "react-redux";
import {addManyMemento, sortMemento} from "../redux/actions";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {CardHeader, Container, Slide} from "@material-ui/core";
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
import {getContrastText} from '@tgrx/getcontrasttext'
import MementoComposer from "./EditMemento";

import {useLocation, Link} from "react-router-dom"
import ComposeMemento from "./ComposeMemento";

const makeCardStyles = makeStyles({
    root: {
        color: color => getContrastText({
            background: color,
            contrastThreshold: 0.5,
        })
    }
})

const MEMENTO_QUERY = gql`
    {
        allMemento {
            _id
            title
            content
            mood
            date
        }
    }
`


const AllMemento = () => {
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
            console.log(data.allMemento);
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
        <Container fixed className="allmemento-page" id={"container"}>
            <Grid container justify={"center"}>
                <ComposeMemento/>
            </Grid>

            <h1 className="page-title">All Memento</h1>
            <Grid container spacing={4}>
                {allMemento.length > 0
                    ? <Fragment>
                        {allMemento.map((memento) => (
                            <Grid item xs={12} md={6} sm={12} lg={4} key={memento._id}>
                                <Card
                                    style={{
                                        background: `${colourBetween(memento.mood)}`,
                                        color: getTextContrastColor(colourBetween(memento.mood))

                                    }}
                                >
                                    <CardHeader
                                        title={
                                            <Typography variant={"h6"}>
                                                {memento.title}
                                            </Typography>
                                        }
                                        action={
                                            <Fragment>
                                                <IconButton color={"inherit"} onClick={handleClick}>
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
                                            <Typography>{memento.content}</Typography>
                                        </div>
                                    </CardContent>
                                    <CardActions>

                                        <Button variant={"text"} color={"inherit"} href={`memento/${memento._id}`}
                                        >
                                            Edit
                                        </Button>
                                        <Button variant={"text"} color={"inherit"} href="#">
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

        </Container>
    )
}

export default AllMemento;


