import React, { useEffect, useState } from 'react';

const AutoDashboard = () => {
    const [espacios, setEspacios] = useState([]);

    useEffect(() => {
        cargarEspacios();
    }, []);

    function cargarEspacios() {
        fetch('/tbl_autos')
            .then(response => response.json())
            .then(data => {
                const mappedEspacios = data.map(auto => ({
                    id: auto.id,
                    nombre: auto.espacio,
                    tipo_ingreso: auto.tipo_ingreso,
                    patente: auto.patente,
                    modelo: auto.modelo,
                    dias_estadia: auto.dias_estadia,
                    hotel: auto.hotel,
                    clase: auto.clase,
                    seña: auto.seña,
                    hora_ingreso: auto.hora_ingreso
                }));
                setEspacios(mappedEspacios);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {
        for (let i = 0; i < 38; i++) {
            if (espacios[i].patente == "NULL") {
                document.querySelector(".dashboardSlotsContainer").children[0].innerHTML += '<div class="dashboardColumnSlots" id="' + espacios[i].nombre + '"><button class="dashboardCarButton" onclick="buscarAuto(this)"><p>' + espacios[i].nombre + '</p></button></div>';
            } else {
                document.querySelector(".dashboardSlotsContainer").children[0].innerHTML += '<div class="dashboardColumnSlots" id="' + espacios[i].nombre + '"><button class="dashboardCarButton" onclick="buscarAuto(this)"><p>' + espacios[i].nombre + '</p><img src="img/site/auto.png" alt="" class="autoImage"></button><p>' + espacios[i].patente + '</p></div>';
            }
        }

        for (let i = 97; i > 69; i = i - 1) {
            if (espacios[i].patente == "NULL") {
                document.querySelector(".dashboardSlotsContainer").children[1].innerHTML += '<div class="dashboardColumnSlots" id="' + espacios[i].nombre + '"><button class="dashboardCarButton" onclick="buscarAuto(this)"><p>' + espacios[i].nombre + '</p></button></div>';
            } else {
                document.querySelector(".dashboardSlotsContainer").children[1].innerHTML += '<div class="dashboardColumnSlots" id="' + espacios[i].nombre + '"><button class="dashboardCarButton" onclick="buscarAuto(this)"><p>' + espacios[i].nombre + '</p><img src="img/site/auto.png" alt="" class="autoImage"></button><p>' + espacios[i].patente + '</p></div>';
            }
        }

        for (let i = 69; i > 37; i = i - 1) {
            if (espacios[i].patente == "NULL") {
                document.querySelector(".dashboardSlotsContainer").children[2].innerHTML += '<div class="dashboardColumnSlots" id="' + espacios[i].nombre + '"><button class="dashboardCarButton" onclick="buscarAuto(this)"><p>' + espacios[i].nombre + '</p></button></div>';
            } else {
                document.querySelector(".dashboardSlotsContainer").children[2].innerHTML += '<div class="dashboardColumnSlots" id="' + espacios[i].nombre + '"><button class="dashboardCarButton" onclick="buscarAuto(this)"><p>' + espacios[i].nombre + '</p><img src="img/site/auto.png" alt="" class="autoImage"></button><p>' + espacios[i].patente + '</p></div>';
            }
        }

        for (let i = 0; i < 98; i++) {
            if (espacios[i].patente != "NULL") {
                document.querySelector(".dashboardSlotsContainerResponsive").innerHTML += '<button onclick="buscarAutoResponsive(this)"><p>' + espacios[i].nombre + '</p><p>' + espacios[i].patente + '</p></button>';
            }
        }

        cargarEspacios();
    }, [espacios]);

    return (
        <div>
            <div className="dashboardHeaderContainer">
                <h2>Dashboard</h2>
                <h5>Inicio / Dashboard</h5>
            </div>
            <div className="dashboardRowContainer">
                <div className="dashboard25Container">
                    <div className="userImageContainerContent"><img src="img/users/fotoUsuarioPrueba1.png" alt="Users profile picture" className="userImgContent" /></div>
                    <p>Empleado 1</p>
                </div>
                <div className="dashboard75Container">
                    <div className="dashboardSlotsContainer">
                        <div className="dashboardRowSlots"></div>
                        <div className="dashboardRowSlots"></div>
                        <div className="dashboardRowSlots"></div>
                    </div>
                    <div className="dashboardSlotsContainerResponsive">
                        <div>
                            <p>Espacio</p>
                            <p>Patente</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dashboardRowContainer">
                <div className="dashboard100Container">
                    <div className="dashboardRowContainer">
                        <img src="img/site/autoCompleto.png" alt="" className="autoFull" />
                        <div className="searchCarResults">
                            <p>Haga click en un auto para obtener su información</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AutoDashboard;