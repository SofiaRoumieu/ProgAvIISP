import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Card.css';
import { Container, Row, Col, Form, Button, Card, Spinner, Modal, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';

const INITIAL_FORM = {
    correo: "",
    clave: ""
};

const URL = 'http://localhost:3002/api/';

const Login = () => {
    const [esLogin, setEsLogin] = useState(true);

    const [form, setForm] = useState(INITIAL_FORM)
    const { correo, clave } = form;

    const handleLogin = (e) => {
        esLogin ? setEsLogin(false) : setEsLogin(true)
        console.log(esLogin)
    }

    const navigate = useNavigate();

    useEffect(() => {
        console.log(esLogin)
    }, [esLogin])

    const handleReset = () => {
        setForm(INITIAL_FORM);
    };

    const handleChange = (e) => {
        setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Enviando...", form);
        if (esLogin) {
            console.log("Iniciar Sesion");
            iniciarSesion();
        } else {
            console.log("Agregar usuario");
            agregarUsuario();
        }

    }

    const iniciarSesion = () => {
        fetch(URL + 'usuario/login', {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(form)
        })
        .then(res => res.json())
        .then((data) => {
            if (data.error) {
                return console.error(data.message);
                alert(data.message);
            }
            console.log(data);
            localStorage.setItem("token", data.token);
            navigate("/mascotas-listado");
            handleReset();
        })
        .catch(err => { console.log(err); alert(err); })
    }

    const agregarUsuario = () => {
        fetch(URL + 'usuario/', {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(form)
        })
        .then(res => res.json())
        .then((data) => {
            if (data.error) {
                return console.error(data.message);
                alert(data.message);
            }
            console.log(data);
            alert("Usuario generado con éxito");
            handleReset();
        })
        .catch(err => console.log(err));
    }

    return (
        <Card className='card'>
            <label className='card-title'> {esLogin ? "INICIAR SESIÓN" : "NUEVO USUARIO"} </label>
            <div className='containerLogin'>
                <form onSubmit={handleSubmit} >
                <label htmlFor='correo' className='label' > Correo </label>
                <input
                    id='correo'
                    type="email"
                    name="correo"
                    placeholder="Ingresá tu correo..."
                    className='form-control '
                    value={correo}
                    onChange={handleChange}
                />
                <label htmlFor='clave' className='label' > Clave </label>
                <input
                    id='clave'
                    type="password"
                    name="clave"
                    placeholder="Ingresá tu clave..."
                    className='form-control '
                    value={clave}
                    onChange={handleChange}
                />
                <div className='centrar mt-3 gap-4 '>
                    <Button type="submit" className="btn btn-primary mb-3 button-card"> {esLogin ? "Iniciar sesion" : "Crear cuenta"} </Button>
                    <Button type="reset" className="btn btn-secondary mb-3 button-card" onClick={handleReset} > Limpiar </Button>
                </div>
                </form>
                <label> {esLogin ? "¿No tenés usuario?" : "¿Ya tenés usuario?"}</label>
                <Button className='btn btn-warning mb-3 button-card' onClick={handleLogin} > {esLogin ? "Registrarse" : "Ir al Login"}  </Button>
            </div>
        </Card>
    );
}

export default Login;