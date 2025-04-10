
export const getRoles = "SELECT roleID, role FROM Roles";


// add
export const addUser = "INSERT INTO Users (userID, name, email, password, roleID, created_at) VALUES (?, ?, ?, ?, ?, ?)";
