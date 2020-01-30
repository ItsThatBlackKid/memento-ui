import React from "react";
import {useQuery} from "@apollo/react-hooks";
import gql from 'graphql-tag'
import {Link} from "react-router-dom"

import {colourBetween} from "../util/colours";

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
    const {loading, error, data} = useQuery(MEMENTO_QUERY, {
        onCompleted: (data) => {

        }
    });


    if(loading) return "Loading...";

    if(error) {console.log(error); return `"Error!! ${error.message}`}  ;



    return (
        <div className="container m-t-20">
            <h1 className="page-title">All Memento</h1>

            <div className="allmemento-page">
                <div className="columns is-multiline">
                    {data.allMemento.length > 0
                        ? data.allMemento.map((memento) => (

                            <div className="column is-one-third" key={memento._id}>
                                <div className="card" style={{background: `${colourBetween(memento.mood)}`}}>
                                    <header className="card-header">
                                        <p className="card-header-title">
                                            {memento.title}
                                        </p>
                                    </header>
                                    <div className="card-content">
                                        <div className="content">
                                            <p>{memento.content}</p>
                                        </div>
                                    </div>
                                    <footer className="card-footer">
                                        <Link to={`memento/${memento._id}`} className="card-footer-item">
                                            Edit
                                        </Link>
                                        <a href="#" className="card-footer-item">
                                            Delete
                                        </a>
                                    </footer>
                                </div>
                            </div>
                        ))
                        : "No Memento yet"}
                </div>
            </div>
        </div>
    )
}

export default AllMemento;


