# Sistema de Administración de Estacionamientos

# Índice

## Introduccion

1. [Introduccíon](#introduccíon)

## Funcionalidades del Usuario

1. [Acceso al Sistema](#acceso-al-sistema-usuario)
2. [Consulta de Autos en Playa](#consulta-de-autos-en-playa)
3. [Ingresos y Egresos de Autos por Hora](#ingresos-y-egresos-de-autos-por-hora)
4. [Ingresos y Egresos de Autos por Estadia](#ingresos-y-egresos-de-autos-por-estadia)
5. [Retiros de Dinero](#retiros-de-dinero)
6. [Cierre de Caja](#cierre-de-caja)

## Funcionalidades Exclusivas del Administrador

1. [Acceso al Sistema](#acceso-al-sistema-admin)
2. [Gestión de Usuarios](#gestión-de-usuarios)
3. [Retiros de Dinero](#retiros-de-dinero)
4. [Historial de Acciones](#historial-de-acciones)
5. [Ciclos y Horarios](#ciclos-y-horarios)
6. [Precios y Promociones](#precios-y-promociones)


## Introducción

Itoshi SAE (Sistema de Administración de Estacionamientos) es un proyecto web que tiene el objetivo de funcionar como herramienta administrativa para playas de estacionamiento.
Nacido de la necesidad de optimizar la administración de la playa de estacionamiento familiar del integrante Santiago Ramallo, la cual al funcionar en papel tenia fallos de tiempo y errores que complicaban el trabajo.
Con este proyecto se busca solucionar los problemas que traía el papel y reducir todas las acciones a un mismo sistema digital.

## Funcionalidades del Usuario

### Acceso al Sistema Usuario

El usuario al iniciar debe revisar el subtotal de la caja y comprobar que este todo en orden. Una vez revisado el usuario ingresa su contraseña y arranca su turno de trabajo.

### Consulta de Autos en Playa

Para consultar los autos en playa esta el mapa dinamico que permite ver los espacios reservados y que auto ocupa cada lugar. Al clickear un espacio reservado se puede ver la informacion de la reserva a detalle.

### Ingresos y Egresos de Autos por Hora

#### Ingreso
  1. Ingresa los 3 numeros de la patente
  2. Le da a ingresar
  3. El auto queda registrado y se genera un ticket
     
#### Egreso
  1. Ingresa los 3 numeros de la patente
  2. Le da a egresar
  3. Se realiza el cobro
     
### Ingresos y Egresos de Autos por Estadía

#### Ingreso
  1. Ingresa los datos del auto
  2. Ingresa la cantidad de dias
  3. Ingresa el tipo de precio (Normal, hotel, etc.)
  4. Le da a ingresar
  5. Se realiza el cobro
  6. El auto queda registrado y se genera un ticket
     
#### Egreso
  1. Selecciona el auto que ya se fue al terminar su estadia
  2. Le da a egresar
  3. El auto finaliza su estadia

### Retiros de Dinero

1. Ingresa a la seccion de retiros
2. Ingresa el monto a retirar que este disponible en caja
3. Espera a la autorizacion del admin para que se registre el retiro en el sistema

### Cierre de Caja

Al final del turno, realiza un cierre de caja:
1. Ingresa a la seccion de cierre de caja
2. El empleado que viene despues verifica la caja
3. Una vez verificada ingresa su contraseña e inicia su turno

## Funcionalidades Exclusivas del Administrador

### Acceso al Sistema (Admin)

Los administradores pueden iniciar sesión de la misma manera que los usuarios.

### Gestión de Usuarios

Los administradores pueden agregar, modificar y eliminar usuarios:
1. Accede al sistema como administrador.
2. Selecciona "Gestión de Usuarios".
3. Realiza las acciones necesarias para administrar usuarios.

### Retiros de Dinero (Admin)

Los administradores pueden autorizar retiros de dinero:
1. Accede al sistema como administrador.
2. Selecciona "Retiros de Dinero".
3. Confirma las transacciones de retiro autorizadas.

### Historial de Acciones

Los administradores pueden ver el historial de acciones realizadas en el sistema:
1. Inicia sesión como administrador.
2. Selecciona "Historial de Acciones".
3. Visualiza un registro de todas las acciones realizadas por usuarios y administradores.

### Ciclos y Horarios

Los administradores pueden gestionar los ciclos y horarios de acceso:
1. Accede al sistema como administrador.
2. Selecciona "Ciclos y Horarios".
3. Configura los ciclos y horarios de acceso para los usuarios.

### Precios y Promociones

Los administradores pueden definir precios y promociones especiales:
1. Inicia sesión como administrador.
2. Selecciona "Precios y Promociones".
3. Configura los precios y promociones vigentes.


