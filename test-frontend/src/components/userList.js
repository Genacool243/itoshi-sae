import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [modifyUserId, setModifyUserId] = useState('');
  const [selectedUserDetails, setSelectedUserDetails] = useState({});
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen===true) {
      window.location.reload(false);
    }
    console.log(isModalOpen);
  };

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/tbl_usuarios/${userId}`);
      const data = await response.json();
      if (data && data.length > 0) {
        setSelectedUserDetails(data[0]); // Access the first element of the array
        console.log(data[0]);
      } else {
        console.error('No user details found for the given user ID');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleModificar = async () => {
    const data = {
      dni: document.querySelector("#dni-modificar").value,
      nombre: document.querySelector("#nombre-modificar").value,
      apellido: document.querySelector("#apellido-modificar").value,
      password: document.querySelector("#password-modificar").value
    };
    console.log(data);

    try {
      const response = await fetch(`http://localhost:5000/tbl_usuarios/${modifyUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      setModalMessage(result.message);
      toggleModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const cargarUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:5000/tbl_usuarios');
      const data = await response.json();

      let formattedData = [];
      if (data && data.data) {
        const usuarios = data.data;
        formattedData = usuarios.map((usuario) => {
          let tipoUsuario = '';
          if (usuario.tipo_usuario === 0) {
            tipoUsuario = 'Empleado';
          } else if (usuario.tipo_usuario === 1) {
            tipoUsuario = 'Jefe';
          }
          return {
            id_usuario: usuario.id_usuario,
            dni: usuario.dni,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            tipo_usuario: tipoUsuario,
          };
        });
      }

      setUsuarios(formattedData);
    } catch (error) {
      console.error('Error fetching usuarios:', error);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleIngresar = async () => {
    const data = {
      dni: document.querySelector("#dni-ingresar").value,
      nombre: document.querySelector("#nombre-ingresar").value,
      apellido: document.querySelector("#apellido-ingresar").value,
      password: document.querySelector("#password-ingresar").value
    };

    try {
      const response = await fetch('http://localhost:5000/tbl_usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      setModalMessage(result.message);
      toggleModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEliminar = async () => {
    try {
      const response = await fetch(`http://localhost:5000/tbl_usuarios/${selectedUserId}`, {
        method: 'DELETE'
      });

      const result = await response.json();
      setModalMessage(result.message);
      toggleModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="dashboardHeaderContainer">
        <h2>Usuarios</h2>
        <h5>Usuarios / Dashboard</h5>
      </div>
      <div className="dashboardRowContainer">
        <div className="dashboard100Container">
          <div className="dashboardUsersContainer">
            <div className="dashboardUsersContainerHeader">
              <p>ID Usuario</p>
              <p>DNI</p>
              <p>Nombre</p>
              <p>Apellido</p>
              <p>Tipo de Usuario</p>
            </div>
            {usuarios.map((usuario, index) => (
              <div key={index} className="dashboardUsersContainerBody">
                <p>{usuario.id_usuario}</p>
                <p>{usuario.dni}</p>
                <p>{usuario.nombre}</p>
                <p>{usuario.apellido}</p>
                <p>{usuario.tipo_usuario}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
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
                <p>ID Usuario</p>
                <select id="select" onChange={(e) => { fetchUserDetails(e.target.value); setModifyUserId(e.target.value);} }>
                  <option value="">Seleccione un usuario</option>
                  {usuarios.map((usuario, index) => (
                    <option key={index} value={usuario.id_usuario}>
                      {usuario.id_usuario}
                    </option>
                  ))}
                </select>
              </div>
              <div className="dashboardIngresoInputContainer">
                <p>DNI</p>
                <input
                  type="text"
                  value={selectedUserDetails.dni || ''}
                  onChange={(e) => setSelectedUserDetails({ ...selectedUserDetails, dni: e.target.value })}
                  id="dni-modificar"
                  className="dni-input"
                />
              </div>
              <div className="dashboardIngresoInputContainer">
                <p>Nombre</p>
                <input
                  type="text"
                  value={selectedUserDetails.nombre || ''}
                  onChange={(e) => setSelectedUserDetails({ ...selectedUserDetails, nombre: e.target.value })}
                  id="nombre-modificar"
                  className="nombre-input"
                />
              </div>
              <div className="dashboardIngresoInputContainer">
                <p>Apellido</p>
                <input
                  type="text"
                  value={selectedUserDetails.apellido || ''}
                  onChange={(e) => setSelectedUserDetails({ ...selectedUserDetails, apellido: e.target.value })}
                  id="apellido-modificar"
                  className="apellido-input"
                />
              </div>
              <div className="dashboardIngresoInputContainer">
                <p>Contraseña</p>
                <input
                  type="text"
                  value={selectedUserDetails.password || ''}
                  onChange={(e) => setSelectedUserDetails({ ...selectedUserDetails, password: e.target.value })}
                  id="password-modificar"
                  className="password-input"
                />
              </div>
            </div>
            <button className="dashboardIngresoButton" onClick={handleModificar}>
              MODIFICAR
            </button>
          </div>
          <div className="dashboard50Container">
            <h3>Eliminar usuarios</h3>
            <div className="dashboardIngresosInputsContainer">
              <div className="dashboardIngresoInputContainer">
                <p>ID Usuario</p>
                <select id="select" onChange={(e) => setSelectedUserId(e.target.value)}>
                  <option value="">Seleccione un usuario</option>
                  {usuarios.map((usuario, index) => (
                    <option key={index} value={usuario.id_usuario}>
                      {usuario.id_usuario}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button className="dashboardIngresoButton" onClick={handleEliminar}>
              ELIMINAR
            </button>
          </div>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>&times;</span>
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
