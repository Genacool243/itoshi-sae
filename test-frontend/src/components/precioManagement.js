import React, { useEffect, useState } from 'react';

const PrecioManagement = () => {
  const [precios, setPrecios] = useState([]);
  const [selectedPrecioId, setSelectedPrecioId] = useState('');
  const [modifyPrecioId, setModifyPrecioId] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) {
      window.location.reload(false);
    }
  };

  const fetchPrecios = async () => {
    try {
      const response = await fetch('http://localhost:5000/tbl_precios');
      const data = await response.json();
      setPrecios(data);
    } catch (error) {
      console.error('Error fetching precios:', error);
    }
  };

  const handleIngresarPrecio = async () => {
    const data = {
      nombre_precio: document.querySelector("#nombre-ingresar").value,
      valor_precio: document.querySelector("#valor-ingresar").value,
      tipo_precio: document.querySelector("#tipo-ingresar").value,
    };

    try {
      const response = await fetch('http://localhost:5000/tbl_precios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      setModalMessage(result.message);
      toggleModal();
      fetchPrecios();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleModificarPrecio = async () => {
    const data = {
      nombre_precio: document.querySelector("#nombre-modificar").value,
      valor_precio: document.querySelector("#valor-modificar").value,
      tipo_precio: document.querySelector("#tipo-modificar").value,
    };
    console.log(data);
  
    try {
      const response = await fetch(`http://localhost:5000/tbl_precios/${modifyPrecioId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const result = await response.json();
      setModalMessage(result.message);
      toggleModal();
      fetchPrecios();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleEliminarPrecio = async () => {
    try {
      const response = await fetch(`http://localhost:5000/tbl_precios/${selectedPrecioId}`, {
        method: 'DELETE'
      });
  
      const result = await response.json();
      setModalMessage(result.message);
      toggleModal();
      fetchPrecios();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  useEffect(() => {
    const fetchPrecios = async () => {
      try {
        const response = await fetch('http://localhost:5000/tbl_precios');
        const data = await response.json();
        console.log(data); // Check the structure of the received data
        setPrecios(data); // Assuming `setPrecios` is the function to set the precios state
      } catch (error) {
        console.error('Error fetching precios:', error);
      }
    };
  
    fetchPrecios();
  }, []);

  return (
    <div>
      <div className="dashboardHeaderContainer">
        <h2>Precios</h2>
        <h5>Precios / Dashboard</h5>
      </div>
      <div className="dashboardRowContainer">
        <div className="dashboard100Container">
          <div className="dashboardPreciosContainer">
            <div className="dashboardPreciosContainerHeader">
              <p>Id</p>
              <p>Nombre</p>
              <p>Valor</p>
              <p>Tipo</p>
            </div>
            {precios.data.map((precio, index) => (
              <div key={index} className="dashboardPreciosContainerBody">
                <p>{precio.id_precio}</p>
                <p>{precio.nombre_precio}</p>
                <p>{precio.valor_precio}</p>
                <p>{precio.tipo_precio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="dashboardRowContainer">
        <div className="dashboard100Container">
          <h3>Ingresar promociones</h3>
          <div className="dashboardIngresosInputsContainer">
            <div className="dashboardIngresoInputContainer">
              <p>Nombre</p><input type="text" id="nombre-ingresar" />
            </div>
            <div className="dashboardIngresoInputContainer">
              <p>Valor</p><input type="text" id="valor-ingresar" />
            </div>
            <div className="dashboardIngresoInputContainer">
              <p>Tipo</p><input type="text" id="tipo-ingresar" />
            </div>
          </div>
          <button className="dashboardIngresoButton" onClick={handleIngresarPrecio}>INGRESAR</button>
        </div>
      </div>
      <div className="dashboardRowContainer">
        <div className="dashboard50Container">
          <h3>Modificar precios</h3>
          <div className="dashboardIngresosInputsContainer">
            <div className="dashboardIngresoInputContainer">
              <p>Id de precio a modificar</p><input type="text" id="id-modificar" />
            </div>
            <div className="dashboardIngresoInputContainer">
              <p>Nuevo valor</p><input type="text" id="valor-modificar" />
            </div>
          </div>
          <button className="dashboardIngresoButton" onClick={handleModificarPrecio}>MODIFICAR</button>
        </div>
        <div className="dashboard50Container">
          <h3>Eliminar precios</h3>
          <div className="dashboardIngresosInputsContainer">
            <div className="dashboardIngresoInputContainer">
              <p>Id de precio a eliminar</p><input type="text" id="id-eliminar" />
            </div>
          </div>
          <button className="dashboardIngresoButton" onClick={handleEliminarPrecio}>ELIMINAR</button>
        </div>
      </div>
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

export default PrecioManagement;
