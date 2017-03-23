
export const Actions = {
    Fetch: 'USERS_FETCH',
    Add: 'USERS_ADD'
}

export function Reducer (state = {}, action) {

    switch (action.type) {

        case Actions.Fetch:
            state = { ...state, users: [{ id: 1, name: 'Test' }] };
            break;
    }

    return state;
}