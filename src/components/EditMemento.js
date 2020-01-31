import React, {useState} from "react";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {notify} from "react-notify-toast";
import {withRouter} from 'react-router-dom'
import Slider from "./Slider";
import gql from "graphql-tag";
import {useDispatch, useSelector} from "react-redux";
import {addSingleMemento} from "../redux/actions";

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

const EDIT_MEMENTO = gql`
    mutation editMemento($_id: ID!, $title: String!,  $content: String!, $mood: Float!) {
        editMemento(_id: $_id, input: {title: $title, content: $content, mood: $mood}) {
            _id
            title
            date
            mood
            content
        }
    }
`;
const EditMemento = ({match}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mood, setMood] = useState(0.00);

    const moodChange = (mood) => {
        setMood(mood);
    };

     const memento  = useSelector((state) => state.memento.allMemento.find( x => x._id === match.params.id));

     
         const {loading, error, data} = useQuery(MEMENTO_QUERY, {
             variables: {
                 _id: match.params.id
             },

             onCompleted(data) {
             },
             skip: typeof memento !== "undefined"
         });


    const [editMemento] = useMutation(EDIT_MEMENTO);

    if (loading) return <div>Fetching Memento</div>;
    if (error) {
        console.log(error);
        return <div> Error fetching note</div>
    }
    ;


    return (
        <div className="container m-t-20">
            <h1 className="page-title">Edit Memento</h1>

            <div className="newmemento-page m-t-20">
                <form onSubmit={e => {
                    e.preventDefault();
                    editMemento({
                        variables: {
                            _id: memento._id,
                            title: title || memento.title,
                            content: content || memento.content,
                            mood: parseFloat(mood)
                        },
                    });
                    notify.show("Memento edited successfully");
                }}>
                    <div className="field">
                        <label>Memento title</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Memento Title"
                                   name={"title"} defaultValue={memento.title}
                                   onChange={e => setTitle(e.target.value)} required/>
                        </div>
                        <div className="control">
                            <label>{mood}</label>
                            <Slider value={memento.mood} onValueChange={moodChange}/>
                        </div>
                    </div>


                    <div className="field">
                        <label className="label">Memento Content</label>
                        <div className="control">
                            <textarea className="textarea" rows="10" placeholder="Memento Content here..."
                                      defaultValue={memento.content} name={"content"}
                                      onChange={e => setContent(e.target.value)} required>
                            </textarea>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <button className="button-is-link">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditMemento;