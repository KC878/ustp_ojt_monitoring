
// get

export const getRoles = "SELECT roleID, role FROM Roles";

export const getUserStatus = `SELECT userID, name, email, timeRendered FROM User_Status`;


// post
export const addUser = "INSERT INTO Users (userID, name, email, password, roleID, created_at) VALUES (?, ?, ?, ?, ?, ?)";


// VALIDATOR 

export const checkEmailExist = 'SELECT email FROM Users WHERE email = ?';



//// auth login 

export const loginQuery = 'SELECT userID, name, email, password, roleID FROM Users WHERE email = ?';