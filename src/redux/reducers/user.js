import {USER_LOGIN, USER_LOGOUT} from "../actionTypes";

const initState = {};

export default (state = initState, action) => {
    switch (action.type) {
        case USER_LOGIN: {
            const {userObj} = action.payload;

            return userObj;
        }

        case USER_LOGOUT: {
            return initState;
        }

        default: {
            return state;
        }
    }
}