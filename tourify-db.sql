-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2023 at 04:40 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tourify-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `data_booking`
--

CREATE TABLE `data_booking` (
  `id` int(11) NOT NULL,
  `userId` varchar(13) NOT NULL,
  `destinationId` int(11) NOT NULL,
  `tourGuideId` varchar(13) NOT NULL,
  `bookingCode` varchar(26) NOT NULL,
  `totalPayment` int(11) NOT NULL,
  `statusPayment` tinyint(1) NOT NULL,
  `ordererNote` text NOT NULL,
  `bookingDate` datetime NOT NULL,
  `tripDate` datetime NOT NULL,
  `checkInDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='2';

--
-- Dumping data for table `data_booking`
--

INSERT INTO `data_booking` (`id`, `userId`, `destinationId`, `tourGuideId`, `bookingCode`, `totalPayment`, `statusPayment`, `ordererNote`, `bookingDate`, `tripDate`, `checkInDate`) VALUES
(1, '323121001', 1001, '9223122002', 'TRF231208100420323121001', 30000, 1, 'Temui saya di depan gerbang', '2023-12-08 10:04:12', '2023-12-08 13:00:00', '2023-12-08 13:05:00'),
(2, '423121003', 2002, '1823122004', 'TRF231207152040423121003', 20000, 0, 'Jam 9 ontime', '2023-12-07 15:20:05', '2023-12-08 19:46:07', '0000-00-00 00:00:00'),
(15, '423121005', 2009, '1823122004', 'TRF231210223429423121005', 15000, 0, 'Haloo', '2023-12-10 22:34:29', '2023-12-13 13:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `data_kuliner`
--

CREATE TABLE `data_kuliner` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `regency` varchar(200) NOT NULL,
  `province` varchar(200) NOT NULL,
  `country` varchar(200) NOT NULL,
  `caption` text NOT NULL,
  `photo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_kuliner`
--

INSERT INTO `data_kuliner` (`id`, `name`, `regency`, `province`, `country`, `caption`, `photo`) VALUES
(1, 'Mie Aceh', 'Kota Banda Aceh', 'Aceh', 'Indonesia', 'Mie Aceh, hidangan khas dari Kota Banda Aceh, adalah mie berbumbu pedas dengan daging dan sayuran. Kelezatan rempah lokal menciptakan cita rasa unik.', 'https://lh5.googleusercontent.com/p/AF1QipN7TG4bX8p2_d8HtLhcmTCZRXXkh6ndkckVMN9V=w408-h341-k-no'),
(2, 'Nasi Gurih Aceh', 'Kabupaten Aceh Tamiang', 'Aceh', 'Indonesia', 'Nasi Gurih Aceh, hidangan nasi yang dimasak dengan santan dan rempah-rempah, dapat ditemui di Kabupaten Aceh Tamiang. Daerah ini dikenal dengan keunikan rasa nasi gurihnya.', 'https://lh5.googleusercontent.com/p/AF1QipPU1VE2Od-byax_KBbjqDp8JCUgdRdbxBqbCd0w=w408-h408-k-no'),
(3, 'Mie Kocok Aceh', 'Kabupaten Aceh Barat Daya', 'Aceh', 'Indonesia', ' Mie Kuning olahan yang tanpa pengawet di sajikan dengan kuah kaldu daging dengan irisan atau cincangan daging sapi membuat kuliner ini menjadi salah satu destinasi wisata kuliner di banda Aceh.', 'https://lh5.googleusercontent.com/p/AF1QipOI55i_1iSXUqVeCg70qVYDuAxIDfsDpnJ5i96V=w1920-h1080-k-no'),
(4, 'Bika Ambon', 'Kota Medan', 'Sumatra Utara', 'Indonesia', 'Bika Ambon merupakan kue tradisional dari Sumatra Utara yang terkenal dengan tekstur lembut dan rasa manis yang khas. Kue ini sering dijadikan oleh-oleh.', 'https://lh5.googleusercontent.com/p/AF1QipPOZbhiYbG_UHIo_Ky3sFJwyLF1EBc0FR9cNlLK'),
(5, 'Saksang', 'Kabupaten Tapanuli Utara', 'Sumatra Utara', 'Indonesia', 'Saksang, hidangan khas Batak, berasal dari Kabupaten Tapanuli Utara. Daging babi yang dimasak dengan rempah-rempah menghasilkan rasa gurih dan pedas yang menggoda.', 'https://lh3.googleusercontent.com/p/AF1QipMw83lKnAP2EeW4uDPfoMlCsd0T6okO-vChpXR1=w768-h432-p-no-v0'),
(6, 'Pematang Siantar Martabak', 'Kabupaten Simalungun', 'Sumatra Utara', 'Indonesia', 'Martabak khas Pematang Siantar, Kabupaten Simalungun, adalah sajian lezat yang menggoda selera. Campuran telur, daging, dan rempah memberikan cita rasa khas Sumatra Utara.', 'https://lh5.googleusercontent.com/p/AF1QipPcPDZ-j9pLvYBy95EhB6RIk_9scVD3SIXyUB7Y=w408-h345-k-no'),
(7, '', '', '', '', 'Air Terjun Kuta Malaka, tersembunyi di Aceh, menghadirkan keajaiban alam dengan air yang deras jatuh dari tebing tinggi ke kolam alami. Keindahannya menawarkan pengalaman eksplorasi yang menenangkan di tengah keindahan alam yang asli.', '');

-- --------------------------------------------------------

--
-- Table structure for table `data_pemandu_wisata`
--

CREATE TABLE `data_pemandu_wisata` (
  `id` int(11) NOT NULL,
  `userId` varchar(15) NOT NULL,
  `servicesFee` int(11) NOT NULL,
  `rating` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_pemandu_wisata`
--

INSERT INTO `data_pemandu_wisata` (`id`, `userId`, `servicesFee`, `rating`) VALUES
(1, '9223122002', 20000, 4),
(2, '1823122004', 15000, 4.5);

-- --------------------------------------------------------

--
-- Table structure for table `data_pembayaran`
--

CREATE TABLE `data_pembayaran` (
  `id` int(11) NOT NULL,
  `userId` varchar(13) NOT NULL,
  `bookingId` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `lastUpdate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_pembayaran`
--

INSERT INTO `data_pembayaran` (`id`, `userId`, `bookingId`, `status`, `lastUpdate`) VALUES
(1, '9223122002', 1, 1, '2023-12-08 03:04:12'),
(2, '1823122004', 2, 0, '2023-12-07 08:20:05');

-- --------------------------------------------------------

--
-- Table structure for table `data_pengguna`
--

CREATE TABLE `data_pengguna` (
  `id` varchar(13) NOT NULL,
  `name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(35) NOT NULL,
  `codeVerif` int(11) NOT NULL,
  `registrationDate` datetime DEFAULT NULL,
  `verificationDate` datetime DEFAULT NULL,
  `lastLoginDate` datetime DEFAULT NULL,
  `lastLogoutDate` datetime DEFAULT NULL,
  `lastUpdate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `regency` varchar(100) NOT NULL,
  `photo` varchar(200) NOT NULL,
  `whatsapp` varchar(15) NOT NULL,
  `saldo` int(11) NOT NULL,
  `lon` float NOT NULL,
  `lat` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_pengguna`
--

INSERT INTO `data_pengguna` (`id`, `name`, `username`, `email`, `password`, `codeVerif`, `registrationDate`, `verificationDate`, `lastLoginDate`, `lastLogoutDate`, `lastUpdate`, `regency`, `photo`, `whatsapp`, `saldo`, `lon`, `lat`) VALUES
('123122004', 'Kartini Sutini', 'kartinisutini', 'kartinisutini@example.com', '508994ba1d02531e88feae95246b9d30', 312133, '2023-12-07 20:32:21', '2023-12-07 20:32:21', '2023-12-07 20:33:58', NULL, '2023-12-10 14:39:06', 'Kabupaten Aceh Besar', '', '082211415419', 0, 0, 0),
('323121001', 'Eza Musyarof', 'ezamusyarof06', 'ezamusyarof06@gmail.com', '5d7845ac6ee7cfffafc5fe5f35cf666d', 431232, '2023-12-06 10:13:06', '2023-12-06 10:13:35', '2023-12-07 14:14:05', '2023-12-06 10:16:00', '2023-12-10 14:39:23', 'Kota Banda Aceh', '', '087718372363', 35000, 0, 0),
('423121005', '', 'ezaelmusya', 'ezaelmusya@gmail.com', '5945261a168e06a5b763cc5f4908b6b2', 900943, '2023-12-10 21:18:54', '2023-12-10 21:25:56', '2023-12-10 21:40:58', '2023-12-10 21:41:35', '2023-12-10 14:41:35', '', '', '', 0, 0, 0),
('523121003', 'Susi Astuti', 'susiastuti', 'susiastuti@example.com', '536931d80decb18c33db9612bdd004d4', 432212, '2023-12-07 14:43:21', '2023-12-07 14:43:41', '2023-12-07 14:44:54', NULL, '2023-12-10 14:39:44', 'Kabupaten Aceh Besar', '', '082138271627', 50000, 0, 0),
('923122002', 'Kevin Sanjaya', 'kevinsanjaya', 'kevinsanjaya@example.com', '9d5e3ecdeb4cdb7acfd63075ae046672', 142232, '2023-12-07 12:23:03', '2023-12-07 12:24:13', '2023-12-07 12:25:23', NULL, '2023-12-10 14:39:54', 'Kota Banda Aceh', '', '087839472616', 15000, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `data_rating`
--

CREATE TABLE `data_rating` (
  `id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `destinationId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `lastUpdate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `data_wisata`
--

CREATE TABLE `data_wisata` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `type` varchar(100) NOT NULL,
  `subdistrict` varchar(500) NOT NULL,
  `regency` varchar(500) NOT NULL,
  `province` varchar(500) NOT NULL,
  `rating` float DEFAULT 0,
  `openOn` varchar(10) NOT NULL,
  `closedOn` varchar(10) NOT NULL,
  `ticketPrice` int(11) NOT NULL,
  `caption` text NOT NULL,
  `photo` text NOT NULL,
  `lat` float NOT NULL,
  `lon` float NOT NULL,
  `lastUpdate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_wisata`
--

INSERT INTO `data_wisata` (`id`, `name`, `type`, `subdistrict`, `regency`, `province`, `rating`, `openOn`, `closedOn`, `ticketPrice`, `caption`, `photo`, `lat`, `lon`, `lastUpdate`) VALUES
(1004, 'Pantai Lampuuk', 'Beach', 'Lhoknga', 'Kabupaten Aceh Besar', 'Aceh', 0, '0', '0.99930555', 0, 'Pantai Lampuuk, berada di Banda Aceh, memikat dengan pasir putihnya dan ombak yang mempesona, menciptakan surga pantai yang tenang dan indah bagi para pengunjung yang mencari ketenangan.', 'https://lh5.googleusercontent.com/p/AF1QipM7YmrN1c-PbDV5uVNi5VoWCdrX-r0jKVRQQQNu', 95.2265, 5.48548, '2023-12-09 09:15:53'),
(1008, 'Pantai Air Manis', 'Beach', 'Padang Selatan', 'Kota Padang', 'Sumatra Barat', 0, '0', '0.99930555', 10000, 'Pantai Air Manis di Padang, Sumatra Barat, mengundang wisatawan dengan pasir putihnya yang lembut dan ombak yang menyenangkan. Destinasi ini mempersembahkan pemandangan laut yang indah, menciptakan suasana pantai yang ideal untuk bersantai dan menikmati kecantikan alam tropis.', 'https://lh5.googleusercontent.com/p/AF1QipOX1_rNgt2cmtR4Hpk4x1GMWWRvSPWQr20g7jLI', 100.361, -0.991346, '2023-12-09 09:16:16'),
(2009, 'Istano Basa Pagaruyuang', 'Historical', 'Tanjung Emas', 'Kabupaten Tanah Datar', 'Sumatra Barat', 0, '0.33333333', '0.75', 15000, 'Istano Basa Pagaruyuang, berlokasi di Sumatra Barat, mempesona dengan arsitektur tradisional Minangkabau yang megah. Sebagai perwujudan warisan budaya, istana ini menawarkan pengalaman mendalam tentang kekayaan sejarah dan kebudayaan daerah.', 'https://lh5.googleusercontent.com/p/AF1QipOKgyzuEt9tHVkGvzEUI58BJdITsWhHef9F7vqU', 100.621, -0.471296, '2023-12-09 09:16:21'),
(3007, 'Danau Maninjau', 'Lake', 'Tanjung Raya', 'Kabupaten Agam', 'Sumatra Barat', 0, '0', '0.99930555', 3000, 'Danau Maninjau, berada di Sumatra Barat, memukau dengan keindahan alamnya yang menenangkan. Dikelilingi oleh perbukitan hijau, danau ini menawarkan panorama yang memikat bagi para pengunjung yang mencari ketenangan dan keindahan alam yang damai.', 'https://lh5.googleusercontent.com/p/AF1QipOwmNqaoWwC_cmM2nStAFGGEr566w74r3oCANVy', 100.198, -0.33108, '2023-12-09 09:16:10'),
(4003, 'Kilometer Nol', 'Landmark', 'Sukakarya', 'Kota Sabang', 'Aceh', 0, '0.33333333', '0.75', 0, 'Kilometer Nol Aceh, terletak di Banda Aceh, merupakan lokasi simbolis yang menandai titik nol perjalanan kilometer dari Indonesia. Tempat ini memiliki Monumen Kilometer Nol yang mengesankan, dikelilingi oleh taman yang indah. Wisatawan dapat menikmati atmosfer historis sambil mengeksplorasi sejarah dan keindahan sekitarnya.', 'https://lh5.googleusercontent.com/p/AF1QipNL-j7CzzuqqYDSPmuBXrn-IqFF5DIGI6Xtyevs', 95.314, 5.58265, '2023-12-09 09:15:48'),
(4010, 'Jam Gadang', 'Landmark', 'Guguak Panjang', 'Kota Bukittingi', 'Sumatra Barat', 0, '0', '0.99930555', 0, 'Jam Gadang di Bukittinggi menjadi ikon kota dengan desain klasiknya yang mencolok. Jam raksasa ini, dengan latar belakang pegunungan, menciptakan pemandangan yang ikonik dan menjadi simbol bersejarah bagi Bukittinggi, mengundang pengunjung untuk menikmati pesona kota bersejarah ini.', 'https://lh5.googleusercontent.com/p/AF1QipO-JIgJyxLRkkkq7_W94c-6COGx9Mwyzkqr7tig', 100.369, -0.305144, '2023-12-09 09:16:27'),
(5005, 'Museum Aceh', 'Museum', 'Baiturrahman', 'Kota Banda Aceh', 'Aceh', 0, '0.375', '0.66666666', 5000, 'Museum Aceh, di Banda Aceh, adalah harta warisan budaya dengan koleksi yang kaya, mempersembahkan jejak sejarah Aceh melalui artefak-artefak berharga, memberikan pengunjung pandangan mendalam tentang kekayaan sejarah dan budaya daerah ini.', 'https://lh5.googleusercontent.com/p/AF1QipOUxodvv2Morkz7lnPsibIiyn_KAVzCAlih9cPE', 95.321, 5.54852, '2023-12-09 09:15:59'),
(6002, 'Pucok Krueng', 'Natural', 'Lhoknga', 'Kabupaten Aceh Besar', 'Aceh', 0, '0.375', '0.70833333', 5000, 'Pucok Krueng di Aceh mempesona dengan aliran sungai yang membelah lembah hijau, menciptakan suasana alam yang menakjubkan bagi pengunjung yang mencari keindahan alam dan kedamaian.', 'https://lh5.googleusercontent.com/p/AF1QipN572jnzN9cQr04087J5fZumoq25Zf3bbRSOkKJ', 95.2613, 5.4606, '2023-12-09 09:15:42'),
(6006, 'Puncak Lawang', 'Natural', 'Matur', 'Kabupaten Agam', 'Sumatra Barat', 0, '0.29166666', '0.75', 25000, 'Puncak Lawang, terletak di Sumatra Barat, menyajikan pemandangan spektakuler dari dataran tinggi dengan lembah hijau yang luas. Destinasi ini menawarkan pengalaman mendaki menantang dan panorama alam yang memukau, memikat para pengunjung yang mencari petualangan dan keindahan alam yang luar biasa.', 'https://lh5.googleusercontent.com/p/AF1QipP4b5oY5oUdwiXXP87PTSm3L4viEYU3goSW3kiB', 100.243, -0.264321, '2023-12-09 09:16:05'),
(8001, 'Air Terjun Kuta Malaka', 'Waterfall', 'Suka Makmur', 'Kabupaten Aceh Besar', 'Aceh', 0, '0', '0.99930555', 5000, 'Air Terjun Kuta Malaka, tersembunyi di Aceh, menghadirkan keajaiban alam dengan air yang deras jatuh dari tebing tinggi ke kolam alami. Keindahannya menawarkan pengalaman eksplorasi yang menenangkan di tengah keindahan alam yang asli.', 'https://lh5.googleusercontent.com/p/AF1QipOI21a9xaDQqD3QJtkgYnoaPXQI6CG9f0KIXeTw', 95.3665, 5.39111, '2023-12-09 09:15:28');

-- --------------------------------------------------------

--
-- Table structure for table `data_wisata_favorit`
--

CREATE TABLE `data_wisata_favorit` (
  `id` int(11) NOT NULL,
  `destinationId` int(11) NOT NULL,
  `userId` varchar(13) NOT NULL,
  `lastUpdate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_wisata_favorit`
--

INSERT INTO `data_wisata_favorit` (`id`, `destinationId`, `userId`, `lastUpdate`) VALUES
(1, 8001, '323121001', '2023-12-10 14:47:38'),
(2, 6002, '923122002', '2023-12-10 14:47:45'),
(3, 4003, '523121003', '2023-12-10 14:47:50'),
(4, 1004, '123122004', '2023-12-10 14:47:54'),
(5, 5005, '323121001', '2023-12-10 14:47:57'),
(6, 6006, '923122002', '2023-12-10 14:48:00'),
(7, 3007, '523121003', '2023-12-10 14:48:04'),
(8, 1008, '123122004', '2023-12-10 14:48:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data_booking`
--
ALTER TABLE `data_booking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_kuliner`
--
ALTER TABLE `data_kuliner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_pemandu_wisata`
--
ALTER TABLE `data_pemandu_wisata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_pembayaran`
--
ALTER TABLE `data_pembayaran`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_pengguna`
--
ALTER TABLE `data_pengguna`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `data_wisata`
--
ALTER TABLE `data_wisata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_wisata_favorit`
--
ALTER TABLE `data_wisata_favorit`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data_booking`
--
ALTER TABLE `data_booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `data_kuliner`
--
ALTER TABLE `data_kuliner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `data_wisata_favorit`
--
ALTER TABLE `data_wisata_favorit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
