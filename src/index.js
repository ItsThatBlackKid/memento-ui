import React from 'react';
import ReactDOM from 'react-dom';

import {ApolloProvider} from "@apollo/react-hooks";
import {ApolloClient} from "apollo-client"
import {createHttpLink} from "apollo-link-http";
import {ApolloLink} from "apollo-link";
import {InMemoryCache} from "apollo-cache-inmemory";

import {onError} from "apollo-link-error";
import Notifications, {notify} from "react-notify-toast";

import {Provider} from 'react-redux';
import store from './redux/store'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from "react-router-dom";
import {ThemeProvider} from "@material-ui/core";

const errorLink = onError(({graphQlErrors}) => {
    if (graphQlErrors) graphQlErrors.map(({message}) => {
        console.log(message);
        notify.show(message, 'error')
    })
});

const httpLink = createHttpLink({uri: "/graphql"});

const link = ApolloLink.from([
    errorLink,
    httpLink
]);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    credentials: "include",
});


ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <Provider store={store}>
                <Notifications/>
                <App/>
            </Provider>
        </Router>
    </ApolloProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
