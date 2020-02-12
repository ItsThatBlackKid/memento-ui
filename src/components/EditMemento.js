import React, {Fragment, useState} from "react";
import {useMutation, useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag"
import Slider from "./Slider";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {DialogActions, DialogContent, DialogTitle, Icon, TextField} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";

import {PropTypes} from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

const EDIT_MEMENTO = gql`
    mutation editMemento($_id: ID!, $title: String!,  $content: String!, $mood: Float!) {
        editMemento(_id: $_id, input: {title: $title, content: $content, mood: $mood}) {
            _id
            title
            mood
            content
        }
    }
`;

const MEMENTO_QUERY = gql`
    query getMemento($_id: ID!) {
        getMemento(_id: $_id) {
            _id
            title
            mood
            content
            date
        }
    }
`;

const EditMemento = ({match, location, byId}) => {
    const [open, setOpen] = useState(true);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mood, setMood] = useState(0.5);


    const moodChange = (mood) => {
        setMood(mood);
    };



    const {loading, error, data} = useQuery(MEMENTO_QUERY, {
        variables: {
            _id: match.params.id
        },
    });

    const [editMemento] = useMutation(EDIT_MEMENTO);

    const history = useHistory();

    if (loading) return (
        <Dialog open={true} onClose={(e) => {
            e.stopPropagation();
            window.location.assign("/")
        }}>
            <DialogContent>
                <CircularProgress/>
            </DialogContent>
        </Dialog>
    );
    if (error) return (
        <Dialog open={true} onClose={(e) => {
            e.stopPropagation();
            window.location.assign("/")
        }}>
            <DialogContent>
                <Typography>
                    Unable to retrieve memento
                </Typography>
            </DialogContent>
        </Dialog>
    );


    const memento = data && data.getMemento


    return (
        <Dialog open={true} onClose={(e) => {
            e.stopPropagation();
            window.location.assign("/")
        }}>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    console.log(match.params.id);
                    console.log(memento.title);
                    console.log(title);

                    editMemento({
                        variables: {
                            _id: memento._id,
                            title: title ? title : memento.title,
                            content: content ? content : memento.content,
                            mood: mood ? mood : memento.mood,
                        },
                    }).catch(err => {
                        console.log(err);
                    });
                }}
            >
                <Fragment>
                    <DialogTitle>
                        <TextField
                            label={"Memento Title"}
                            variant={"outlined"}
                            name={"title"}
                            style={{width: "100%"}}
                            defaultValue={memento.title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </DialogTitle>
                    <DialogContent>
                        <div className="control">
                            <Slider
                                name={"mood"}
                                value={memento.mood}
                                onValueChange={moodChange}
                            />
                        </div>
                        <TextField variant={"filled"}
                                   name={"content"}
                                   defaultValue={memento.content}
                                   onChange={(e) => setContent(e.target.value)}
                                   label={"Memento content"}/>
                    </DialogContent>

                    <DialogActions>
                        <Button type={"submit"}>
                            <Icon>send</Icon>
                            submit
                        </Button>
                    </DialogActions>
                </Fragment>

            </form>

        </Dialog>
    )
};

EditMemento.propTypes = {
    allMemento: PropTypes.array.isRequired,
    byId: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    let byId = {};
    state.memento.allMemento.forEach(x => {
        byId = {
            [x._id]: {
                ...x
            }
        }
    });
    return {
        allMemento: state.memento.allMemento,
        byId
    }
};

export default connect(mapStateToProps)(EditMemento);