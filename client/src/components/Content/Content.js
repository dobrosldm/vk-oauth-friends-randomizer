import React, { Component } from 'react';

class Content extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        alert(localStorage.getItem('token'));
    }

    render() {
        return(
            <h2>Content here</h2>
        );
    }
}

export default Content;