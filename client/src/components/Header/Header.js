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
            <div className="header">
                {currentUser ?
                    <div>
                        <img src={currentUser.photo_50} alt=''/>
                        <span>{currentUser.first_name} {currentUser.last_name}</span>
                        <div className="header-right">
                            <button
                                onClick={this.logOut}
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                :
                    <div>
                        <div className="header-right">
                            <button
                                onClick={this.props.signIn}
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Header;