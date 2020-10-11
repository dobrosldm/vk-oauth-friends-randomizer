import React from 'react';

import './Content.css';
import Header from "../Header/Header";

class Content extends React.Component {
    constructor() {
        super();

        this.state = {
            userInfo: {},
            friendsInfo: []
        }
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
                    this.setState({userInfo: data.userInfo});
                    this.setState({friendsInfo: data.friendsInfo});
                });
        } else {
            this.props.history.push('/auth');
        }
    }

    render() {
        return(
            <div>
                <Header history={this.props.history} currentUser={this.state.userInfo} />
                <div className='friendsList'>
                    {this.state.friendsInfo.map((item, index) => {
                        return <div key={index} className='friend'>
                            <div className='avatar'>
                                <img src={item.photo_100} alt=''/>
                            </div>
                            <div className='info'>
                                <div>{item.first_name} {item.last_name}</div>
                                <div>{item.online ? 'Online' : 'Offline'}</div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        );
    }
}

export default Content;