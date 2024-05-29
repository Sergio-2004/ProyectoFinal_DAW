-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-05-2024 a las 00:28:41
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
(8, 1, 58, 'aa', ''),
(9, 1, 58, 'a', '');

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
(1, 'Galaxia Estelar', '¡Bienvenido a la galaxia!'),
(2, 'Bloques Locos', 'Rompecabezas divertido'),
(3, 'Aventura Serpentina', 'Controla la serpiente'),
(4, 'Salto Extremo', 'Corre y salta'),
(5, 'Carrera en la Ciudad', 'Velocidad en la ciudad'),
(6, 'Saltarín Comecocos', 'Comecocos saltarín'),
(7, 'Aventuras en la Jungla', 'Explora la jungla'),
(8, 'Escape del Laberinto', 'Sal del laberinto'),
(9, 'Batalla de Robots', 'Robots en acción'),
(10, 'Mundo Marino', 'Bajo el mar'),
(11, 'Aventuras en el Espacio', 'Exploración cósmica'),
(12, 'Fiesta de Frutas', '¡Frutas y diversión!'),
(42, 'prueba', '123213');

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
(1, 'Galaxia Estelar', NULL, 'Un juego de acción en el espacio donde pilotas una nave espacial y debes enfrentarte a hordas de alienígenas hostiles mientras exploras diferentes sistemas estelares en busca de la verdad detrás de una antigua profecía galáctica.', ''),
(2, 'Bloques Locos', NULL, 'Un juego de rompecabezas adictivo donde debes organizar bloques de colores para formar líneas y hacerlos desaparecer antes de que la pantalla se llene. ¡Desafía tu mente y tu habilidad con este juego lleno de diversión!', ''),
(3, 'Aventura Serpentina', NULL, 'Embárcate en una emocionante aventura controlando a una serpiente mágica que crece cada vez que come gemas brillantes. Explora mundos fantásticos y descubre secretos antiguos mientras te deslizas sinuosamente por paisajes exóticos.', ''),
(4, 'Salto Extremo', NULL, 'Un juego de plataformas trepidante donde saltas y corres a través de niveles desafiantes llenos de trampas mortales. Domina habilidades acrobáticas y desafía los límites de la gravedad en este emocionante viaje lleno de acción.', ''),
(5, 'Carrera en la Ciudad', NULL, 'Únete a una emocionante carrera de autos por las bulliciosas calles de la ciudad, esquivando el tráfico y compitiendo contra otros pilotos. Personaliza tu vehículo y demuestra tus habilidades de conducción en este trepidante juego de carreras urbano.', ''),
(6, 'Saltarín Comecocos', NULL, 'Ayuda al saltarín comecocos a recoger bolitas de energía mientras evita ser atrapado por fantasmas. ¡Pon a prueba tus reflejos y habilidades de esquiva en este clásico juego arcade con un giro moderno!', ''),
(7, 'Aventuras en la Jung', NULL, 'Embárcate en una emocionante expedición por la jungla en busca de tesoros ocultos y misterios antiguos. Navega por densos bosques, cruza caudalosos ríos y enfrenta peligrosas criaturas en este emocionante viaje lleno de intriga y aventura.', ''),
(8, 'Escape del Laberinto', NULL, 'Encuentra la salida de un laberinto en constante cambio mientras te enfrentas a desafíos y acertijos. ¡Pon a prueba tu ingenio y tu resistencia en este desafiante juego de escape lleno de giros y vueltas!', ''),
(9, 'Batalla de Robots', NULL, 'Controla un robot poderoso y desata el caos en la arena de combate, enfrentándote a otros robots en feroces batallas uno contra uno. Mejora tu robot con armas devastadoras y domina la estrategia de combate en este emocionante juego de lucha robótica.', ''),
(10, 'Mundo Marino', NULL, 'Sumérgete en un mundo submarino lleno de criaturas coloridas y exóticas, donde puedes explorar arrecifes de coral y buscar tesoros. ¡Descubre los secretos ocultos de las profundidades marinas en este emocionante juego de aventuras acuáticas!', ''),
(11, 'Aventuras en el Espa', NULL, 'Viaja a través del cosmos en busca de planetas desconocidos, enfrentándote a peligros alienígenas y descubriendo secretos cósmicos. ¡Explora vastos sistemas estelares y desafía los límites del espacio en este épico viaje por el universo!', ''),
(12, 'Fiesta de Frutas', NULL, 'Únete a una divertida fiesta llena de frutas jugosas y deliciosas, participa en desafíos de lanzamiento de frutas y competiciones de peladillas. ¡Diviértete al sol en este colorido y refrescante juego de fiesta de frutas!', ''),
(35, 'Galaxy Defiance', 1, 'Prueba', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `highscore-35-24`
--

CREATE TABLE `highscore-35-24` (
  `player_id` int(5) NOT NULL,
  `recorded_date` date NOT NULL,
  `value` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `highscore-35-24`
--

INSERT INTO `highscore-35-24` (`player_id`, `recorded_date`, `value`) VALUES
(1, '2024-05-27', '130'),
(2, '2024-05-27', '40'),
(3, '2024-05-27', '30'),
(4, '2024-05-28', '60'),
(5, '2024-05-28', '55'),
(6, '2024-05-16', '5'),
(7, '2024-05-15', '350');

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
(2, 1, 2),
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
(36, 1, 35);

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
(13, '¿Cómo puedo desbloquear el traje especial en Galaxia Estelar?', '¡Hola, comunidad! Estoy atascado en el nivel 5 y no sé cómo desbloquear el traje especial. ¿Alguien puede ayudarme?', 1, 4, '', 0),
(14, 'Consejos para derrotar al jefe final en Galaxia Estelar', '¡Hola a todos! Quería compartir algunos consejos que he encontrado útiles para vencer al jefe final en Galaxia Estelar. ¿Alguien más tiene algún consejo?', 1, 3, '', 0),
(15, 'Compartiendo mi opinión sobre la nueva actualización de Galaxia Estelar', '¡Saludos, amigos! Acabo de probar la nueva actualización y tengo algunas opiniones. ¿Qué piensan ustedes?', 1, 4, '', 1),
(16, 'Dudas sobre los desafíos secretos en Bloques Locos', '¡Hola, jugadores! He encontrado algunos bloques secretos en el nivel 3 pero no sé qué hacer con ellos. ¿Alguien más los ha encontrado?', 2, 2, '', 0),
(17, 'Mis momentos favoritos en Bloques Locos', '¡Hola a todos! Quería compartir algunos de mis momentos favoritos mientras jugaba a Bloques Locos. ¿Cuál es tu parte favorita del juego?', 2, 7, '', 0),
(18, '¡Necesito ayuda para encontrar la llave en Bloques Locos!', '¡Ayuda, por favor! Estoy atascado en el nivel 7 y no puedo encontrar la llave para abrir la puerta secreta. ¿Alguien tiene alguna pista?', 2, 6, '', 0),
(19, '¿Cuál es tu personaje favorito en Aventura Serpentina?', '¡Hola, aventureros! Quería saber cuál es su personaje favorito en Aventura Serpentina y por qué. ¡Compartan sus opiniones!', 3, 1, '', 0),
(20, 'Estrategias para superar el laberinto en Aventura Serpentina', '¡Saludos, compañeros de aventuras! Necesito algunas estrategias para superar el laberinto en el nivel 4 de Aventura Serpentina. ¿Alguna sugerencia?', 3, 7, '', 0),
(21, '¡Me encanta la banda sonora de Aventura Serpentina!', '¡Hola, exploradores! Solo quería comentar lo increíble que es la banda sonora de Aventura Serpentina. ¿Alguien más está de acuerdo?', 3, 1, '', 0),
(22, 'Consejos para mejorar mis tiempos en Salto Extremo', '¡Hola, corredores! Estoy tratando de mejorar mis tiempos en Salto Extremo y me preguntaba si alguien tiene algún consejo útil. ¡Gracias de antemano!', 4, 4, '', 0),
(23, '¡No puedo creer el giro argumental en Salto Extremo!', '¡Atención, jugadores! Acabo de llegar a un giro argumental sorprendente en la historia de Salto Extremo y necesitaba compartirlo. ¿Alguien más se sorprendió?', 4, 5, '', 0),
(24, '¿Alguien más encuentra los secretos ocultos en Salto Extremo?', '¡Hola, amigos del juego! Estaba explorando un poco y encontré algunos secretos ocultos en el nivel 9 de Salto Extremo. ¿Alguien más los ha descubierto?', 4, 5, '', 0),
(58, 'aaa', 'aaa', 42, 1, '', 1);

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
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'Sergio', '1234'),
(2, 'john_doe', 'pass123'),
(3, 'alice_smith', 'securepw'),
(4, 'mike_jackson', 'mysecret'),
(5, 'sarah_brown', 'letmein'),
(6, 'david_wilson', 'p@ssw0rd'),
(7, 'emily_clark', 'sunshine'),
(8, 'chris_taylor', 'qwerty'),
(9, 'laura_miller', 'ilovecats');

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
  ADD PRIMARY KEY (`player_id`);

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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `data_index`
--
ALTER TABLE `data_index`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `forums`
--
ALTER TABLE `forums`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `games`
--
ALTER TABLE `games`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `libraries`
--
ALTER TABLE `libraries`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

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
