import React, {Component} from 'react';
import MainPage from './pages/MainPage'
import SearchPage from './pages/SearchPage'

import {Router, Scene} from 'react-native-router-flux'

export default class Nav extends Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene type="replace" key="Main" title="Main" initial component={MainPage} hideNavBar/>
                    <Scene key="search" title="search" component={SearchPage} />
                </Scene>
            </Router>
        )
    }
}

