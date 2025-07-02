-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 02, 2025 at 02:15 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `create_time`) VALUES
(2, 2, '2025-06-25 18:33:53');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `variant_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT 1,
  `price_each` decimal(10,2) NOT NULL,
  `total_price` decimal(12,2) GENERATED ALWAYS AS (`quantity` * `price_each`) STORED
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE `log` (
  `id` int(11) NOT NULL,
  `loglevel` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `log`
--

INSERT INTO `log` (`id`, `loglevel`, `message`, `create_time`) VALUES
(1, 'warn', 'ثبت‌نام ناموفق به دلیل نبود اطلاعات کامل | IP: ::1', '2025-06-21 22:07:06'),
(2, 'info', 'ثبت‌نام موفق: نام کاربری ali | ایمیل ali@gmail.com', '2025-06-21 22:07:27'),
(3, 'info', '\n      کاربر ali با ایمیلی ali@gmail.com با موفقیت وارد شد\n      ', '2025-06-21 22:07:52'),
(4, 'info', '\n      کاربر ali با ایمیلی ali@gmail.com با موفقیت وارد شد\n      ', '2025-06-22 04:46:34'),
(5, 'info', '\n      کاربر ali با ایمیلی ali@gmail.com با موفقیت وارد شد\n      ', '2025-06-22 04:47:08'),
(6, 'info', '\n      کاربر ali با ایمیلی ali@gmail.com با موفقیت وارد شد\n      ', '2025-06-22 04:51:02'),
(7, 'warn', 'ثبت‌نام ناموفق به دلیل نبود اطلاعات کامل | IP: ::1', '2025-06-22 04:51:17'),
(8, 'info', '\n        محصول جدیدی با موفقیت اضافه شد ✅\n        ', '2025-06-22 04:52:02'),
(9, 'info', 'ثبت‌نام موفق: نام کاربری mmo | ایمیل mmdo@gmail.com', '2025-06-25 12:29:37'),
(10, 'info', '\n      کاربر mmo با ایمیلی mmdo@gmail.com با موفقیت وارد شد\n      ', '2025-06-25 12:30:09'),
(11, 'info', 'محصول جدیدی با موفقیت اضافه شد ✅', '2025-06-25 12:34:59'),
(12, 'info', '\n      کاربر mmo با ایمیلی mmdo@gmail.com با موفقیت وارد شد\n      ', '2025-06-25 14:21:19'),
(13, 'error', 'خطا در ثبت  وارینت محصول || جزئیات خطا: You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near \'?)\' at line 1', '2025-06-25 14:21:59'),
(14, 'error', 'خطا در ثبت  وارینت محصول || جزئیات خطا: Table \'digitshop.product_varient\' doesn\'t exist', '2025-06-25 14:22:14'),
(15, 'error', 'خطا در ثبت  وارینت محصول || جزئیات خطا: Column count doesn\'t match value count at row 1', '2025-06-25 14:22:23'),
(16, 'info', '\n        وارینت محصول جدیدی با موفقیت اضافه شد ✅\n        ', '2025-06-25 14:22:35'),
(17, 'info', '\n        وارینت محصول جدیدی با موفقیت اضافه شد ✅\n        ', '2025-06-25 14:23:20'),
(18, 'info', '\n        وارینت محصول جدیدی با موفقیت اضافه شد ✅\n        ', '2025-06-25 14:24:36'),
(19, 'info', '\n        وارینت محصول جدیدی با موفقیت اضافه شد ✅\n        ', '2025-06-25 14:27:01'),
(20, 'info', '\n      کاربر mmo با ایمیلی mmdo@gmail.com با موفقیت وارد شد\n      ', '2025-06-25 17:05:01'),
(21, 'info', '\n        وارینت محصول جدیدی با موفقیت اضافه شد ✅\n        ', '2025-06-25 17:05:23'),
(22, 'info', '\n        وارینت محصول جدیدی با موفقیت اضافه شد ✅\n        ', '2025-06-25 17:08:40'),
(23, 'info', '\n        وارینت محصول جدیدی با موفقیت اضافه شد ✅\n        ', '2025-06-25 17:08:51'),
(24, 'info', '\n      کاربر mmo با ایمیلی mmdo@gmail.com با موفقیت وارد شد\n      ', '2025-06-25 18:26:50'),
(25, 'error', '\n            message: \"Error adding item to cart\", error:\n            Error: Column \'cart_id\' cannot be null\n            ', '2025-06-25 18:33:53'),
(26, 'error', '\n            message: \"Error adding item to cart\", error:\n            Error: Column \'cart_id\' cannot be null\n            ', '2025-06-25 18:35:38'),
(27, 'info', '\n      کاربر mmo با ایمیلی mmdo@gmail.com با موفقیت وارد شد\n      ', '2025-06-25 19:48:46'),
(28, 'info', '\n      کاربر mmo با ایمیلی mmdo@gmail.com با موفقیت وارد شد\n      ', '2025-06-26 12:52:24'),
(29, 'info', '\n      کاربر mmo با ایمیلی mmdo@gmail.com با موفقیت وارد شد\n      ', '2025-06-26 13:09:13'),
(30, 'info', '\n      کاربر mmo با ایمیلی mmdo@gmail.com با موفقیت وارد شد\n      ', '2025-06-27 13:50:03'),
(31, 'info', '\n      کاربر mmo با ایمیلی mmdo@gmail.com با موفقیت وارد شد\n      ', '2025-06-27 13:50:13'),
(32, 'info', '\n      کاربر mmo با ایمیلی mmdo@gmail.com با موفقیت وارد شد\n      ', '2025-06-27 14:31:41'),
(33, 'info', 'محصول جدیدی با موفقیت اضافه شد ✅', '2025-06-27 14:36:42'),
(34, 'info', 'ثبت‌نام موفق: نام کاربری mmdo2 | ایمیل mmdo2@gmail.com\n        \n        [object Promise]\n        \n        ', '2025-07-01 13:07:30'),
(35, 'info', 'ثبت‌نام موفق: نام کاربری mmdo2 | ایمیل mmdo2@gmail.com\n        \n        [object Promise]\n        \n        ', '2025-07-01 13:07:43'),
(36, 'info', 'ثبت‌نام موفق: نام کاربری mmdo2 | ایمیل mmdo2@gmail.com\n        \n        [object Promise]\n        \n        ', '2025-07-01 13:08:11'),
(37, 'info', 'ثبت‌نام موفق: نام کاربری mmdo2 | ایمیل mmdo2@gmail.com\n        \n        [object Promise]\n        \n        ', '2025-07-01 13:10:18'),
(38, 'info', 'ثبت‌نام موفق: نام کاربری mmdo2 | ایمیل mmdo2@gmail.com\n        \n        [object Promise]\n        \n        ', '2025-07-01 13:11:00'),
(39, 'info', 'ثبت‌نام موفق: نام کاربری mmdo2 | ایمیل mmdo2@gmail.com\n        \n        [object Promise]\n        \n        ', '2025-07-01 13:11:20'),
(40, 'info', 'ثبت‌نام موفق: نام کاربری mmdo2 | ایمیل mmdo2@gmail.com\n        \n        [object Promise]\n        \n        ', '2025-07-01 13:11:28'),
(41, 'info', 'ثبت‌نام موفق: نام کاربری mmdo2 | ایمیل mmdo2@gmail.com\n        \n        [object Promise]\n        \n        ', '2025-07-01 13:11:38'),
(42, 'info', 'ثبت‌نام موفق: نام کاربری mmdo2 | ایمیل mmdo2@gmail.com\n        \n        [object Promise]\n        \n        ', '2025-07-01 13:11:53'),
(43, 'info', 'ثبت‌نام موفق: نام کاربری mmdo2 | ایمیل mmdo2@gmail.com\n        \n        [object Promise]\n        \n        ', '2025-07-01 13:13:42'),
(44, 'info', 'ثبت‌نام موفق: نام کاربری mmdo2 | ایمیل mmdo2@gmail.com\n        \n        [object Promise]\n        \n        ', '2025-07-01 13:13:58'),
(45, 'info', 'ثبت‌نام موفق: نام کاربری mmdo2 | ایمیل mmdo2@gmail.com\n        \n        [object Promise]\n        \n        ', '2025-07-01 13:14:10'),
(46, 'info', 'ثبت‌نام موفق: نام کاربری mmdo2 | ایمیل mmdo2@gmail.com\n        \n        [object Promise]\n        \n        ', '2025-07-01 13:14:26'),
(47, 'info', 'ثبت‌نام موفق: نام کاربری mmdo2 | ایمیل mmdo2@gmail.com\n        \n        [object Promise]\n        \n        ', '2025-07-01 13:15:09'),
(48, 'info', 'ثبت‌نام موفق: نام کاربری mmdo2 | ایمیل mmdo2@gmail.com\n        \n        [object Promise]\n        \n        ', '2025-07-01 13:15:22'),
(49, 'info', 'ثبت‌نام موفق: نام کاربری mmdo2 | ایمیل mmdo2@gmail.com\n        \n        [object Promise]\n        \n        ', '2025-07-01 13:16:06'),
(50, 'info', 'ثبت‌نام موفق: نام کاربری mmdo2 | ایمیل mmdo2@gmail.com\n        \n        [object Promise]\n        \n        ', '2025-07-01 13:17:59'),
(51, 'info', 'ثبت‌نام موفق: نام کاربری mmdo2 | ایمیل mmdo2@gmail.com\n        \n        [object Object]\n        \n        ', '2025-07-01 13:18:59'),
(52, 'info', '\n         یک درخواست ورود با IP : ::1 زده اما کاربری با این ایمیل mmdo@gmail.com نبود \n        ', '2025-07-01 15:44:54'),
(53, 'info', '\n      کاربر mmdo2 با ایمیلی mmdo2@gmail.com با موفقیت وارد شد\n      ', '2025-07-01 15:45:13'),
(54, 'info', '\n      کاربر mmdo2 با ایمیلی mmdo2@gmail.com با موفقیت وارد شد\n      ', '2025-07-01 15:46:35'),
(55, 'info', '\n      کاربر mmdo2 با ایمیلی mmdo2@gmail.com با موفقیت وارد شد\n      ', '2025-07-01 15:47:26'),
(56, 'info', '\n      کاربر mmdo2 با ایمیلی mmdo2@gmail.com با موفقیت وارد شد\n      ', '2025-07-01 15:47:50'),
(57, 'info', 'ثبت‌نام موفق: نام کاربری mohammad | ایمیل mohammad@example.com\n        \n        [object Object]\n        \n        ', '2025-07-01 19:59:20');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `img_path` varchar(255) NOT NULL,
  `platform` enum('psn','xbox') NOT NULL,
  `type` enum('console','account') DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `img_path`, `platform`, `type`, `create_time`, `description`) VALUES
(2, 'ps5 slim', 'OIP', 'psn', NULL, '2025-06-25 12:34:59', 'پلی استیشن 5 اسلیم '),
(3, 'ps5 fat', 'OIP', 'psn', NULL, '2025-06-27 14:36:42', 'پلی استیشن 5 فت ');

-- --------------------------------------------------------

--
-- Table structure for table `product_variant`
--

CREATE TABLE `product_variant` (
  `id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `product_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_variant`
