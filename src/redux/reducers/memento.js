import {ADD_SINGLE_MEMENTO, ADD_MANY_MEMENTO, DELETE_MEMENTO, SET_CURRENT_MEMENTO} from "../actionTypes";

const initState ={
    allMemento: [],
};

export default (state =initState, action) => {
    switch (action.type) {
        case SET_CURRENT_MEMENTO: {
            const {mementoObj} = action.payload
            return Object.assign({}, state, {
                currentMemento: mementoObj
            })
        }

        case ADD_SINGLE_MEMENTO: {
            const {mementoObj, _id} = action.payload;
            console.log(action);
            return Object.assign({}, state, {
                allMemento: [...state.allMemento, mementoObj]
            })

        }

        case ADD_MANY_MEMENTO: {
            const {mementoArr} = action.payload;
            return Object.assign({}, state, {
                allMemento: [...state.allMemento, ...mementoArr],
            })
        }

        default: {
            return state
        }
    }
}

