
// get

export const getRoles = "SELECT roleID, role FROM Roles";

export const getUserStatus = `SELECT userID, name, email, timeRendered, status, timeIn, timeOut, duty FROM User_Status`;

export const getDailyDuty = `
  SELECT timeIn, timeOut, duty FROM User_Status
  WHERE email = ?
`;


// post
export const addUser = "INSERT INTO Users (userID, name, email, password, roleID, created_at) VALUES (?, ?, ?, ?, ?, ?)";


// VALIDATOR 

export const checkEmailExist = 'SELECT email FROM Users WHERE email = ?';



//// auth login 

export const loginQuery = 'SELECT userID, name, email, password, roleID FROM Users WHERE email = ?';

export const updateStatus = `
  UPDATE User_Status
  SET status = 'active'
  WHERE email = ?
`;

export const updateTimeIn = `
  UPDATE User_Status
  SET timeIn = ?
  WHERE email = ?
`;

export const updateTimeOut = `
  UPDATE User_Status
  SET timeOut = ?
  WHERE email = ?
`;

export const updateDuty = `
  UPDATE User_Status
  SET duty = 'ongoing'
  WHERE email = ?
`; // set ongoing duty if user first Signed in

///////////////////////


export const updateStatusLogout = `
  UPDATE User_Status
  SET status = 'offline'
  WHERE email = ?
`;