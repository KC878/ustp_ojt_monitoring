-- Insert data into Roles table
INSERT INTO Roles (role) VALUES
  ('admin'),
  ('student'),
  ('supervisor');

-- Insert data into Users table
INSERT INTO Users (userID, name, email, password, roleID) VALUES
  ('123e4567-e89b-12d3-a456-426614174000', 'Supervisor A.', 'supervisor@gmail.com', '$2b$10$kdIxAeO5h42QOkxxvCEw0uMPrHpvLrGhfr70w4wet6SeUuozLbHmS', 2);
  
INSERT INTO Schools (schoolID, schoolName) VALUES
('AMA CDO', 'AMA Computer University – Cagayan de Oro Campus'),
('BMC', 'Blessed Mother College'),
('BSU-MOGCHS ESC', 'Bukidnon State University – MOGCHS External Study Center'),
('BSU-Sugbongcogon ESC', 'Bukidnon State University – Sugbongcogon External Study Center'),
('CCCDO', 'City College of Cagayan de Oro'),
('COC-PHINMA', 'Cagayan de Oro College – PHINMA Education Network'),
('CU', 'Capitol University'),
('IICDO', 'Informatics Institute – Cagayan de Oro'),
('LDCU', 'Liceo de Cagayan University'),
('LC', 'Lourdes College'),
('OBC', 'Oro Bible College'),
('PCC', 'Pilgrim Christian College'),
('SPC', 'Southern de Oro Philippines College'),
('STI CDO', 'STI College – Cagayan de Oro'),
('USTP', 'University of Science and Technology of Southern Philippines'),
('XU', 'Xavier University – Ateneo de Cagayan');
