import React from 'react';
import '../styles/Card.css';
import { Link } from "react-router-dom";

const Card = ({item}) => {
    const {id, nombre, imagen} = item;

    return ( 
        <div className='card'>
            <div className='img-card'>
            </div>
            
            <Link className='card-title' to={`/detalle/${nombre}`} >¿ ?</Link>
        </div>
    );
}

export default Card;