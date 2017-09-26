import React from 'react';
import {Provider} from 'react-redux';

import createStore from './src/store';

import Nav from './src/Nav';

export default () => (
    <Provider store={createStore()}>
        <Nav/>
    </Provider>
);
