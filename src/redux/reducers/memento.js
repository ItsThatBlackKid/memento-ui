import {ADD_MANY_MEMENTO, ADD_SINGLE_MEMENTO, MEMENTO_SORT, SET_CURRENT_MEMENTO} from "../actionTypes";
import moment from "moment";

const SORT_ASC = "ASC";
const SORT_DESC = "DESC";

const defaultSortKey = 'date';
const initState = {
    allMemento: [],
    sortKey: defaultSortKey,
    sortOrder: SORT_DESC,
    byMonth: {
        January: [],
        February: [],
        March: [],
        April: [],
        May: [],
        June: [],
        July: [],
        August: [],
        September: [],
        October: [],
        November: [],
        December: []
    }
};

const sortFn = (a, b, state) => {
    if (state.sortOrder === SORT_ASC) {
        return (new Date(a[state.sortKey]) - new Date(b[state.sortKey]))
    }

    if (state.sortOrder === SORT_DESC) {
        return new Date(b[state.sortKey]) - new Date(a[state.sortKey])
    }
};

const groupBy = (memento, state, groupKey) => {
    const byMonth = {};
    let it = 0;

    switch (groupKey) {
        case "month": {
            memento.forEach(obj => {
                const month = moment(obj.date).format("MMMM");
                if (it === 0 || !byMonth.hasOwnProperty(month)) {
                    byMonth[month] = [...state.byMonth[month],obj];
                } else {
                    byMonth[month] = [...byMonth[month],obj];
                }

                it += (it === 0) ? 1 : 0;

            });


            break;
        }
        case "year": {
            break;
        }

        default: {
            break;
        }
    }

    return {
        ...state,
        byMonth
    }

}

export default (state = initState, action) => {
    switch (action.type) {
        case SET_CURRENT_MEMENTO: {
            const {mementoObj} = action.payload
            return Object.assign({}, state, {
                currentMemento: mementoObj
            })
        }

        case ADD_SINGLE_MEMENTO: {
            const {mementoObj} = action.payload;
            const toUpdate = [...state.allMemento, mementoObj];

            return Object.assign({}, state, {
                allMemento: toUpdate.sort((a, b) => {
                    return sortFn(a, b, state)
                })
            })

        }

        case ADD_MANY_MEMENTO: {
            const {mementoArr} = action.payload;
            const both = [...state.allMemento, ...mementoArr];
            const grouped = groupBy(mementoArr, state, "month");
            return Object.assign({}, state, {
                ...grouped,
                allMemento: both.sort((a, b) => {
                    return sortFn(a, b, state)
                }),
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

