import {combineReducers} from "redux";
import memento from './memento'
import user from './user'

const mementoApp = combineReducers({
    memento,
    user
});

export default mementoApp;