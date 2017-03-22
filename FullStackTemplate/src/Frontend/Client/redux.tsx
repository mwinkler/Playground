
import * as react from 'react'
import * as reactDom from 'react-dom'
import { createStore } from 'redux'

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH':
            break;
    }

    return state;
}

const store = createStore(reducer);

store.dispatch({ type: 'FETCH' });