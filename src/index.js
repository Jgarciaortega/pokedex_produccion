import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import EntradaTexto from './lib/EntradaTexto.js';
import Pokemons from './lib/Pokemons.js';
import Header from './lib/Header'
import logo from './assets/img/logo.png'
import CircularDeterminate from './lib/CircularDeterminate'
import pikachu from './assets/img/pikachu.gif'

class Pokedex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            busqueda: null,
            pokemons: [],
            buscando: false,
            mensajeError: false

        };

    }

    loadState() {

        let middleHeight = this.heightDisplay();
        let middleWidth = this.widthDisplay();

        return {
            top: middleHeight,
            left: middleWidth,
            visibility: this.state.buscando ? 'visible' : 'hidden'
        }

    }

    widthDisplay = () => {

        let anchura = 375;

        let x = parseInt((window.screen.width / 2) - (anchura / 2));

        return x;
    }

    heightDisplay = () => {

        let altura = 387;

        let y = parseInt((window.screen.height / 2) - (altura / 2));

        return y;
    }

    mensajeError() {

        return {

            visibility: this.state.mensajeError ? 'visible' : 'hidden'
        }
    }


    componentDidMount() {

        let url = 'https://pokeapi.co/api/v2/pokemon?limit=1000';
        fetch(url)
            .then(response => response.json())
            .then(elements => this.setState({ busqueda: elements }));

    }

    buscarPokemon = (nombrePokemon) => {

        //lista las opciones tecleadas en el input
        let busquedaPokemons = [];
        //muestra objetos pokemon los cuales contienen la info a mostrar por interfaz
        let listaPokemons = [];

        this.setState({ buscando: true })

        this.state.busqueda.results.forEach(element => {

            if (element.name.startsWith(nombrePokemon)) busquedaPokemons.push(element);
            else {

                listaPokemons = [];
                this.setState({ pokemons: listaPokemons });

            }
        });

        /* MOSTRAR MENSAJE CUANDO NO EXISTE BUSQUEDA*/
        if (busquedaPokemons.length === 0){

            this.setState({ mensajeError: true }) ;
            console.log('0')
        } 
        else this.setState({ mensajeError: false })

        if (nombrePokemon === '') {

            listaPokemons = [];
            this.setState({ pokemons: listaPokemons, buscando: false });
            

        } else {
            busquedaPokemons.forEach(element => {

                fetch(element.url)
                    .then(response => response.json())
                    .then(element => {
                        let pokemon;

                        if (element.sprites.front_default != null && element.name != null && element.abilities.length === 3) {

                            pokemon = {

                                name: element.name,
                                sprite: element.sprites.front_default,
                                url: element.species.url,
                                abilities: [
                                    {
                                        name: element.abilities[0].ability.name,
                                        url: element.abilities[0].ability.url
                                    },

                                    {
                                        name: element.abilities[1].ability.name,
                                        url: element.abilities[1].ability.url
                                    },

                                    {
                                        name: element.abilities[2].ability.name,
                                        url: element.abilities[2].ability.url
                                    }

                                ]
                            }

                            listaPokemons.push(pokemon);

                        }


                    })
            })

            setTimeout(this.temporizador = () => {
                this.setState({ buscando: false })
            }, 1000);

            this.setState({ pokemons: listaPokemons });

        }
    }

    render() {

        return (
            <div className="Pokedex">
                {<Header url={logo} />}
                {<EntradaTexto onKeyUp={this.buscarPokemon} />}
                <p style={this.mensajeError()} id="mensajeError">Pokemon no localizado. Has de buscarlo introduciendo su nombre exacto</p>
                {<Pokemons pokemons={this.state.pokemons} />}
                <div id="circleProgress" style={this.loadState()}>
                    <img src={pikachu}></img>
                    <CircularDeterminate />
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Pokedex />,
    document.getElementById('root')
);

