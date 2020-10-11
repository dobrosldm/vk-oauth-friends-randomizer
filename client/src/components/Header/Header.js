import React from 'react';
import { Link } from 'react-router-dom';

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
        return (
            <div className="header">
                {this.props.currentUser ?
                    <div>
                        <img src={this.props.currentUser.photo_50} alt=''/>
                        <span>{this.props.currentUser.first_name} {this.props.currentUser.last_name}</span>
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
                            <Link to="/auth">Sign In</Link>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Header;