-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 22, 2025 at 05:00 PM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `digitshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `category_id` int NOT NULL,
  `sub_category_id` int NOT NULL,
  `brand_id` int NOT NULL,
  `create_time` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `category_id`, `sub_category_id`, `brand_id`, `create_time`) VALUES
(1, 'ps5 fat', 'پلی استیشن 5 فت ', 2, 5, 2, '۱۴ مهر ۱۴۰۴');

-- --------------------------------------------------------

--
-- Table structure for table `product_img`
--

DROP TABLE IF EXISTS `product_img`;
CREATE TABLE IF NOT EXISTS `product_img` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `set_org_img` varchar(25) DEFAULT 'false',
  `create_time` varchar(255) NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product_img`
--

INSERT INTO `product_img` (`id`, `name`, `set_org_img`, `create_time`, `product_id`) VALUES
(1, '۲۰۲۵۰۷۰۴_۱۴۲۰۰۷', 'false', '۱۴ مهر ۱۴۰۴', 5),
(2, 'nintendo', 'false', '۱۴ مهر ۱۴۰۴', 5);

-- --------------------------------------------------------

--
-- Table structure for table `product_varients`
--

DROP TABLE IF EXISTS `product_varients`;
CREATE TABLE IF NOT EXISTS `product_varients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(65,0) NOT NULL,
  `create_time` varchar(255) NOT NULL,
  `product_id` int NOT NULL,
  `discount` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product_varients`
--

INSERT INTO `product_varients` (`id`, `name`, `price`, `create_time`, `product_id`, `discount`) VALUES
(1, 'دیجیتال', 50000000, '۱۵ مهر ۱۴۰۴', 1, 0),
(2, 'استاندارد', 5828200000, '', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL,
  `name` varchar(30) NOT NULL,
  `create_time` varchar(30) NOT NULL,
  `set_defualt_role` varchar(25) NOT NULL DEFAULT 'false'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `create_time`, `set_defualt_role`) VALUES
(7509, 'user', '۱۰ مهر ۱۴۰۴', 'true'),
(7403, 'admin', '۱۲ مهر ۱۴۰۴', 'false'),
(3312, 'contacts_admin', '۱۴ مهر ۱۴۰۴', 'false'),
(6720, 'administrator', '۱۲ مهر ۱۴۰۴', 'false'),
(6898, 'product_admin', '۱۴ مهر ۱۴۰۴', 'false');

-- --------------------------------------------------------

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
CREATE TABLE IF NOT EXISTS `role_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `permission_name` varchar(255) NOT NULL,
  `role_id` int NOT NULL,
  `create_time` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `role_permissions`
--

INSERT INTO `role_permissions` (`id`, `permission_name`, `role_id`, `create_time`) VALUES
(2, 'CREATE_PRODUCT', 7403, ''),
(3, 'CREATE_ROLE', 7403, '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phonenumber` double NOT NULL,
  `password` varchar(255) NOT NULL,
  `create_time` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `phonenumber`, `password`, `create_time`) VALUES
(2939, 'محمد حسن', 'اتشبار', 'm.h.atashbar20@gmail.com', 9339961237, '$2b$10$fToG66qPH1GcwQJYE4W4tuWTgDw7ACneHopgvs.v3rmlDCDEtg2Q.', '۱۳ مهر ۱۴۰۴'),
(3216, 'علیرضا', 'اتش بار', 'یصشیصشی@gmail.com', 99584847447, '$2b$10$Zrrz.mXu6ZB9s0Zbdh8KIOrZu5sls0eF.MoQwBLT/RTUV9pDwQ1Qu', '۲۲ مهر ۱۴۰۴'),
(7737, 'admin', 'dwadad', 'mohammadgc.01@gmail.com', 213123131, '$2b$10$OLPx9TIP6eMmO5VFaqffVOOy3/BvlJPBFcCo02zyP/pIY5i4IvKfG', '۲۰ مهر ۱۴۰۴'),
(1039, 'محمد حسن', 'اتشبار', 'm.h.atashbar20@gmail.com', 9339961237, '$2b$10$DqZ14Knr2fsEHSQlCbSaYembV3db/VAF5lVnq3V2DKvZXlVe4y/Fe', '۱۳ مهر ۱۴۰۴'),
(2198, 'علیرضا', 'اتش بار', 'صشییشی@gmail.com', 3123214343, '$2b$10$q5/KaLlq0f8I.oEwVKv4LOdvCIsawvp24fLPAIgPX8fTVYinRIuy6', '۲۲ مهر ۱۴۰۴'),
(1094, 'fesfsf', 'sfsfs', 'awdad!@gmail.com', 3231313, '$2b$10$46nTgU4/c9VKuwlHJnjIbeV7mO0Bar.gKXMr3LPcPfSBczWJJwvIm', '۲۲ مهر ۱۴۰۴'),
(885, 'صیشیصشیشیصش', 'صشیصشیصشیٌ', 'wdadWA!@gmail.com', 34343423232, '$2b$10$HPNB34kqf4YHqIHKlh8tn.qrzSO9icXnu7S3rcIli1nj24tOCmcgK', '۲۲ مهر ۱۴۰۴'),
(3005, '22aeeqe', '2qeqeq2e', 'q2eqeq2eq2e', 2e222, '$2b$10$TuA0cMqGerWzLnbT0fcXR.ZbTObL37PC90uAo2AzodAJ6Z9LiRymS', '۲۲ مهر ۱۴۰۴'),
(390, 'wdadwad', 'awdwadwa', 'dawdwadaw', 12323232, '$2b$10$RkxthOLI7J5waEIVwqm4Z.S1jSpHhPvP9R3cE/uJchPigsukeFxy.', '۲۲ مهر ۱۴۰۴');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE IF NOT EXISTS `user_roles` (
  `id` int NOT NULL,
  `role_id` int NOT NULL,
  `user_id` int NOT NULL,
  `create_time` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`id`, `role_id`, `user_id`, `create_time`) VALUES
(7989, 7509, 7737, '۲۰ مهر ۱۴۰۴'),
(5449, 7403, 2939, '۱۳ مهر ۱۴۰۴'),
(5074, 7509, 3216, '۲۲ مهر ۱۴۰۴'),
(8905, 7509, 2198, '۲۲ مهر ۱۴۰۴'),
(9640, 7509, 1094, '۲۲ مهر ۱۴۰۴'),
(3227, 7509, 885, '۲۲ مهر ۱۴۰۴'),
(9972, 7509, 3005, '۲۲ مهر ۱۴۰۴'),
(3470, 7509, 390, '۲۲ مهر ۱۴۰۴');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
