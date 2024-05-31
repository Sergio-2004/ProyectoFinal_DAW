-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-05-2024 a las 02:16:28
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
-- Base de datos: `betanet`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL,
  `post_id` int(5) NOT NULL,
  `content` varchar(50) NOT NULL,
  `date` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`id`, `user_id`, `post_id`, `content`, `date`) VALUES
(10, 1, 59, 'Comentario de prueba', '2024-05-30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `data_index`
--

CREATE TABLE `data_index` (
  `id` int(5) NOT NULL,
  `name` varchar(20) NOT NULL,
  `game_id` int(5) NOT NULL,
  `table_name` varchar(26) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `data_index`
--

INSERT INTO `data_index` (`id`, `name`, `game_id`, `table_name`) VALUES
(24, 'highScore', 35, 'highScore-35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `forums`
--

CREATE TABLE `forums` (
  `id` int(5) NOT NULL,
  `name` text NOT NULL,
  `description` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `forums`
--

INSERT INTO `forums` (`id`, `name`, `description`) VALUES
(43, 'Foro de prueba', 'aaa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `games`
--

CREATE TABLE `games` (
  `id` int(5) NOT NULL,
  `name` varchar(20) NOT NULL,
  `creator_id` int(5) DEFAULT NULL,
  `description` varchar(300) NOT NULL,
  `genres` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `games`
--

INSERT INTO `games` (`id`, `name`, `creator_id`, `description`, `genres`) VALUES
(1, 'Vision', 1, 'Un juego de acción en el espacio donde pilotas una nave espacial y debes enfrentarte a hordas de alienígenas hostiles mientras exploras diferentes sistemas estelares en busca de la verdad detrás de una antigua profecía galáctica.', 'horror'),
(2, 'Cadenas', 1, 'Un juego de rompecabezas adictivo donde debes organizar bloques de colores para formar líneas y hacerlos desaparecer antes de que la pantalla se llene. ¡Desafía tu mente y tu habilidad con este juego lleno de diversión!', 'horror'),
(3, 'Shoot', 1, 'Embárcate en una emocionante aventura controlando a una serpiente mágica que crece cada vez que come gemas brillantes. Explora mundos fantásticos y descubre secretos antiguos mientras te deslizas sinuosamente por paisajes exóticos.', 'action,horror'),
(4, 'Neon', 2, 'Un juego de plataformas trepidante donde saltas y corres a través de niveles desafiantes llenos de trampas mortales. Domina habilidades acrobáticas y desafía los límites de la gravedad en este emocionante viaje lleno de acción.', 'action'),
(5, 'Don\'t lie', 2, 'Únete a una emocionante carrera de autos por las bulliciosas calles de la ciudad, esquivando el tráfico y compitiendo contra otros pilotos. Personaliza tu vehículo y demuestra tus habilidades de conducción en este trepidante juego de carreras urbano.', 'horror'),
(35, 'Galaxy Defiance', 1, '¡Prueba a este apasionante juego de aventuras espaciales! Inspirado en los Space Invaders y Galaga, junta los géneros del bullet hell con los clásicos juegos de \"marcianitos\".\n(DESCARGABLE)', 'action');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `highscore-35-24`
--

CREATE TABLE `highscore-35-24` (
  `id` int(5) NOT NULL,
  `player_id` int(5) NOT NULL,
  `recorded_date` date NOT NULL,
  `value` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `highscore-35-24`
--

INSERT INTO `highscore-35-24` (`id`, `player_id`, `recorded_date`, `value`) VALUES
(1, 1, '2024-05-27', '130'),
(2, 2, '2024-05-27', '40'),
(3, 3, '2024-05-27', '30'),
(4, 4, '2024-05-28', '60'),
(5, 5, '2024-05-28', '55'),
(6, 6, '2024-05-16', '5'),
(7, 7, '2024-05-15', '350');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libraries`
--

CREATE TABLE `libraries` (
  `id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL,
  `game_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `libraries`
--

INSERT INTO `libraries` (`id`, `user_id`, `game_id`) VALUES
(4, 2, 2),
(5, 2, 4),
(6, 2, 5),
(7, 3, 6),
(8, 3, 7),
(9, 3, 8),
(10, 4, 9),
(11, 4, 10),
(12, 4, 11),
(13, 5, 12),
(14, 5, 1),
(15, 5, 2),
(36, 1, 35),
(37, 1, 1),
(38, 1, 36),
(39, 1, 38),
(40, 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

CREATE TABLE `posts` (
  `id` int(5) NOT NULL,
  `title` varchar(90) NOT NULL,
  `content` varchar(300) NOT NULL,
  `forum_id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL,
  `date` varchar(20) NOT NULL,
  `has_image` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `forum_id`, `user_id`, `date`, `has_image`) VALUES
(59, 'Post de prueba', 'aaa', 43, 1, '2024-05-30', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profiles`
--

CREATE TABLE `profiles` (
  `id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL,
  `description` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profiles`
--

INSERT INTO `profiles` (`id`, `user_id`, `description`) VALUES
(1, 1, 'Hola buenas tardes'),
(2, 2, NULL),
(3, 3, NULL),
(4, 4, NULL),
(5, 5, NULL),
(6, 6, NULL),
(7, 7, NULL),
(8, 8, NULL),
(9, 9, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(5) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(20) NOT NULL,
  `is_admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `is_admin`) VALUES
(1, 'Sergio', '1234', 1),
(2, 'john_doe', 'pass123', 0),
(3, 'alice_smith', 'securepw', 0),
(4, 'mike_jackson', 'mysecret', 0),
(5, 'sarah_brown', 'letmein', 0),
(6, 'david_wilson', 'p@ssw0rd', 0),
(7, 'emily_clark', 'sunshine', 0),
(8, 'chris_taylor', 'qwerty', 0),
(9, 'laura_miller', 'ilovecats', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `data_index`
--
ALTER TABLE `data_index`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `table_name` (`table_name`);

--
-- Indices de la tabla `forums`
--
ALTER TABLE `forums`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`) USING HASH;

--
-- Indices de la tabla `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `UC_name` (`name`);

--
-- Indices de la tabla `highscore-35-24`
--
ALTER TABLE `highscore-35-24`
  ADD PRIMARY KEY (`player_id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `libraries`
--
ALTER TABLE `libraries`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `title` (`title`);

--
-- Indices de la tabla `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `unique_user_id` (`user_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_username` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `data_index`
--
ALTER TABLE `data_index`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `forums`
--
ALTER TABLE `forums`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `games`
--
ALTER TABLE `games`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `highscore-35-24`
--
ALTER TABLE `highscore-35-24`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `libraries`
--
ALTER TABLE `libraries`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT de la tabla `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
