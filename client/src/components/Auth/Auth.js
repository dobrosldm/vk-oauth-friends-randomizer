import React from 'react';
import Header from "../Header/Header";

class Auth extends React.Component {
    constructor(props) {
        super(props);

        this.onSignIn = this.onSignIn.bind(this);
    }

    async onSignIn() {
        window.location.href = 'https://oauth.vk.com/authorize?'
            +'client_id=7620607&display=page&redirect_uri=http://localhost:3000/auth&scope=friends,offline'
            +'&response_type=code&v=5.124';
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
                <Header history={this.props.history} />
                <h2>Sign in with VKontakte</h2>
                <button
                    onClick={this.onSignIn}
                >
                    Sign In
                </button>
            </div>
        );
    }
}

export default Auth;