--

INSERT INTO `product_variant` (`id`, `label`, `price`, `create_time`, `product_id`) VALUES
(7, 'standard', 45000000.00, '2025-06-25 17:08:40', 1),
(8, 'digital', 42000000.00, '2025-06-25 17:08:51', 1);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `color` varchar(30) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `set_defualt_role` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `color`, `create_time`, `set_defualt_role`) VALUES
(1, 'OWNER', 'ff5999', '2025-06-27 13:13:09', 0),
(2, 'user', '#851fff', '2025-07-01 13:09:57', 1);

-- --------------------------------------------------------

--
-- Table structure for table `role_permission`
--

CREATE TABLE `role_permission` (
  `id` int(11) NOT NULL,
  `role_id` int(32) NOT NULL,
  `permission_name` varchar(32) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role_permission`
--

INSERT INTO `role_permission` (`id`, `role_id`, `permission_name`, `create_time`) VALUES
(1, 1, 'ADMINISTRATOR', '2025-06-27 13:14:46');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `create_time`) VALUES
(1, 'ali', 'ali@gmail.com', '$2b$10$WMWJyU1gWVcNYLI.xGSjquUT9xmEIekF3dc4mwpuqKAPUmO1xJgfO', '2025-06-22 04:49:19'),
(26, 'mmdo2', 'mmdo2@gmail.com', '$2b$10$6vsqVJbEjVTGAYc1q.YTDu9BQns0dy40TzQru7Oao4Uyi3m8M6QTa', '2025-07-01 13:18:59'),
(27, 'mohammad', 'mohammad@example.com', '$2b$10$YWUNljnW.lrhVhDNZG0Pp.n/FrXkfHACFR/5gEEUTKOYzEKVJQaJy', '2025-07-01 19:59:20');

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `id` int(11) NOT NULL,
  `user_id` int(32) NOT NULL,
  `role_id` int(32) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`id`, `user_id`, `role_id`, `create_time`) VALUES
(1, 2, 1, '2025-06-27 13:15:51'),
(4, 26, 2, '2025-07-01 13:18:59'),
(5, 27, 2, '2025-07-01 19:59:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_variant`
--
ALTER TABLE `product_variant`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role_permission`
--
ALTER TABLE `role_permission`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `log`
--
ALTER TABLE `log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product_variant`
--
ALTER TABLE `product_variant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `role_permission`
--
ALTER TABLE `role_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
