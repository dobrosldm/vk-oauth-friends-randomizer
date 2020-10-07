import React, { Component } from 'react';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signed: false
        };

        this.onSignIn = this.onSignIn.bind(this);
    }

    async onSignIn() {
        window.location.href = 'https://oauth.vk.com/authorize?'
            +'client_id=7620607&display=page&redirect_uri=http://localhost:3000/auth&scope=friends,offline'
            +'&response_type=code&v=5.124';

    }

    componentDidMount() {
        const code = new URLSearchParams(window.location.search).get('code');
        console.log('code - ', code);

        if (code) {
            fetch('/oauth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({code})
            })
                //.then(res => res.json())
                //.then(data => console.log(data));
        }
    }

    render() {
        return (
            <div className="App">
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
