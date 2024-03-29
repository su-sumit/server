import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import 'semantic-ui-css/semantic.min.css';

import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDom.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
