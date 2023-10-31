import React from 'react';

const UserManagementComponent = () => {
    const handleIngresar = async () => {
        const data = {
            dni: document.querySelector("#dni-ingresar").value,
            nombre: document.querySelector("#nombre-ingresar").value,
            apellido: document.querySelector("#apellido-ingresar").value,
            password: document.querySelector("#password-ingresar").value
        };

        const response = await fetch('http://localhost:5000/tbl_usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(result);
    };

    const handleModificar = async () => {
        const data = {
            dni: document.querySelector("#dni-modificar").value,
            // Add other fields accordingly
        };

        const response = await fetch(`http://localhost:5000/tbl_usuarios/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(result);
    };

    const handleEliminar = async () => {
        const response = await fetch(`http://localhost:5000/tbl_usuarios/${userId}`, {
            method: 'DELETE'
        });

        const result = await response.json();
        console.log(result);
    };

    return (
        <div>
            <div className="dashboardRowContainer">
                <div className="dashboard100Container">
                    <h3>Ingresar usuarios</h3>
                    <div className="dashboardIngresosInputsContainer">
                        <div className="dashboardIngresoInputContainer">
                            <p>DNI</p><input type="text" id="dni-ingresar" className="dni-input" />
                        </div>
                        <div className="dashboardIngresoInputContainer">
                            <p>Nombre</p><input type="text" id="nombre-ingresar" className="nombre-input" />
                        </div>
                        <div className="dashboardIngresoInputContainer">
                            <p>Apellido</p><input type="text" id="apellido-ingresar" className="apellido-input" />
                        </div>
                        <div className="dashboardIngresoInputContainer">
                            <p>Contraseña</p><input type="text" id="password-ingresar" className="password-input" />
                        </div>
                    </div>
                    <button className="dashboardIngresoButton" onClick={handleIngresar}>INGRESAR</button>
                </div>
            </div>
            <div className="dashboardRowContainer">
                <div className="dashboard50Container">
                    <h3>Modificar usuarios</h3>
                    <div className="dashboardIngresosInputsContainer">
                        <div className="dashboardIngresoInputContainer">
                            <p>DNI</p><input type="text" />
                        </div>
                        <div className="dashboardIngresoInputContainer">
                            <p>Campo a modificar</p>
                            <select id="select">
                                <option value="0" selected>Nombre</option>
                                <option value="1">Apellido</option>
                                <option value="2">Contraseña</option>
                            </select>
                        </div>
                        <div className="dashboardIngresoInputContainer">
                            <p>Nuevo valor</p><input type="text" />
                        </div>
                    </div>
                    <button className="dashboardIngresoButton" onClick={handleModificar}>MODIFICAR</button>
                </div>
                <div className="dashboard50Container">
                    <h3>Eliminar usuarios</h3>
                    <div className="dashboardIngresosInputsContainer">
                        <div className="dashboardIngresoInputContainer">
                            <p>DNI</p><input type="text" />
                        </div>
                    </div>
                    <button className="dashboardIngresoButton" onClick={handleEliminar}>ELIMINAR</button>
                </div>
            </div>
        </div>
    );
};

export default UserManagementComponent;
