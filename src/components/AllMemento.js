import React, {Fragment, useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import gql from 'graphql-tag'
import {isEmpty} from 'lodash';

import {colourBetween} from "../util/colours";

import {useDispatch, useSelector} from "react-redux";
import {addManyMemento} from "../redux/actions";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {CardHeader} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

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

const AllMemento = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = e => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch();

    const allMemento = useSelector((state) => state.memento.allMemento);

    const {loading, error} = useQuery(MEMENTO_QUERY, {
        onCompleted: (data) => {
            dispatch(addManyMemento(data.allMemento));
        },
        skip: !isEmpty(allMemento)
    });


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
        <div className="container m-t-20">
            <h1 className="page-title">All Memento</h1>

            <div className="allmemento-page">
                <Grid container spacing={4}>
                    {allMemento.length > 0
                        ? allMemento.map((memento) => (

                            <Grid item xs={4} key={memento._id}>
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
                        ))
                        : "No Memento yet"}
                </Grid>
            </div>
        </div>
    )
}

export default AllMemento;


