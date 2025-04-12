
export const getRoles = "SELECT roleID, role FROM Roles";


// add
export const addUser = "INSERT INTO Users (userID, name, email, password, roleID, created_at) VALUES (?, ?, ?, ?, ?, ?)";


// VALIDATOR 

export const checkEmailExist = 'SELECT email FROM Users WHERE email = ?';



//// auth login 

export const loginQuery = 'SELECT userID, name, email, password, roleID FROM Users WHERE email = ?';