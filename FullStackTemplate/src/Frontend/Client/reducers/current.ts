
export const Actions = {
    SetUset: 'CURRENT_SETUSER'
}

export function Reducer(state = {}, action) {

    switch (action.type) {

        case Actions.SetUset:

            state = { ...state, user: action.user }
            break;
    }

    return state;
}