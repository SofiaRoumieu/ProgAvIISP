import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/Detalle.css';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Modal, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';

const URL = 'http://localhost:3002/api/';
const INITIAL_VALUES = {
    id: null,
    nombre: "",
    edad: "",
    tipo: "",
    vacunado: false,
    observaciones: ""
};

const MascotaDetalle = (props) => {
    const navigate = useNavigate();

    const [form, setForm] = useState(INITIAL_VALUES);
    const { id } = useParams();
    const [token, setToken] = useState("");    
    const [mascota, setMascota] = useState({});
    const [loading, setLoading] = useState(false);
    const { nombre, edad, tipo, vacunado, observaciones } = form;
    const [tipos, setTipos] = useState([{id:1, descripcion:"Perro"}, {id:2, descripcion:"Gato"}, {id:3, descripcion:"Conejo"}, {id:4, descripcion:"Tortuga"}]);

    useEffect(() => {
        console.log(props.tipo);
        let token = localStorage.getItem("token");
        setToken(token);
        setLoading(true);
        fetch(URL + 'mascota/' + id, {
            headers: {
                authorization: "bearer " + token
            }
        })
            .then(data => data.json())
            .then((mascota) => {
                setMascota(mascota);
                setForm(mascota);
                console.log(mascota);
            })
            .finally(() => setLoading(false))
    }, [id]);

    const editarMascota = () => {
        setLoading(true);
        console.log(form);
        fetch(URL + 'mascota/' + id, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
                "authorization": "bearer " + token
            },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then((data) => {

                alert("Modificacion exitosa");
            })
            .catch(err => console.log(err))
            .finally(() => {
                navigate('/mascotas-listado');
            })
    }
    
    const handleChange = (e) => {
        setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
    };


    return (
        <>
            {
                loading ? <Spinner/> : (
                    <Card >
                        <Row>
                            <h4 className="card-header">
                                {props.tipo == "ver-detalle" ? "Ver detalle mascota" :"Editar mascota"}
                            </h4>
                        </Row>
                        {props.tipo == "ver-detalle" ? 
                            <> 
                                <Row>
                                    <Col xs lg="4" style={{textAlign:"rigth"}}>
                                        <Form.Label >Nombre:</Form.Label>
                                    </Col>
                                    <Col xs lg="8" style={{textAlign:"left"}}>
                                        <Form.Label>{mascota.nombre}</Form.Label>                       
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs lg="4" style={{textAlign:"rigth"}}>
                                        <Form.Label >Tipo:</Form.Label>
                                        </Col>
                                    <Col xs lg="8"  style={{textAlign:"left"}}>
                                        <Form.Label>{mascota.tipo}</Form.Label>               
                                    </Col>
                                    </Row>
                                <Row>
                                    <Col xs lg="4" style={{textAlign:"rigth"}}>
                                        <Form.Label >Edad:</Form.Label>
                                        </Col>
                                    <Col xs lg="8" style={{textAlign:"left"}}>
                                        <Form.Label>{mascota.edad}</Form.Label>                   
                                    </Col>
                                    </Row>
                                <Row>
                                    <Col xs lg="4" style={{textAlign:"rigth"}}>
                                        <Form.Label >¿Está vacunado?:</Form.Label>
                                        </Col>
                                    <Col xs lg="8" style={{textAlign:"left"}}>
                                        <Form.Label> {mascota.vacunado ? "Si" : "No"}</Form.Label>                   
                                    </Col>
                                    </Row>
                                <Row>
                                    <Col xs lg="4" style={{textAlign:"rigth"}}>
                                        <Form.Label >Observaciones:</Form.Label>
                                        </Col>
                                    <Col xs lg="8" style={{textAlign:"left"}}>
                                        <Form.Label> {mascota.observaciones}</Form.Label>                   
                                    </Col>
                                </Row>
                                <Row>
                                    <Button onClick={()=> navigate('/mascotas-listado')} className="btn-secondary mt-2">Volver</Button>
                                </Row>
                            </> 
                            : 
                            <>
                            <form onSubmit={editarMascota} className='row' >
                                <label htmlFor='nombre' className='label' > Nombre </label>
                                <input
                                    id='nombre'
                                    type="text"
                                    name="nombre"
                                    placeholder="Ingrese nombre..."
                                    className='form-control '
                                    value={nombre}
                                    onChange={handleChange}
                                />
                                <label htmlFor='edad' className='label' > Edad </label>
                                <input
                                    id='edad'
                                    type="number"
                                    name="edad"
                                    placeholder="Ingrese edad..."
                                    className='form-control '
                                    value={edad}
                                    onChange={handleChange}
                                />
                                <label htmlFor='tipo' className='label'> Tipo </label>
                                <select name='tipo' value={tipo} className='form-control' onChange={handleChange}>
                                    <option className='form-control' key="0" value="-" selected>Seleccione..</option>
                                    {
                                        tipos.map((tipo) => {
                                            return <option className='form-control' key={tipo.id} value={tipo.descripcion} >{tipo.descripcion}</option>
                                        })
                                    }
                                </select>
                                <label htmlFor='vacunado' className='label'> Esta vacunado? </label>
                                <select name="vacunado" id='vacunado' className='form-control' value={vacunado} onChange={handleChange} >
                                    <option value={true}> Si </option>
                                    <option value={false}> No </option>
                                </select>
                                <label htmlFor='observaciones' className='label' > Observaciones </label>
                                <input
                                    id='observaciones'
                                    type="text"
                                    name="observaciones"
                                    placeholder="Observaciones..."
                                    className='form-control'
                                    value={observaciones}
                                    onChange={handleChange}
                                />
                                <div className='centrar mt-3 gap-3'>
                                    <Button type="submit" className="btn btn-primary mb-3"> Guardar </Button>
                                    <Button onClick={()=> navigate('/mascotas-listado')}  className="btn btn-secondary mb-3"> Volver </Button>
                                </div>
                            </form>
                            </>
                        }
                    </Card>
                )
            }
        </>

    );
}

export default MascotaDetalle;