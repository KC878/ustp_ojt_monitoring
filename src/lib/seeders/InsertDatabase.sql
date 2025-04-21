-- Insert data into Roles table
INSERT INTO Roles (role) VALUES
  ('admin'),
  ('student'),
  ('supervisor');

-- Insert data into Attendance_Status_Types table
INSERT INTO Attendance_Status_Types (status) VALUES
  ('present'),
  ('absent'),
  ('late'),
  ('on-leave');

-- Insert data into Users table
-- INSERT INTO Users (userID, name, email, password, roleID, duration) VALUES
--   ('123e4567-e89b-12d3-a456-426614174000', 'John Doe', 'johndoe@gmail.com', 'password123', 2, 486),
--   ('123e4567-e89b-12d3-a456-426614174001', 'Jane Smith', 'janesmith@gmail.com', 'password456', 3, 486),
--   ('123e4567-e89b-12d3-a456-426614174002', 'Alice Johnson', 'alicejohnson@gmail.com', 'password789', 1, 486);


-- Insert data into OJT_Assignments table
INSERT INTO OJT_Assignments (assignment_id, userID, roleID, start_date, end_date, total_hours_required, status) VALUES
  ('123e4567-e89b-12d3-a456-426614174100', '123e4567-e89b-12d3-a456-426614174000', 2, '2025-01-01', '2025-05-01', 480, 'ongoing'),
  ('123e4567-e89b-12d3-a456-426614174101', '123e4567-e89b-12d3-a456-426614174001', 3, '2025-02-01', '2025-06-01', 480, 'completed');

-- Insert data into Daily_Logs table
INSERT INTO Daily_Logs (log_id, assignment_id, date, time_in, time_out, hours_rendered, tasks, remarks) VALUES
  ('123e4567-e89b-12d3-a456-426614174200', '123e4567-e89b-12d3-a456-426614174100', '2025-01-05', '08:00:00', '16:00:00', 8.00, 'Completed tasks A and B', 'Good work'),
  ('123e4567-e89b-12d3-a456-426614174201', '123e4567-e89b-12d3-a456-426614174101', '2025-02-15', '09:00:00', '17:00:00', 8.00, 'Assisted with project C', 'Completed successfully');

-- Insert data into Evaluations table
INSERT INTO Evaluations (evaluation_id, assignment_id, evaluator_id, date_submitted, score, feedback) VALUES
  ('123e4567-e89b-12d3-a456-426614174300', '123e4567-e89b-12d3-a456-426614174100', '123e4567-e89b-12d3-a456-426614174001', '2025-05-02', 85, 'Good performance, needs improvement in time management'),
  ('123e4567-e89b-12d3-a456-426614174301', '123e4567-e89b-12d3-a456-426614174101', '123e4567-e89b-12d3-a456-426614174002', '2025-06-05', 90, 'Excellent work throughout the project');

-- Insert data into Attendance table
INSERT INTO Attendance (attendance_id, assignment_id, date, statusID) VALUES
  ('123e4567-e89b-12d3-a456-426614174400', '123e4567-e89b-12d3-a456-426614174100', '2025-01-05', 1), -- Present
  ('123e4567-e89b-12d3-a456-426614174401', '123e4567-e89b-12d3-a456-426614174101', '2025-02-15', 2); -- Absent

-- Insert data into Announcements table
INSERT INTO Announcements (announcement_id, title, content, posted_by) VALUES
  ('123e4567-e89b-12d3-a456-426614174500', 'OJT Update', 'The next OJT session will start on 2025-01-01. All students must attend.', '123e4567-e89b-12d3-a456-426614174002'),
  ('123e4567-e89b-12d3-a456-426614174501', 'Project Deadline', 'The project deadline for the current OJT assignment is 2025-06-01.', '123e4567-e89b-12d3-a456-426614174000');
