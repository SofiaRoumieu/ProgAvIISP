import React, { useState, useEffect } from 'react';
import '../styles/Listado.css';
import Card from '../components/Card';
import {Row, Col } from 'react-bootstrap';
import Spinner from '../components/Spinner';
import Detalle from './Detalle';

const URL = 'https://pokeapi.co/api/v2/pokemon/?limit=20';

const Listado = () => {
    const [pokemones, setPokemones] = useState([]);
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        console.log("esta en use effect de listado");
        if (!pokemones.length) {
            setCargando(true);
            fetch(URL)
            .then((res) => res.ok ? res.json() : Promise.reject(res))
            .then((data) => {
                console.log(data);
                data.results.forEach((pokemon) => {
                    setPokemones((pokemonesGuardados) => {
                        return [
                            ...pokemonesGuardados, 
                            {
                                id: pokemon.id,
                                nombre: pokemon.name,
                            }
                        ];
                    });
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

    ////ejemplo para consumir un POST
    // const createMovie = (newMovie) =>{
    //     const addMovie =async (url, nuevaPelicula) =>{
    //         try{
    //             setLoading(true);
    //             const res = await fetch(url, {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify(nuevaPelicula),
    //             });
    //             const data = await res.json();
    //             setMovies((peliculas)=>[...peliculas, data]);
    //         }catch(error){
    //             console.error(error);
    //         }
    //         finally{
    //             setLoading(false);
    //         }
    //     };

    //     addMovie(URL, newMovie);
    // };

    //ejemplo para consumir un PUT/PATCH
    // const updateMovie = (updatedMovie) =>{
    //     const actualizarMovie =async (url, peliActualizada) =>{
    //         try{
    //             setLoading(true);
    //             const res = await fetch(url + peliActualizada.id, {
    //                 method: "PUT",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify(peliActualizada),
    //             });
    //             const data = await res.json();
    //             setMovies((movies) => {
    //                 return movies.map((movie) =>
    //                 movie.id === data.id ? data : movie
    //                 );
    //             });
    //         }catch(error){
    //             console.error(error);
    //         }
    //         finally{
    //             setLoading(false);
    //         }
    //     };

    //     actualizarMovie(URL, updatedMovie);
    // };

    // //ejemplo para consumir un DELETE, verificar que este bien, el lo hizo con axios
    // const deleteMovie = (id) =>{
    //     const eliminarMovie =async (url, peliEliminada) =>{
    //         try{
    //             setLoading(true);
    //             const res = await fetch(url + id, {
    //                 method: "DELETE"
    //             });
    //             setMovies((movies) => {
    //                 movies.filter((movie) =>
    //                 movie.id !== id
    //                 );
    //             });
    //         }catch(error){
    //             console.error(error);
    //         }
    //         finally{
    //             setLoading(false);
    //         }
    //     };

    //     eliminarMovie(URL, deletedMovie);
    // };

    return (
        <div className='row listado'>
            <h1 style={{color:"white"}}>Listado de Pokebolas, descubrí el pokemón oculto en cada una</h1>
        {
            cargando ?
            (<Spinner/>)
            :
            <>
            <Row>
                { pokemones.map((pokemon) => {
                    
                    return <Col xs="4" lg="4"><Card key={pokemon.id} item={pokemon} /></Col>;
                    })
                }
            </Row>
            </>
        }
        </div>
    );
}

export default Listado;