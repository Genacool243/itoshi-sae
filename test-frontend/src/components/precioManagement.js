import React, { useEffect, useState } from 'react';

const PrecioManagement = () => {
  const [precios, setPrecios] = useState([]);
  const [selectedPrecioId, setSelectedPrecioId] = useState('');
  const [modifyPrecioId, setModifyPrecioId] = useState('');
  const [selectedPrecioDetails, setSelectedPrecioDetails] = useState({});
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

      let formattedData = [];
      if (data && data.data) {
        const precios = data.data;
        formattedData = precios.map((precio) => {
          return {
            id_precio: precio.id_precio,
            nombre_precio: precio.nombre_precio,
            valor_precio: precio.valor_precio,
            tipo_precio: precio.tipo_precio,
          };
        });
      }

      setPrecios(formattedData);
    } catch (error) {
      console.error('Error fetching precios:', error);
    }
  };

  const fetchPrecioDetails = async (precioId) => {
    try {
      const response = await fetch(`http://localhost:5000/tbl_precios/${precioId}`);
      const data = await response.json();
      if (data && data.length > 0) {
        setSelectedPrecioDetails(data[0]); // Access the first element of the array
        console.log(data[0]);
      } else {
        console.error('No price details found for the given price ID');
      }
    } catch (error) {
      console.error('Error fetching price details:', error);
    }
  };
  
  

  const handleIngresarPrecio = async () => {
    const data = {
      nombre_precio: document.querySelector("#nombre-ingresar").value,
      valor_precio: document.querySelector("#valor-ingresar").value,
      tipo_precio: "promocion",
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
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleModificarPrecio = async () => {
    const data = {
      nombre_precio: document.querySelector("#nombre-modificar").value,
      valor_precio: document.querySelector("#valor-modificar").value,
    };
    console.log(data);

    try {
      const response = await fetch(`http://localhost:5000/tbl_precios/${modifyPrecioId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setModalMessage(result.message);
      toggleModal();
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
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {

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
            {precios.map((precio, index) => (
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
          </div>
          <button className="dashboardIngresoButton" onClick={handleIngresarPrecio}>INGRESAR</button>
        </div>
      </div>
      <div className="dashboardRowContainer">
        <div className="dashboard50Container">
          <h3>Modificar precios</h3>
          <div className="dashboardIngresosInputsContainer">
            <div className="dashboardIngresoInputContainer">
              <p>ID de precio a modificar</p>
              <select
                id="id-modificar"
                onChange={(e) => { fetchPrecioDetails(e.target.value);setModifyPrecioId(e.target.value)} }
              >
                <option value="">Seleccione un precio</option>
                {precios.map((precio, index) => (
                  <option key={index} value={precio.id_precio}>
                    {precio.id_precio}
                  </option>
                ))}
              </select>
            </div>
            <div className="dashboardIngresoInputContainer">
              <p>Nombre</p>
              <input
                type="text"
                id="nombre-modificar"
                className="nombre-input"
              />
            </div>
            <div className="dashboardIngresoInputContainer">
              <p>Valor</p>
              <input
                type="text"
                id="valor-modificar"
                className="valor-input"
              />
            </div>
          </div>
          <button className="dashboardIngresoButton" onClick={handleModificarPrecio}>
            MODIFICAR
          </button>
        </div>;
        <div className="dashboard50Container">
          <h3>Eliminar precios</h3>
          <div className="dashboardIngresosInputsContainer">
          <div className="dashboardIngresoInputContainer">
                <p>ID Precio</p>
                <select id="select" onChange={(e) => setSelectedPrecioId(e.target.value)}>
                  <option value="">Seleccione un precio</option>
                  {precios.map((precio, index) => (
                    <option key={index} value={precio.id_precio}>
                      {precio.id_precio}
                    </option>
                  ))}
                </select>
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
