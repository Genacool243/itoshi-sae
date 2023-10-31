-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-10-2023 a las 14:31:50
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `itoshisae`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_autos`
--

CREATE TABLE `tbl_autos` (
  `id_auto` int(11) NOT NULL,
  `tipo_ingreso` varchar(255) DEFAULT NULL,
  `patente` varchar(255) DEFAULT NULL,
  `espacio` varchar(255) DEFAULT NULL,
  `modelo` varchar(255) DEFAULT NULL,
  `dias_estadia` int(11) DEFAULT NULL,
  `hotel` varchar(255) DEFAULT NULL,
  `clase` int(11) DEFAULT NULL,
  `id_precio` int(11) DEFAULT NULL,
  `seña` int(11) DEFAULT NULL,
  `hora_ingreso` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `tbl_autos`
--

INSERT INTO `tbl_autos` (`id_auto`, `tipo_ingreso`, `patente`, `espacio`, `modelo`, `dias_estadia`, `hotel`, `clase`, `id_precio`, `seña`, `hora_ingreso`) VALUES
(2, 'estadia', '540', '9b', 'Nissan March', 3, 'Demper', 3, NULL, 2500, '2023-10-24 23:03:20'),
(3, 'hora', '981', '9c', 'Renault Clio', NULL, NULL, 1, NULL, NULL, '2023-10-24 23:03:21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_cajas`
--

CREATE TABLE `tbl_cajas` (
  `id_caja` int(11) NOT NULL,
  `fecha_caja` date NOT NULL,
  `ingreso_hora_ef` int(11) NOT NULL,
  `ingreso_hora_dig` int(11) NOT NULL,
  `ingreso_estadia_ef` int(11) NOT NULL,
  `ingreso_estadia_dig` int(11) NOT NULL,
  `retiros` int(11) NOT NULL,
  `gastos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_cajas_mov`
--

CREATE TABLE `tbl_cajas_mov` (
  `id_mov` int(11) NOT NULL,
  `tipo_mov` varchar(255) NOT NULL,
  `id_caja` int(11) NOT NULL,
  `fecha_mov` date NOT NULL,
  `hora_mov` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_horarios`
--

CREATE TABLE `tbl_horarios` (
  `id_horario` int(11) NOT NULL,
  `dni` int(11) NOT NULL,
  `tipo_horario` int(11) NOT NULL,
  `inicio_horario` time NOT NULL,
  `final_horario` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_precios`
--

CREATE TABLE `tbl_precios` (
  `id_precio` int(11) NOT NULL,
  `nombre_precio` varchar(255) NOT NULL,
  `valor_precio` int(11) NOT NULL,
  `tipo_precio` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `tbl_precios`
--

INSERT INTO `tbl_precios` (`id_precio`, `nombre_precio`, `valor_precio`, `tipo_precio`) VALUES
(1, 'Hora', 700, 'base'),
(2, 'Estadía', 3500, 'base'),
(3, 'Promoción 1', 400, 'promocion'),
(4, 'Promo Estadía', 2200, 'promocion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_registros`
--

CREATE TABLE `tbl_registros` (
  `id_registro` int(11) NOT NULL,
  `hora_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `dni` int(11) NOT NULL,
  `texto_registro` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_usuarios`
--

CREATE TABLE `tbl_usuarios` (
  `id_usuario` int(11) NOT NULL,
  `dni` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `tipo_usuario` int(11) NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `tbl_usuarios`
--

INSERT INTO `tbl_usuarios` (`id_usuario`, `dni`, `password`, `nombre`, `apellido`, `tipo_usuario`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(3, 100100, '000000000', 'Admin', 'Users', 1, '2023-10-17 00:25:29', '2023-10-19 20:13:36'),
(6, 40111222, 'emplepass', 'Empleado', 'Apellido', 0, '2023-10-19 20:23:52', '2023-10-19 20:23:52'),
(7, 42333444, 'lolmmm', 'Trabajador', 'Noche', 0, '2023-10-24 18:48:24', '2023-10-24 18:48:24');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbl_autos`
--
ALTER TABLE `tbl_autos`
  ADD PRIMARY KEY (`id_auto`);

--
-- Indices de la tabla `tbl_cajas`
--
ALTER TABLE `tbl_cajas`
  ADD PRIMARY KEY (`id_caja`);

--
-- Indices de la tabla `tbl_cajas_mov`
--
ALTER TABLE `tbl_cajas_mov`
  ADD PRIMARY KEY (`id_mov`);

--
-- Indices de la tabla `tbl_horarios`
--
ALTER TABLE `tbl_horarios`
  ADD PRIMARY KEY (`id_horario`),
  ADD UNIQUE KEY `dni` (`dni`);

--
-- Indices de la tabla `tbl_precios`
--
ALTER TABLE `tbl_precios`
  ADD PRIMARY KEY (`id_precio`);

--
-- Indices de la tabla `tbl_registros`
--
ALTER TABLE `tbl_registros`
  ADD PRIMARY KEY (`id_registro`);

--
-- Indices de la tabla `tbl_usuarios`
--
ALTER TABLE `tbl_usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `dni` (`dni`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbl_autos`
--
ALTER TABLE `tbl_autos`
  MODIFY `id_auto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tbl_cajas_mov`
--
ALTER TABLE `tbl_cajas_mov`
  MODIFY `id_mov` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbl_horarios`
--
ALTER TABLE `tbl_horarios`
  MODIFY `id_horario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbl_precios`
--
ALTER TABLE `tbl_precios`
  MODIFY `id_precio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tbl_registros`
--
ALTER TABLE `tbl_registros`
  MODIFY `id_registro` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbl_usuarios`
--
ALTER TABLE `tbl_usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
