import {ADD_MEMENTO, DELETE_MEMENTO} from "../actionTypes";

const initState ={
    allMemento: [],
};

export default (state =initState, action) => {
    switch (action.type) {
        case ADD_MEMENTO:
            const {memento, _id} = action.payload;

            return {
                ...state,
                allMemento: [...state.allMemento, memento],
            }
    }
}

