import {ADD_MANY_MEMENTO, ADD_SINGLE_MEMENTO, MEMENTO_SORT, SET_CURRENT_MEMENTO} from "../actionTypes";

const SORT_ASC = "ASC";
const SORT_DESC = "DESC";

const defaultSortKey = 'date';
const initState = {
    allMemento: [],
    sortKey: defaultSortKey,
    sortOrder: SORT_DESC
};

export default (state = initState, action) => {
    switch (action.type) {
        case SET_CURRENT_MEMENTO: {
            const {mementoObj} = action.payload
            return Object.assign({}, state, {
                currentMemento: mementoObj
            })
        }

        case ADD_SINGLE_MEMENTO: {
            const {mementoObj, _id} = action.payload;
            const toUpdate = [...state.allMemento, mementoObj];

            return Object.assign({}, state, {
                allMemento: toUpdate.sort((a, b) => {
                    if (state.sortOrder === SORT_ASC) {
                        return a[state.sortKey] > b[state.sortKey] ? a : b
                    }

                    if (state.sortOrder === SORT_DESC) {
                        return a[state.sortKey] < b[state.sortKey] ? a : b
                    }
                })
            })

        }

        case ADD_MANY_MEMENTO: {
            const {mementoArr} = action.payload;
            const both = [...state.allMemento, ...mementoArr];
            return Object.assign({}, state, {
                allMemento: both.sort((a, b) => {
                    if (state.sortOrder === SORT_ASC) {
                        return a[state.sortKey] > b[state.sortKey] ? b : a
                    }

                    if (state.sortOrder === SORT_DESC) {
                        return a[state.sortKey] < b[state.sortKey] ? a : b
                    }
                })
            })
        }

        case
        MEMENTO_SORT: {
            const sortKey = action.payload.sortKey || state.sortKey;
            const sortOrder = action.payload.sortOrder || state.sortKey;
            const sorted = state.allMemento.sort((a, b) => {
                if (sortOrder === SORT_DESC) return a[sortKey] > b[sortKey] ? a : b;
                if (sortOrder === SORT_ASC) return a[sortKey] < b[sortKey] ? a : b;
            })

            return {
                ...state,
                sortKey,
                sortOrder,
                allMemento: [...sorted]
            }
        }

        default: {
            return state
        }
    }
}

