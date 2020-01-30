import React, {useState} from "react";
import {useMutation} from "@apollo/react-hooks";
import {withRouter} from 'react-router-dom'
import gql from 'graphql-tag'
import Slider from "./Slider";

const NEW_MEMENTO = gql `    
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

const NewMemento = withRouter(({history}) => {
    const [mood, setMood] = useState(0);
    const [title, setTitle] = useState("");
    const [content, setContent] =  useState("");

    const [createMemento] = useMutation(NEW_MEMENTO, {
        update(cache, {data: {createMemento}}) {
            const {allMemento} = cache.readQuery(({query: MEMENTO_QUERY}));

            cache.writeQuery({
                query: MEMENTO_QUERY,
                data: {allMemento: allMemento.concat([createMemento])}
            })
        }
    });

    const moodChange = (mood) => {
        setMood(mood);
    };

    return (
        <div className="container m-t-20">
            <h1 className="page-title">New Memento</h1>

            <div className="newmemento-page m-t-20">
                <form onSubmit={e => {
                    console.log('submitting');
                    e.preventDefault();

                    createMemento({
                        variables: {
                            title,
                            mood,
                            content,
                            date: Date.now()
                        }
                    }).catch(err => {
                        if(err) {
                            console.log(err)
                        }
                    });
                    history.push("/");
                }}>
                    <div className="field">
                        <label>Memento title</label>
                        <div className="control">
                            <input className="input" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Memento title" />
                        </div>
                        <div className="control">
                            <label>{mood}</label>
                            <Slider onValueChange={moodChange} />
                        </div>
                    </div>


                    <div className="field">
                        <label class="label">Memento Content</label>
                        <div className="control">
                            <textarea className="textarea" value={content} onChange={e => setContent(e.target.value)} rows="10" placeholder="Memento Content here..."/>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <button type={"submit"} className="button-is-link">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
});

export default NewMemento;