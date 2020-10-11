import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Auth from '../Auth/Auth';
import Content from '../Content/Content';

import './App.css';

class App extends React.Component {
    render() {
        const { history } = this.props;

        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path='/auth' history={history} component={Auth} />
                        <Route exact path='/content' history={history} component={Content} />
                        <Redirect to='/content' />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
