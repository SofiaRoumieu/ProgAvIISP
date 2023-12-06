import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Detalle from "../pages/Detalle";
import Listado from "../pages/Listado";
import Login from "../pages/Login";
import MascotasListado from "../pages/MascotasListado";
import MascotaDetalle from "../pages/MascotaDetalle";

const Ruteador = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/mascotas-listado" element={<MascotasListado />} />
                <Route path="/listado" element={<Listado />} />
                <Route path="/mascota-detalle/:id"  element={<MascotaDetalle tipo="ver-detalle"/>} />
                <Route path="/mascota-editar/:id"  element={<MascotaDetalle tipo="editar"/>} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default Ruteador