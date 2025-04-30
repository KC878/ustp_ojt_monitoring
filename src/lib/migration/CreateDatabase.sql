-- CREATE DATABASE
-- CREATE DATABASE IF NOT EXISTS logicbase_ojt_monitoring;
-- USE logicbase_ojt_monitoring;

-- ✅ Disable foreign key checks to allow table dropping
SET FOREIGN_KEY_CHECKS = 0;

-- ✅ Drop tables in any order, no constraint errors
DROP TABLE IF EXISTS Schools;
DROP TABLE IF EXISTS Daily_Logs;
DROP TABLE IF EXISTS User_Status;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Roles;


-- ✅ Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- 0. Table for Scools 
CREATE TABLE IF NOT EXISTS Schools (
	schoolID VARCHAR(25) NOT NULL PRIMARY KEY,
    schoolName VARCHAR(100) UNIQUE
);

-- 1. Create Roles Table
CREATE TABLE IF NOT EXISTS Roles (
  roleID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  role VARCHAR(25) UNIQUE NOT NULL
);

-- 2. Create Users Table
CREATE TABLE IF NOT EXISTS Users (
  userID CHAR(36) NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL, 
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  roleID INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  duration VARCHAR(25), -- requiredHours
  schoolID VARCHAR(25), 
  FOREIGN KEY (roleID) REFERENCES Roles(roleID) ON DELETE CASCADE,
  FOREIGN KEY (schoolID) REFERENCES Schools(schoolID) ON DELETE CASCADE
);

-- 3. Create User_Status Table
CREATE TABLE IF NOT EXISTS User_Status ( 
  userID CHAR(36) NOT NULL,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  timeRendered INT,
  status VARCHAR(50) NOT NULL,
  dateIn VARCHAR(50) NOT NULL,
  timeIn VARCHAR(50) NOT NULL,
  timeOut VARCHAR(50) NOT NULL,
  duty VARCHAR(50) NOT NULL,
  PRIMARY KEY (userID),
  FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
);

-- 4. Create Daily_Logs Table
CREATE TABLE IF NOT EXISTS Daily_Logs (
  logID INT AUTO_INCREMENT,
  email VARCHAR(100) NOT NULL, 
  userID CHAR(36) NOT NULL,
  createdAt DATE,
  timeIn VARCHAR(50),
  timeOut VARCHAR(50),
  renderedTime INT,
  PRIMARY KEY(logID),
  FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
);
