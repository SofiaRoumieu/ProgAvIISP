import React,{ useEffect,useState } from 'react';

const INITIAL_VALUES = {
    id: null,
    nombre: "",
    edad: "",
    tipo: "",
    vacunado: false,
    observaciones: ""
};

const Form = ({ mascotaU, agregarMascota, modificarMascota }) => {

    const [form, setForm] = useState(INITIAL_VALUES);
    const { id, nombre, edad, tipo, vacunado, observaciones } = form;
    const [tipos, setTipos] = useState([{id:1, descripcion:"Perro"}, {id:2, descripcion:"Gato"}, {id:3, descripcion:"Conejo"}, {id:4, descripcion:"Tortuga"}]);

    useEffect(() => {
        if (mascotaU)
            setForm(mascotaU)
    }, [mascotaU])

    const handleReset = () => {
        setForm(INITIAL_VALUES);
    };

    const handleChange = (e) => {
        setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Enviando...");

        agregarMascota(form);
        
        handleReset();
    }


    return (
        <form onSubmit={handleSubmit} >
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
                <button type="submit" className="btn btn-primary mb-3"> Enviar </button>
                <button type="reset" className="btn btn-secondary mb-3" onClick={handleReset} > Limpiar </button>
            </div>

        </form>
    );
}

export default Form;