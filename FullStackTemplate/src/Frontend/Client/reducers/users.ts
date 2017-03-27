
//declare module Frontend {
//    export module Reducers {
//        export interface Add extends Redux.Action {
//            user: Frontend.User
//        }
//    }
//}

export const Actions = {
    Fetch: 'USERS_FETCH',
    Add: 'USERS_ADD'
}

export function Reducer (state = [], action) {

    switch (action.type) {

        case Actions.Add:
            state = [ ...state, action.user ];
            break;
    }

    return state;
}