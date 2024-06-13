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
-- Base de données : `productdb`
--

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `categoryId` int(11) NOT NULL,
  `categoryName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`categoryId`, `categoryName`) VALUES
(1, 'ple'),
(2, 'liga');

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE `products` (
  `productId` int(11) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `Price` decimal(10,0) NOT NULL,
  `remainInStocks` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `picture` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`productId`, `productName`, `Price`, `remainInStocks`, `categoryId`, `picture`) VALUES
(4, 'Produit Exemple', 20, 100, 1, 'https://img.freepik.com/free-vector/sports-shirt-design-ready-print-football-shirt-sublimation_29096-4307.jpg?size=626&ext=jpg&uid=R124982824&ga=GA1.2.883124554.1703534148&semt=ais'),
(5, 'Produit Exemple', 20, 100, 1, 'https://img.freepik.com/free-vector/sports-shirt-design-ready-print-football-shirt-sublimation_29096-4307.jpg?size=626&ext=jpg&uid=R124982824&ga=GA1.2.883124554.1703534148&semt=ais'),
(6, 'Produit Exemple', 20, 100, 1, 'https://img.freepik.com/free-vector/sports-shirt-design-ready-print-football-shirt-sublimation_29096-4307.jpg?size=626&ext=jpg&uid=R124982824&ga=GA1.2.883124554.1703534148&semt=ais'),
(7, 'Produit Exemple', 20, 100, 1, 'https://img.freepik.com/free-vector/sports-shirt-design-ready-print-football-shirt-sublimation_29096-4307.jpg?size=626&ext=jpg&uid=R124982824&ga=GA1.2.883124554.1703534148&semt=ais');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryId`);

--
-- Index pour la table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `products_ibfk_1` (`categoryId`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `products`
--
ALTER TABLE `products`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
