import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap3/dist/css/bootstrap.css';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const initialState = {
    online: true,
    heaterVal: ''
};
const store = createStore(stateHandler, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
var intervalOnline = null;

function tickStartOnline() {
    intervalOnline = setTimeout(
        () => {
            store.dispatch({ type: 'ONLINE_OFF'});
        },
        3000
    );
}
function restarttickOnline() {
    clearTimeout(intervalOnline);
    tickStartOnline();
}

tickStartOnline();

function stateHandler(state = initialState, action) {
    if (action.type === 'ONLINE_ON') {
        restarttickOnline();
        return {
            ...state,
            online: true
        };
    } else if (action.type === 'ONLINE_OFF') {
        return {
            ...state,
            online: false
        };
    }else if (action.type === 'HEATER_VAL') {
        return {
            ...state,
            heaterVal:(action.payload + '%')
        };
    }
    return state;
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);