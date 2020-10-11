import React from 'react';
import Header from '../Header/Header';

import './Auth.css'

class Auth extends React.Component {
    constructor(props) {
        super(props);

        this.signIn = this.signIn.bind(this);
    }

    async signIn() {
        const params = {
            client_id: 7620607,
            display: 'page',
            redirect_uri: 'http://localhost:3000/auth',
            scope: 'friends,offline',
            response_type: 'code',
            v: '5.124'
        };

        window.location.href = 'https://oauth.vk.com/authorize?' + new URLSearchParams(params).toString();
    }

    componentDidMount() {
        if (!localStorage.getItem('token')) {
            const code = new URLSearchParams(window.location.search).get('code');

            if (code) {
                fetch('/oauth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({code})
                })
                    .then(res => res.json())
                    .then(token => {
                        localStorage.setItem('token', token);
                        this.props.history.push('/content');
                    });
            }
        } else {
            this.props.history.push('/content');
        }
    }

    render() {
        return (
            <div>
                <Header history={this.props.history} signIn={this.signIn} />
                <div className="incomingMessage">
                    <div className="block">
                        Welcome!
                    </div>
                    <div className="block">
                        Authenticate through VKontakte social network and get your 5 random friends
                    </div>
                    <div className="block">
                        Maybe it's time to write them &#128521;
                    </div>
                </div>
            </div>
        );
    }
}

export default Auth;
