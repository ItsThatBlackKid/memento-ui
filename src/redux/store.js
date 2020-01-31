import {createStore} from 'redux'
import mementoApp from "./reducers";

const store = createStore(mementoApp, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


export default store;
