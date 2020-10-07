import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

import Auth from '../Auth/Auth';
import Content from '../Content/Content';

import './App.css';

class App extends Component {
    render() {
        const { history } = this.props;

        return (
            <div className="App">
                <Router history={history}>
                    <Link to="/auth">Authenticate</Link>
                    <br/>
                    <Link to="/content">Content</Link>
                    <Route exact path='/auth' history={history} component={Auth} />
                    <Route exact path='/content' history={history} component={Content} />
                </Router>
            </div>
        );
    }
}

export default App;
