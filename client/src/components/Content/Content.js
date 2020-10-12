import React from 'react';

import Header from '../Header/Header';
import './Content.css';

class Content extends React.Component {
    constructor() {
        super();

        this.state = {
            userInfo: {},
            friendsInfo: [],
            loading: true
        }

        this.getFriendsInfo = this.getFriendsInfo.bind(this);
        this.updateList = this.updateList.bind(this);
    }

    componentDidMount() {
        this.updateList();
    }

    async getFriendsInfo(token) {
        this.setState({loading: true});

        await fetch('/friends', {
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

        this.setState({loading: false});
    }

    updateList() {
        const token = localStorage.getItem('token');

        if (token) {
            this.getFriendsInfo(token);
        } else {
            this.props.history.push('/auth');
        }
    }

    render() {
        return(
            <div className="content">
                <Header history={this.props.history} currentUser={this.state.userInfo} />
                <div className="friendsList">
                    {this.state.friendsInfo.map((item, index) => {
                        return <div key={index} className="friend">
                            <div className="avatar">
                                <img src={item.photo_100} alt=""/>
                            </div>
                            <div className="info">
                                <div>
                                    <a target="_blank" rel="noopener noreferrer" href={`https://vk.com/id${item.id}`}>
                                        {item.first_name} {item.last_name}
                                    </a>
                                </div>
                                {item.online ?
                                    <div className="online">Online</div>
                                    :
                                    <div className="offline">Offline</div>}
                            </div>
                        </div>
                    })}
                </div>
                <button
                    onClick={this.updateList}
                    disabled={this.state.loading}
                >
                    { this.state.loading ? 'Loading...' : 'Try again' }
                </button>
            </div>
        );
    }
}

export default Content;