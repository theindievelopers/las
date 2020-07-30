-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.20 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             10.1.0.5464
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for boomdb
CREATE DATABASE IF NOT EXISTS `boomdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `boomdb`;

-- Dumping structure for table boomdb.application
CREATE TABLE IF NOT EXISTS `application` (
  `id` int NOT NULL AUTO_INCREMENT,
  `collateid` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `application_form_code` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employee_id` int DEFAULT NULL,
  `application_data` varchar(6000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdBy` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedBy` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table boomdb.application: ~0 rows (approximately)
/*!40000 ALTER TABLE `application` DISABLE KEYS */;
INSERT IGNORE INTO `application` (`id`, `collateid`, `application_form_code`, `employee_id`, `application_data`, `status`, `createdBy`, `createdAt`, `updatedBy`, `updatedAt`) VALUES
	(1, 'e1a58010-cda1-11ea-a963-5939899c5484', 'LEAVE_FORM_1', 1, '{"name":"","employee_code":"","project":"","position":"","departure_date":"","return_date":"","leave_type":"","contact_number":"","handover_briefing_to_successor":"","handover_briefing_to_successor_employee_name":"","handover_briefing_to_successor_employee_code":"","handover_documents_employee_name":"","handover_documents_employee_code":"","items_issued":"","remarks":"","logistics_officer_signature_and_date":"","immidiate_supervisor_manager_signature_and_date":"","project_manager_signature_and_date":"","accounting_department_signature_and_date":"","receive_ticket":"","receive_settlement":"","receive_others":"","receive_others_remarks":"","leave_from":"","leave_to":"","be_back_on":"","employee_signature":"","employee_signature_date":"","airport_transportation_departure_date":"","airport_transportation_arrival_date":"","airport_transportation_accommodation":"","airport_transportation_mobile_number":"","hr_manager_signature_and_date":"","coo_signature_and_date":"","ceo_signature_and_date":"","createdBy":"","createdAt":"","updatedBy":"","updatedAt":""}', 'ACTIVE', 'system', '2020-07-13 16:27:30', 'system', '2020-07-24 11:36:14');
/*!40000 ALTER TABLE `application` ENABLE KEYS */;

-- Dumping structure for table boomdb.application_form
CREATE TABLE IF NOT EXISTS `application_form` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `data` varchar(6000) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `createdby` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `createdat` datetime NOT NULL,
  `updatedby` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `updatedat` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table boomdb.application_form: ~0 rows (approximately)
/*!40000 ALTER TABLE `application_form` DISABLE KEYS */;
/*!40000 ALTER TABLE `application_form` ENABLE KEYS */;

-- Dumping structure for table boomdb.designation
CREATE TABLE IF NOT EXISTS `designation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdBy` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedBy` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table boomdb.designation: ~0 rows (approximately)
/*!40000 ALTER TABLE `designation` DISABLE KEYS */;
INSERT IGNORE INTO `designation` (`id`, `code`, `createdBy`, `createdAt`, `updatedBy`, `updatedAt`) VALUES
	(1, 'Administrator', 'system', '2020-07-14 00:58:07', 'system', '2020-07-14 00:58:10');
/*!40000 ALTER TABLE `designation` ENABLE KEYS */;

-- Dumping structure for table boomdb.employee
CREATE TABLE IF NOT EXISTS `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `mname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lname` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cost_allocation_site` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cost_allocation_actual_job_title` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nationality` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sponsorship` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dob` date NOT NULL,
  `passport_number` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `passport_date_of_issue` date DEFAULT NULL,
  `passport_expiry_date` date DEFAULT NULL,
  `residence_permit_number` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `residence_permit_expiry_date` date DEFAULT NULL,
  `residence_permit_blood_group` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job_offer_doha_entry` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `joining_date` date DEFAULT NULL,
  `increment_month` int DEFAULT NULL,
  `increment_amount` double DEFAULT NULL,
  `basic` double DEFAULT NULL,
  `general_allowance` double DEFAULT NULL,
  `hra` double DEFAULT NULL,
  `transportation_allowance` double DEFAULT NULL,
  `tel_allow` double DEFAULT NULL,
  `ticket_allowance` double DEFAULT NULL,
  `food_allowance` double DEFAULT NULL,
  `medical_allowance` double DEFAULT NULL,
  `total` double DEFAULT NULL,
  `leave_ticket_entitlement` int DEFAULT NULL,
  `leave_ticket_days_per_year` int DEFAULT NULL,
  `driving_license_issue_date` date DEFAULT NULL,
  `driving_license_expiry_date` date DEFAULT NULL,
  `health_card_number` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `health_card_issue_date` date DEFAULT NULL,
  `health_card_expiry_date` date DEFAULT NULL,
  `bank_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_number` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `recruited_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accommodation` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employee_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `employment_status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdby` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdat` date NOT NULL,
  `updatedby` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updatedat` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table boomdb.employee: ~8 rows (approximately)
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT IGNORE INTO `employee` (`id`, `code`, `fname`, `mname`, `lname`, `cost_allocation_site`, `cost_allocation_actual_job_title`, `nationality`, `sponsorship`, `dob`, `passport_number`, `passport_date_of_issue`, `passport_expiry_date`, `residence_permit_number`, `residence_permit_expiry_date`, `residence_permit_blood_group`, `job_offer_doha_entry`, `joining_date`, `increment_month`, `increment_amount`, `basic`, `general_allowance`, `hra`, `transportation_allowance`, `tel_allow`, `ticket_allowance`, `food_allowance`, `medical_allowance`, `total`, `leave_ticket_entitlement`, `leave_ticket_days_per_year`, `driving_license_issue_date`, `driving_license_expiry_date`, `health_card_number`, `health_card_issue_date`, `health_card_expiry_date`, `bank_name`, `card_number`, `recruited_by`, `accommodation`, `employee_type`, `employment_status`, `createdby`, `createdat`, `updatedby`, `updatedat`) VALUES
	(1, 'BGS001\r\n', 'Metri', 'Lin', 'bitar', 'Main Office', 'Chief Executive Officer\r\n', 'Lebanese\r\n', 'Boom General Contractors\r\n', '1962-10-16', 'RL3419815', '2018-08-08', '2020-07-20', '26242200315', '2022-03-08', 'B+', '2007-03-12', '2020-07-20', 1, 2500, 4500, 500, 200, 100, 50, 700, 50, 650, 6750, 4, 21, '2020-07-20', '2020-07-20', 'HC01965270', '2020-07-20', '2020-07-20', 'Doha Bank', '4046180000993590', NULL, 'SHAHANIA CAMP\r\n', 'staff', 'active', 'system', '2020-07-20', 'system', '2020-07-20'),
	(2, 'BGS002', 'Metri', '', 'bitar', 'Main Office', 'Chief Executive Officer', 'Lebanese', 'Boom GeneralContractors', '1962-10-16', 'RL3419815', '2018-08-08', '2020-07-20', '26242200315', '2022-03-08', 'B +', '2007-03-12', '2020-07-20', 1, 2500, 4500, 500, 200, 100, 50, 700, 50, 650, 6750, 4, 21, '2020-07-20', '2020-07-20', 'HC01965270', '2020-07-20', '2020-07-20', 'DohaBank', '4046180000993590', NULL, 'SHAHANIACAMP', 'staff', 'active', 'system', '2020-07-20', 'system', '2020-07-20'),
	(5, 'BGS003', 'Metri', '', 'bitar', 'Main Office', 'Chief Executive Officer', 'Lebanese', 'Boom GeneralContractors', '1962-10-16', 'RL3419815', '2018-08-08', '2020-07-20', '26242200315', '2022-03-08', 'B +', '2007-03-12', '2020-07-20', 1, 2500, 4500, 500, 200, 100, 50, 700, 50, 650, 6750, 4, 21, '2020-07-20', '2020-07-20', 'HC01965270', '2020-07-20', '2020-07-20', 'DohaBank', '4046180000993590', NULL, 'SHAHANIACAMP', 'staff', 'active', 'system', '2020-07-20', 'system', '2020-07-20'),
	(30, 'BGS004', 'Metri', '', 'bitar', 'Main Office', 'Chief Executive Officer', 'Lebanese', 'Boom GeneralContractors', '1962-10-16', 'RL3419815', '2018-08-08', '2020-07-20', '26242200315', '2022-03-08', 'B +', '2007-03-12', '2020-07-20', 1, 2500, 4500, 500, 200, 100, 50, 700, 50, 650, 6750, 4, 21, '2020-07-20', '2020-07-20', 'HC01965270', '2020-07-20', '2020-07-20', 'DohaBank', '4046180000993590', NULL, 'SHAHANIACAMP', 'staff', 'active', 'system', '2020-07-20', 'system', '2020-07-20'),
	(32, 'BGS005', 'Metri', '', 'bitar', 'Main Office', 'Chief Executive Officer', 'Lebanese', 'Boom GeneralContractors', '1962-10-16', 'RL3419815', '2018-08-08', '2020-07-20', '26242200315', '2022-03-08', 'B +', '2007-03-12', '2020-07-20', 1, 2500, 4500, 500, 200, 100, 50, 700, 50, 650, 6750, 4, 21, '2020-07-20', '2020-07-20', 'HC01965270', '2020-07-20', '2020-07-20', 'DohaBank', '4046180000993590', NULL, 'SHAHANIACAMP', 'staff', 'active', 'system', '2020-07-20', 'system', '2020-07-20'),
	(34, 'BGS006', 'Metri', '', 'bitar', 'Main Office', 'Chief Executive Officer', 'Lebanese', 'Boom GeneralContractors', '1962-10-16', 'RL3419815', '2018-08-08', '2020-07-20', '26242200315', '2022-03-08', 'B +', '2007-03-12', '2020-07-20', 1, 2500, 4500, 500, 200, 100, 50, 700, 50, 650, 6750, 4, 21, '2020-07-20', '2020-07-20', 'HC01965270', '2020-07-20', '2020-07-20', 'DohaBank', '4046180000993590', NULL, 'SHAHANIACAMP', 'staff', 'active', 'system', '2020-07-20', 'system', '2020-07-20'),
	(35, 'BGS007', 'Metri', '', 'bitar', 'Main Office', 'Chief Executive Officer', 'Lebanese', 'Boom GeneralContractors', '1962-10-16', 'RL3419815', '2018-08-08', '2020-07-20', '26242200315', '2022-03-08', 'B +', '2007-03-12', '2020-07-20', 1, 2500, 4500, 500, 200, 100, 50, 700, 50, 650, 6750, 4, 21, '2020-07-20', '2020-07-20', 'HC01965270', '2020-07-20', '2020-07-20', 'DohaBank', '4046180000993590', NULL, 'SHAHANIACAMP', 'staff', 'active', 'system', '2020-07-20', 'system', '2020-07-20'),
	(37, 'BGS008', 'Metri', '', 'bitar', 'Main Office', 'Chief Executive Officer', 'Lebanese', 'Boom GeneralContractors', '1962-10-16', 'RL3419815', '2018-08-08', '2020-07-20', '26242200315', '2022-03-08', 'B +', '2007-03-12', '2020-07-20', 1, 2500, 4500, 500, 200, 100, 50, 700, 50, 650, 6750, 4, 21, '2020-07-20', '2020-07-20', 'HC01965270', '2020-07-20', '2020-07-20', 'DohaBank', '4046180000993590', NULL, 'SHAHANIACAMP', 'staff', 'active', 'system', '2020-07-20', 'system', '2020-07-20'),
	(39, 'BGS009', 'Metri', '', 'bitar', 'Main Office', 'Chief Executive Officer', 'Lebanese', 'Boom GeneralContractors', '1962-10-16', 'RL3419815', '2018-08-08', '2020-07-20', '26242200315', '2022-03-08', 'B +', '2007-03-12', '2020-07-20', 1, 2500, 4500, 500, 200, 100, 50, 700, 50, 650, 6750, 4, 21, '2020-07-20', '2020-07-20', 'HC01965270', '2020-07-20', '2020-07-20', 'DohaBank', '4046180000993590', NULL, 'SHAHANIACAMP', 'staff', 'active', 'system', '2020-07-20', 'system', '2020-07-20');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;

-- Dumping structure for table boomdb.logs
CREATE TABLE IF NOT EXISTS `logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `collateid` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `action` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `obj` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `objowner` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `data` varchar(10000) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `createdby` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `createdat` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table boomdb.logs: ~0 rows (approximately)
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;

-- Dumping structure for table boomdb.statuses
CREATE TABLE IF NOT EXISTS `statuses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdBy` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedBy` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table boomdb.statuses: ~0 rows (approximately)
/*!40000 ALTER TABLE `statuses` DISABLE KEYS */;
/*!40000 ALTER TABLE `statuses` ENABLE KEYS */;

-- Dumping structure for table boomdb.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lname` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `designation` int NOT NULL,
  `status` int NOT NULL,
  `createdBy` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedBy` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table boomdb.users: ~0 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT IGNORE INTO `users` (`id`, `fname`, `lname`, `designation`, `status`, `createdBy`, `createdAt`, `updatedBy`, `updatedAt`) VALUES
	(1, 'Ryann', 'Flores', 1, 1, 'admin', '2020-07-14 00:27:30', 'admin', '2020-07-14 00:27:40');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
