import React, { Component } from 'react';

class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }

        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem('token');

        if (token) {
            fetch('/friends', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({token})
            })
                .then(res => res.json())
                .then(data => {
                    this.setState({data});
                });
        } else {
            this.props.history.push('/auth');
        }
    }

    logOut() {
        localStorage.removeItem('token');
        this.props.history.push('/auth');
    }

    render() {
        return(
            <li>
                {this.state.data.map((item, index) => {
                    return <div key={index}>
                        <span>{item.first_name} {item.last_name}</span>
                        <br/>
                        <span>{item.online ? 'Online' : 'Offline'}</span>
                        <br/>
                        <img src={item.photo_50} alt=''/>
                    </div>
                })}
                <button
                    onClick={this.logOut}
                >
                    Log out
                </button>
            </li>
        );
    }
}

export default Content;