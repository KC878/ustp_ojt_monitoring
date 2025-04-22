-- CREATE DATABASE logicbase_ojt_monitoring;
CREATE DATABASE IF NOT EXISTS logicbase_ojt_monitoring;
USE logicbase_ojt_monitoring;

-- DROP CHILD TABLES FIRST
DROP TABLE IF EXISTS Announcements;
DROP TABLE IF EXISTS Attendance;
DROP TABLE IF EXISTS Evaluations;
DROP TABLE IF EXISTS Daily_Logs;
DROP TABLE IF EXISTS OJT_Assignments;
DROP TABLE IF EXISTS User_Status;
DROP TABLE IF EXISTS Users;

-- DROP PARENT TABLES LAST
DROP TABLE IF EXISTS Attendance_Status_Types;
DROP TABLE IF EXISTS Roles;

-- 1. Create Roles Table
CREATE TABLE IF NOT EXISTS Roles (
  roleID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  role VARCHAR(25) UNIQUE NOT NULL
);

-- 3. Create Attendance_Status_Types Table
CREATE TABLE IF NOT EXISTS Attendance_Status_Types (
  attendanceStatusID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  status VARCHAR(20) NOT NULL -- present, absent, late, on-leave, etc.
);

-- 4. Create Users Table with UUID as userID
CREATE TABLE IF NOT EXISTS Users (
  userID CHAR(36) NOT NULL PRIMARY KEY, -- UUID for userID
  name VARCHAR(50) NOT NULL, 
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  roleID INT NOT NULL, -- 'admin', 'student', 'supervisor'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  duration INT,
  FOREIGN KEY (roleID) REFERENCES Roles(roleID) ON DELETE CASCADE 
);

-- 5. Create User_Status Table
CREATE TABLE IF NOT EXISTS User_Status ( 
  userID CHAR(36) NOT NULL,    -- UUID for userID,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  timeRendered INT,
  status VARCHAR(50) NOT NULL,
  dateIn DATE NOT NULL,
  timeIn VARCHAR(50) NOT NULL,
  timeOut VARCHAR(50) NOT NULL,
  duty VARCHAR(50) NOT NULL,
  PRIMARY KEY (userID), -- User is the primary key
  FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
);

-- 6. Create OJT_Assignments Table with UUID as assignment_id and userID
CREATE TABLE IF NOT EXISTS OJT_Assignments (
  assignment_id CHAR(36) NOT NULL PRIMARY KEY, -- UUID for assignment_id
  userID CHAR(36) NOT NULL, -- UUID for userID
  roleID INT NOT NULL, -- 'student' or 'supervisor'
  start_date DATE,
  end_date DATE,
  total_hours_required INT,
  status VARCHAR(20) DEFAULT 'ongoing', -- 'ongoing', 'completed', 'terminated'
  FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,
  FOREIGN KEY (roleID) REFERENCES Roles(roleID) ON DELETE CASCADE
);

-- 7. Create Daily_Logs Table with UUID for log_id and assignment_id
CREATE TABLE IF NOT EXISTS Daily_Logs (
  log_id CHAR(36) NOT NULL PRIMARY KEY, -- UUID for log_id
  assignment_id CHAR(36) NOT NULL, -- UUID for assignment_id
  date DATE NOT NULL,
  time_in TIME,
  time_out TIME,
  hours_rendered DECIMAL(4,2),
  tasks TEXT,
  remarks TEXT,
  FOREIGN KEY (assignment_id) REFERENCES OJT_Assignments(assignment_id) ON DELETE CASCADE
);

-- 8. Create Evaluations Table with UUID for evaluation_id and assignment_id
CREATE TABLE IF NOT EXISTS Evaluations (
  evaluation_id CHAR(36) NOT NULL PRIMARY KEY, -- UUID for evaluation_id
  assignment_id CHAR(36) NOT NULL, -- UUID for assignment_id
  evaluator_id CHAR(36) NOT NULL, -- UUID for evaluator_id
  date_submitted DATE,
  score INT,
  feedback TEXT,
  FOREIGN KEY (assignment_id) REFERENCES OJT_Assignments(assignment_id) ON DELETE CASCADE,
  FOREIGN KEY (evaluator_id) REFERENCES Users(userID) ON DELETE CASCADE
);

-- 9. Create Attendance Table with UUID for attendance_id and assignment_id
CREATE TABLE IF NOT EXISTS Attendance (
  attendance_id CHAR(36) NOT NULL PRIMARY KEY, -- UUID for attendance_id
  assignment_id CHAR(36) NOT NULL, -- UUID for assignment_id
  date DATE,
  statusID INT NOT NULL, -- Foreign key to Attendance_Status_Types
  FOREIGN KEY (assignment_id) REFERENCES OJT_Assignments(assignment_id) ON DELETE CASCADE,
  FOREIGN KEY (statusID) REFERENCES Attendance_Status_Types(attendanceStatusID) ON DELETE CASCADE
);

-- 10. Create Announcements Table with UUID for announcement_id and posted_by
CREATE TABLE IF NOT EXISTS Announcements (
  announcement_id CHAR(36) NOT NULL PRIMARY KEY, -- UUID for announcement_id
  title VARCHAR(100),
  content TEXT,
  posted_by CHAR(36) NOT NULL, -- UUID for posted_by
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (posted_by) REFERENCES Users(userID) ON DELETE CASCADE
);
