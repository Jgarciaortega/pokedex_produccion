import React from 'react';


export default class EntradaTexto extends React.Component {


    handleChange = (e) => {
            let value = e.target.value.toLowerCase();
            this.props.onKeyUp(value);

        }

        render() {

            return (
                <div id="form">
                    <input onKeyUp={this.handleChange} type="text" placeholder="Introduce pokemon..."></input>
                </div>
            );
        }
    }

    