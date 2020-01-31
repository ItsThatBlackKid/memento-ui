import {ADD_MANY_MEMENTO, ADD_SINGLE_MEMENTO, DELETE_MEMENTO, USER_LOGIN, USER_LOGOUT} from "./actionTypes";

export const addSingleMemento = mementoObj => ({
    type: ADD_SINGLE_MEMENTO,
    payload: {
        mementoObj
    }
});

export const addManyMemento = mementoArr => ({
    type: ADD_MANY_MEMENTO,
    payload: {
        mementoArr
    }
});

export const userLogin = userObj => ({
    type: USER_LOGIN,
    payload: {
        userObj
    }
});

export const userLogout = () => ({
    type: USER_LOGOUT
});