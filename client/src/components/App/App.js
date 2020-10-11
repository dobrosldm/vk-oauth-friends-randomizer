import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
                    </Switch>
                </Router>
            </div>
        );
    }
}

/*{history.push('/content')}*/

export default App;
