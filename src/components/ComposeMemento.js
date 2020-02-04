import React, {useState} from "react";
import {useMutation} from "@apollo/react-hooks";
import {withRouter} from 'react-router-dom'
import gql from 'graphql-tag'
import Slider from "./Slider";
import Card from "@material-ui/core/Card";
import {CardActions, CardContent, CardHeader, Collapse, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import "../styles/compose.sass"
import makeStyles from "@material-ui/core/styles/makeStyles";
import Slide from "@material-ui/core/Slide";
import CardActionArea from "@material-ui/core/CardActionArea";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import {useDispatch} from "react-redux";
import {addSingleMemento} from "../redux/actions";

const useStyles = makeStyles({
    underline: {
        "&&&:before": {
            borderBottom: "none"
        },
        "&&:after": {
            borderBottom: "none"
        }
    }
});

const NEW_MEMENTO = gql`
    mutation createNote($title: String! $mood: Float! $content: String!) {
        createMemento(input: {title: $title, mood: $mood, content: $content }) {
            _id
            title
            mood
            content
            date
        }
    }
`;

const MEMENTO_QUERY = gql`
    {
        allMemento {
            _id
            title
            content
            mood
        }
    }
`;

const ComposeMemento = () => {
    const classes = useStyles();
    const [compose, setCompose] = useState(false);
    const initState = {
        title: "",
        content: "",
        mood: 0.5
    };

    const [memento, setMemento] = useState(initState);
    const dispatch = useDispatch();

    const setTitle = (title) => {
        setMemento(prev => ({
            ...prev,
            title
        }));
    };
    const setContent = (content) => {
        setMemento(prev => ({
            ...prev,
            content
        }));
    };

    const setMood = (mood) => {
        setMemento(prev => ({
            ...prev,
            mood
        }));
    };

    const [createMemento] = useMutation(NEW_MEMENTO, {
        onCompleted(data) {
            dispatch(addSingleMemento(data.createMemento))
        },
        update(cache, {data: {createMemento}}) {
            const {allMemento} = cache.readQuery(({query: MEMENTO_QUERY}));
            cache.writeQuery({
                query: MEMENTO_QUERY,
                data: {allMemento: allMemento.concat([createMemento])}
            })
        }
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                createMemento({
                    variables: {
                        ...memento,
                        date: Date.now()
                    }
                })
            }}
        >
            <Card id={"composer"}>
                <CardActionArea onClick={() => setCompose(true)}>
                    <CardHeader
                        title={<TextField
                            variant={"filled"}
                            value={memento.title}
                            placeholder={"Write a new memento"}
                            onClick={() => setCompose(true)}
                            onChange={(e) => setTitle(e.target.value)}
                            InputProps={{classes}}
                        />}/>
                </CardActionArea>

                <Collapse
                    in={compose}
                    unmountOnExit
                >
                    <CardContent>
                        <Slider value={memento.mood} onValueChange={setMood}/>
                        <TextField
                            variant={"filled"}
                            placeholder={"Why are you  feeling this way?"}
                            multiline
                            value={memento.content}
                            onChange={(e) => setContent(e.target.value)}
                            InputProps={{classes}}
                        />
                    </CardContent>
                    <Grid container justify={"flex-end"}>
                        <CardActions>
                            <Button
                                endIcon={<Icon>cancel</Icon>}
                                color={"secondary"}
                                variant={"contained"}
                                onClick={() => setCompose(false)}>
                                Cancel
                            </Button>
                            <Button type={"submit"} endIcon={<Icon>send</Icon>} color={"primary"} variant={"contained"}>
                                Submit
                            </Button>
                        </CardActions>
                    </Grid>
                </Collapse>
            </Card>
        </form>


    )
};

export default ComposeMemento;