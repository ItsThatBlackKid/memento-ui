import {ADD_MEMENTO, DELETE_MEMENTO} from "./actionTypes";

export const addMemento = memento => ({
    type: ADD_MEMENTO,
    payload: {
        memento
    }
});