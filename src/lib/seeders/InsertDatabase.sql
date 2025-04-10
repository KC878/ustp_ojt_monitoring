-- 1. Insert Dummy Roles Data
INSERT INTO Roles (role) VALUES 
  ('admin'),
  ('student'),
  ('supervisor');

-- 2. Insert Dummy Status Data
INSERT INTO Status (status) VALUES 
  ('ongoing'),
  ('completed'),
  ('terminated');

-- 3. Insert Dummy Users Data (Generate UUID for userID)
-- Use UUID() in MySQL or generate UUID in your application (e.g., Node.js uuid package)
INSERT INTO Users (userID, email, password, roleID) VALUES 
  (UUID(), 'admin@example.com', 'admin_password', 1),  -- admin
  (UUID(), 'student1@example.com', 'student_password', 2),  -- student
  (UUID(), 'supervisor1@example.com', 'supervisor_password', 3),  -- supervisor
  (UUID(), 'kentcagadas19@gmail.com', '$2a$12$A/pMqTpmEUsqa.3IDkT6beemmaFCra/Pr6DiSjNielNNqCj0qekQq', 2)

-- 4. Insert Dummy OJT_Assignments Data (Generate UUID for assignment_id and link to users)
INSERT INTO OJT_Assignments (assignment_id, userID, roleID, start_date, end_date, total_hours_required, status) VALUES 
  (UUID(), (SELECT userID FROM Users WHERE email = 'student1@example.com'), 2, '2025-01-01', '2025-04-01', 600, 'ongoing'),
  (UUID(), (SELECT userID FROM Users WHERE email = 'student1@example.com'), 2, '2025-05-01', '2025-08-01', 500, 'ongoing'),
  (UUID(), (SELECT userID FROM Users WHERE email = 'supervisor1@example.com'), 3, '2025-01-01', '2025-04-01', 100, 'completed');

-- 5. Insert Dummy Daily_Logs Data (Generate UUID for log_id and link to assignments)
-- Ensure the assignment IDs are correctly fetched or set after insertion
INSERT INTO Daily_Logs (log_id, assignment_id, date, time_in, time_out, hours_rendered, tasks, remarks) VALUES 
  (UUID(), (SELECT assignment_id FROM OJT_Assignments WHERE userID = (SELECT userID FROM Users WHERE email = 'student1@example.com') AND start_date = '2025-01-01' LIMIT 1), '2025-01-02', '08:00:00', '16:00:00', 8, 'Completed assigned tasks', 'No issues'),
  (UUID(), (SELECT assignment_id FROM OJT_Assignments WHERE userID = (SELECT userID FROM Users WHERE email = 'student1@example.com') AND start_date = '2025-05-01' LIMIT 1), '2025-05-02', '09:00:00', '17:00:00', 8, 'Worked on project A', 'No issues'),
  (UUID(), (SELECT assignment_id FROM OJT_Assignments WHERE userID = (SELECT userID FROM Users WHERE email = 'supervisor1@example.com') AND start_date = '2025-01-01' LIMIT 1), '2025-01-02', '10:00:00', '16:00:00', 6, 'Supervised student tasks', 'Everything on track');

-- 6. Insert Dummy Evaluations Data (Generate UUID for evaluation_id and link to assignments and users)
-- Ensure the assignment IDs and user IDs are properly fetched
INSERT INTO Evaluations (evaluation_id, assignment_id, evaluator_id, date_submitted, score, feedback) VALUES 
  (UUID(), (SELECT assignment_id FROM OJT_Assignments WHERE userID = (SELECT userID FROM Users WHERE email = 'student1@example.com') AND start_date = '2025-01-01' LIMIT 1), (SELECT userID FROM Users WHERE email = 'supervisor1@example.com'), '2025-01-10', 85, 'Good performance, needs improvement in time management'),
  (UUID(), (SELECT assignment_id FROM OJT_Assignments WHERE userID = (SELECT userID FROM Users WHERE email = 'student1@example.com') AND start_date = '2025-05-01' LIMIT 1), (SELECT userID FROM Users WHERE email = 'supervisor1@example.com'), '2025-05-10', 90, 'Excellent performance, very efficient'),
  (UUID(), (SELECT assignment_id FROM OJT_Assignments WHERE userID = (SELECT userID FROM Users WHERE email = 'supervisor1@example.com') AND start_date = '2025-01-01' LIMIT 1), (SELECT userID FROM Users WHERE email = 'supervisor1@example.com'), '2025-01-10', 92, 'Great work, keep it up');

-- 7. Insert Dummy Attendance Data (Generate UUID for attendance_id and link to assignments)
-- Ensure the assignment IDs are correctly fetched
INSERT INTO Attendance (attendance_id, assignment_id, date, status) VALUES 
  (UUID(), (SELECT assignment_id FROM OJT_Assignments WHERE userID = (SELECT userID FROM Users WHERE email = 'student1@example.com') AND start_date = '2025-01-01' LIMIT 1), '2025-01-02', 'present'),
  (UUID(), (SELECT assignment_id FROM OJT_Assignments WHERE userID = (SELECT userID FROM Users WHERE email = 'student1@example.com') AND start_date = '2025-05-01' LIMIT 1), '2025-05-02', 'present'),
  (UUID(), (SELECT assignment_id FROM OJT_Assignments WHERE userID = (SELECT userID FROM Users WHERE email = 'supervisor1@example.com') AND start_date = '2025-01-01' LIMIT 1), '2025-01-02', 'late');

-- 8. Insert Dummy Announcements Data (Generate UUID for announcement_id and posted_by)
-- Ensure the user ID for the admin is correctly fetched
INSERT INTO Announcements (announcement_id, title, content, posted_by) VALUES 
  (UUID(), 'New OJT Guidelines', 'The new guidelines for OJT students have been posted.', (SELECT userID FROM Users WHERE email = 'admin@example.com')),
  (UUID(), 'Upcoming Supervisor Meeting', 'There will be a meeting for all supervisors on 2025-03-01.', (SELECT userID FROM Users WHERE email = 'admin@example.com'));
