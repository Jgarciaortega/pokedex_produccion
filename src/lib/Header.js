import React from 'react';

export default class Header extends React.Component{

    render(){

        return(
            <header id="header">
                <img src={this.props.url}></img>
            </header>
        )
    }
}