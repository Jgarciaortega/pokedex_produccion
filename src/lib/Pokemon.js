import React from 'react';

export default class Pokemon extends React.Component {

    mostrarDetalle =() =>{

        this.props.onClick(this.props);
    }


    render() {

        return (
            <div className="contenedorPokemon" onClick={this.mostrarDetalle}>
                <h3>{this.props.name}</h3>
                <img src={this.props.sprite} alt={this.props.name}></img>
            </div>)
    }

}

