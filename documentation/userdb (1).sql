-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 13 juin 2024 à 20:24
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `userdb`
--

-- --------------------------------------------------------

--
-- Structure de la table `address`
--

CREATE TABLE `address` (
  `addId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `City` varchar(255) NOT NULL,
  `Country` varchar(255) NOT NULL,
  `streetName` varchar(50) NOT NULL,
  `streetNumber` varchar(50) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `address`
--

INSERT INTO `address` (`addId`, `userId`, `City`, `Country`, `streetName`, `streetNumber`, `phoneNumber`) VALUES
(1, 1, 'Paris', 'France', 'Rue de la République', '456', '+33687654321'),
(3, 1, 'Lyon', 'France', 'Rue de la République', '456', '+33687654321');

-- --------------------------------------------------------

--
-- Structure de la table `cart`
--

CREATE TABLE `cart` (
  `cartId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `command`
--

CREATE TABLE `command` (
  `commandId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `deliveryDate` datetime NOT NULL,
  `countOfProdInCom` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `command`
--

INSERT INTO `command` (`commandId`, `userId`, `productId`, `deliveryDate`, `countOfProdInCom`) VALUES
(1, 7, 4, '2023-06-07 00:00:00', 5),
(2, 7, 4, '2023-06-07 00:00:00', 5);

-- --------------------------------------------------------

--
-- Structure de la table `photo`
--

CREATE TABLE `photo` (
  `photoId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `photoUrl` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `lastname` varchar(200) NOT NULL,
  `firstname` varchar(200) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `registrationDate` datetime NOT NULL,
  `tokens` varchar(200) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`userid`, `username`, `lastname`, `firstname`, `email`, `password`, `registrationDate`, `tokens`, `role`) VALUES
(1, 'john_doe', 'louis', 'John', '', 'motdepasse', '2023-06-07 00:00:00', '', 'user'),
(3, 'louiscarlosessekenett.francisco@ynov.com', 'FRANCISCO', 'Louis-carlos', 'louisfrancisco229@gmail.com', 'Louis', '0000-00-00 00:00:00', '', 'user'),
(5, 'louis255', 'FRANCISCO', 'Louis-carlos', 'louisfrancisco225@gmail.com', 'Louis', '2024-06-11 00:48:07', '', 'user'),
(6, 'louiscarlosessekenett.francisco@ynov.com', 'FRANCISCO', 'Louis-carlos', 'louisfrancisco227@gmail.com', 'Louis', '2024-06-11 01:37:20', '', 'user'),
(7, 'louiscarlos88', 'FRANCISCO2', 'Louis-carlos25', 'louisfrancisco228@gmail.com', '$2b$10$/hiRZBVc8ldgcOrnPFNHMO7G0R16fRgy/c5G0HYDIwQ36gRu9QSG6', '2024-06-11 01:38:30', '', 'user');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`addId`),
  ADD KEY `1addressPerUser` (`userId`);

--
-- Index pour la table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cartId`),
  ADD KEY `1cartPerUser` (`userId`),
  ADD KEY `cart_ibfk_1` (`productId`);

--
-- Index pour la table `command`
--
ALTER TABLE `command`
  ADD PRIMARY KEY (`commandId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `productId` (`productId`);

--
-- Index pour la table `photo`
--
ALTER TABLE `photo`
  ADD KEY `1photoPerUser` (`userId`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `address`
--
ALTER TABLE `address`
  MODIFY `addId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `cart`
--
ALTER TABLE `cart`
  MODIFY `cartId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `command`
--
ALTER TABLE `command`
  MODIFY `commandId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `1addressPerUser` FOREIGN KEY (`userId`) REFERENCES `users` (`userid`);

--
-- Contraintes pour la table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `1cartPerUser` FOREIGN KEY (`userId`) REFERENCES `users` (`userid`);

--
-- Contraintes pour la table `command`
--
ALTER TABLE `command`
  ADD CONSTRAINT `command_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `photo`
--
ALTER TABLE `photo`
  ADD CONSTRAINT `1photoPerUser` FOREIGN KEY (`userId`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
