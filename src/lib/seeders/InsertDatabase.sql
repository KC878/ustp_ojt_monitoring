-- Insert data into Roles table
INSERT INTO Roles (role) VALUES
  ('admin'),
  ('student'),
  ('supervisor');

-- Insert data into Users table
INSERT INTO Users (userID, name, email, password, roleID, duration) VALUES
  ('123e4567-e89b-12d3-a456-426614174000', 'John Doe', 'johndoe@gmail.com', 'password123', 2, 486),
  ('123e4567-e89b-12d3-a456-426614174001', 'Jane Smith', 'janesmith@gmail.com', 'password456', 3, 486),
  ('123e4567-e89b-12d3-a456-426614174002', 'Alice Johnson', 'alicejohnson@gmail.com', 'password789', 1, 486);