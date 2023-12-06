import React, { useState, useEffect }from 'react';
import Spinner from '../components/Spinner';
import Formulario from '../components/Formulario';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Modal, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import { Search as SearchIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
//import Table from '../components/Table';

const URL = 'http://localhost:3002/api/';


const MascotasListado = () => {

    const navigate = useNavigate();
    const [mascotas, setMascotas] = useState([])
    const [mascotaU, setMascotaU] = useState(null);
    

    const [loading, setLoading] = useState(false);
    const [nuevaMascota, setNuevaMascota] = useState(false);

    const [token, setToken] = useState("");    

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        console.log('token', token)

        setLoading(true);
        fetch(URL + 'mascota', {
            headers: {
                "authorization": "bearer " + token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data)
                    setMascotas(data);
            })
            .catch(err => console.errpr(err))
            .finally(() => setLoading(false));

    }, [token])

    const cargarMascotas = () => {
        setLoading(true);
        fetch(URL + 'mascota', {
            headers: {
                "authorization": "bearer " + token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data)
                    setMascotas(data);
            })
            .catch(err => console.log("eee", err))
            .finally(() => setLoading(false))
    }

    const agregarMascota = (mascota) => {
        setLoading(true);

        fetch(URL + 'mascota', {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
                "authorization": "bearer " + token
            },
            body: JSON.stringify(mascota)
        })
            .then(res => res.json())
            .then((data) => {
                setMascotas((mascotas) => [...mascotas, data]);
            })
            .catch(err => console.log(err))
            .finally(() => {
                cargarMascotas();
                setNuevaMascota(false);
            })

        setMascotas((mascotas) => [...mascotas, mascota]);
    }

    const modificarMascota = (mascotaEditada) => {
        setLoading(true);
        fetch(URL + 'mascota/' + mascotaEditada.id, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
                "authorization": "bearer " + token
            },
            body: JSON.stringify(mascotaEditada)
        })
            .then(res => res.json())
            .then((data) => {
                setMascotas((mascotas) => {
                    return mascotas.map(mascota => {
                        return mascota.id === data.id ? data : mascota
                    })
                })
                alert("Modificacion exitosa");
            })
            .catch(err => console.log(err))
            .finally(() => {
                cargarMascotas();
            })
    }

    const eliminarMascota = (id) => {
        setLoading(true);
        fetch(URL + 'mascota/' + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "Application/json",
                "authorization": "bearer " + token
            }
        })
            .then(res => res.json())
            .then((data) => {
                setMascotas((mascotas) => {
                    return mascotas.filter(mascota => mascota.id !== id)
                })
                alert("Se elimino la mascota", data);
            })
            .catch(err => console.log(err))
            .finally(() => {
                cargarMascotas();
            })
    }


    const handleModificarMascota = () => {
        //setMascotaEditar(mascota)
    }

    const handleEliminarMascota = () => {
       // eliminarMascota(mascota.id);
    }
    return (
        <>
            <section className='row centrar'>
                {
                    loading ? (
                        <Spinner></Spinner>
                    ) : (
                        <>
                        <Row>
                            <h4> LISTADO DE MASCOTAS</h4>
                        </Row>
                        <Row>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th colSpan={3}>Nombre</th>
                                    <th colSpan={3}>Tipo</th>
                                    <th colSpan={3}>Edad</th>
                                    <th colSpan={3} >Acciones</th>
                                </tr>
                            </thead>
                            <tbody className='table table-hover'>
                                {
                                    mascotas.length > 0 ? (
                                        mascotas.map((mascota) => {
                                            return <tr >
                                                        <td colSpan={3}>{mascota.nombre}</td>
                                                        <td colSpan={3}>{mascota.tipo}</td>
                                                        <td colSpan={3}>{mascota.edad}</td>
                                                        <td>
                                                            <button title="ver detalle" onClick={()=>navigate('/mascota-detalle/' + mascota.id)}> <SearchIcon /> </button>
                                                        </td>
                                                        <td>
                                                            <button title="editar" onClick={()=>navigate('/mascota-editar/' + mascota.id)}> <EditIcon/> </button>
                                                        </td>
                                                        <td>
                                                            <button title="eliminar" onClick={()=>eliminarMascota(mascota.id)}> <DeleteIcon/> </button>
                                                        </td>
                                                    </tr>
                                        })
                                    ) : (<></>)
                                }
                            </tbody>
                        </table>
                        </Row>
                        </>
                    )
                }
            </section>
            <section>
                <button className='btn btn-danger' onClick={()=>setNuevaMascota(nuevaMascota ? false :true)} > {nuevaMascota ? "Ocultar formulario": "Nueva mascota"} </button>
            
                { nuevaMascota &&
                    <Card className='card'>
                        <Formulario
                            mascotaU={mascotaU}
                            agregarMascota={agregarMascota}
                            modificarMascota={modificarMascota}
                        >
                        </Formulario>
                    </Card>
                }
            </section>
        </>
    );
}

export default MascotasListado;