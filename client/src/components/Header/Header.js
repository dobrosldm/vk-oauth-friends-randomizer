import React from 'react';

import './Header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        localStorage.removeItem('token');
        this.props.history.push('/auth');
    }

    render() {
        const currentUser = this.props.currentUser;

        return (
            currentUser ?
                <div className="header">
                    <div className="leftPart">
                        <img src={currentUser.photo_50} alt=""/>
                        <div className="userName">{currentUser.first_name} {currentUser.last_name}</div>
                    </div>
                    <div className="rightPart">
                        <button
                            onClick={this.logOut}
                        >
                            Log out
                        </button>
                    </div>
                </div>
            :
                <div className="header">
                    <div className="rightPart">
                        <button
                            onClick={this.props.signIn}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
        );
    }
}

export default Header;