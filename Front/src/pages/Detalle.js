import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/Detalle.css';
import Spinner from '../components/Spinner';
import {Row, Col } from 'react-bootstrap';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

const Detalle = () => {
    const {name} = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        if (!pokemon) {
            setCargando(true);
            console.log(BASE_URL + name);
            fetch(BASE_URL + name)
            .then((res) => res.ok ? res.json() : Promise.reject(res))
            .then((data) => {
                console.log(data);
                setPokemon({
                    nombre: data.name,
                    altura: data.height,
                    especie: data.species.name,
                    peso: data.weight,
                    habilidades: data.abilities,
                   // color: data.color.name,
                    foto: data.sprites.other.dream_world.front_default
                });
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setCargando(false);
            });
        }
    }, []);

    return (
        <>
            <div className='row'>
                {
                    cargando ?
                    (<Spinner/>)
                    :
                    <>
                        <Row> 
                            <Col xs="2" lg="2">
                                <Link to='/' className='btn-volver'>Volver</Link>
                            </Col>
                            <Col  xs="6" lg="6">
                                <h1 style={{color:"white"}}>El pokemón oculto es... <span style={{color:"red"}}>{pokemon.nombre}</span>!!!</h1> 
                            </Col>
                        </Row>
                        <Row>
                            <Col  xs="6" lg="6">
                                <div className='col-md-6 img-detalle'>
                                    <img src={pokemon.foto} alt={`Portada de ${pokemon.nombre}`}></img>
                                </div>
                            </Col>
                            <Col  xs="6" lg="6">
                                <div className='col-md-6 descripcion-detalle'>
                                    <label><span style={{fontWeight: "bold"}}>Nombre :</span> {pokemon.nombre}</label>
                                    <br/>
                                    <label><span style={{fontWeight: "bold"}}>Especie :</span> {pokemon.especie}</label>
                                    <br/>
                                    <label><span style={{fontWeight: "bold"}}>Peso :</span> {pokemon.peso}</label>
                                    <br/>
                                    <label><span style={{fontWeight: "bold"}}>Altura : </span> {pokemon.altura}</label>
                                    <br/>
                                    <label><span style={{fontWeight: "bold"}}>Habilidades :</span> 
                                    {
                                        pokemon.habilidades.map(habilidad=>{
                                            return habilidad.ability.name + ","
                                        })
                                    }
                                    </label>
                                </div>
                                
                            </Col>
                        </Row>
                    </>
                }
                
            </div>
        </>
    );
}

export default Detalle;