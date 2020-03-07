import React, {Fragment, useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import gql from 'graphql-tag'
import {isEmpty} from 'lodash';

import "../styles/allMemento.sass"

import {colourBetween, getTextContrastColor} from "../util/colours";

import {useDispatch, useSelector} from "react-redux";
import {addManyMemento} from "../redux/actions";

import _ from 'lodash';

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {CardHeader, Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";
import {getContrastText} from '@tgrx/getcontrasttext'

import {useLocation} from "react-router-dom"
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
    const byMonth = useSelector((state) => state.memento.byMonth);

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


    if (!byMonth) {
        return "Error displaying memento"
    }

    console.log(byMonth);

    const displayMemento = (memento) => {
        console.log(memento);
        return <Grid item xs={12} md={6} sm={12} lg={4} key={memento._id}>
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
                        <Typography variant={"body1"}>{memento.content}</Typography>
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
    }

    const loadMemento = () => {
        for (let month in byMonth) {
            if (byMonth.hasOwnProperty(month)) {
                if (byMonth[month].length > 0) {
                    return <Fragment>
                        <Typography variant={"h2"}>
                            {month}
                        </Typography>
                        <Grid container spacing={4}>

                            {
                                byMonth[month].map(memento => (
                                    displayMemento(memento)
                                ))
                            }
                        </Grid>
                    </Fragment>
                } else if(!_.isEmpty(byMonth[month])) {
                    return <Fragment>
                        <Typography variant={"h2"}>
                            {month}
                        </Typography>
                        {

                        }
                    </Fragment>
                }
            } else {
                return <Grid
                    item
                    xs={12}
                    align={"center"}
                >
                    <Typography variant={"h2"}>No Memento Found</Typography>
                </Grid>
            }
        }
    }


    return (
        <Container fixed className="allmemento-page" id={"container"}>
            <Grid container justify={"center"}>
                <ComposeMemento/>
            </Grid>
            <Grid container>
                {
                    loadMemento()
                }
            </Grid>


        </Container>
    )
}

export default AllMemento;


