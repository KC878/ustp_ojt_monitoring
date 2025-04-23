// get

export const selectEmail = "SELECT email FROM USERS WHERE email = ?"
export const getRoles = "SELECT roleID, role FROM Roles";

export const getUserStatus = `SELECT userID, name, email, timeRendered, status, timeIn, timeOut, duty FROM User_Status ORDER BY name`;

export const getDailyDuty = `
  SELECT userID, dateIn, timeIn, timeOut, duty FROM User_Status
  WHERE email = ?
`;

export const getDailyLogs = `
  SELECT email, userID, createdAt
  FROM Daily_Logs
  WHERE email = ? AND 
  createdAt = ? 
`;



// post
export const addUser = "INSERT INTO Users (userID, name, email, password, roleID, created_at) VALUES (?, ?, ?, ?, ?, ?)";


// VALIDATOR 

export const checkEmailExist = 'SELECT email FROM Users WHERE email = ?';



//// auth login 

export const loginQuery = 'SELECT userID, name, email, password, roleID FROM Users WHERE email = ?';


// separate query if the user duty === complete
export const updateStatus = `
  UPDATE User_Status
  SET status = 'active'
  WHERE email = ?
`

export const updateLogin = `
  UPDATE User_Status
  SET status = 'active',
  dateIn = ?, timeIn = ?,
  duty = 'ongoing'
  WHERE email = ?
`;

export const insertDailyLogs = "INSERT INTO Daily_Logs (email, userID, createdAt, timeIn, timeOut) VALUES (?, ?, ?, ?, ?)";



export const afterLogsUpdateStatus = `
  UPDATE User_Status
  SET
  dateIn = '0000-00-00',
  timeIn = 'empty',
  timeOut = 'empty',
  duty = 'pending'
  WHERE email = ?
`;


export const updateDuty = `
  UPDATE User_Status
  SET duty = ?
  WHERE email = ?
`; // set ongoing duty if user first Signed in

///////////////////////


export const updateStatusLogout = `
  UPDATE User_Status
  SET 
  status = 'offline',
  timeOut = ?,
  duty = 'complete'
  WHERE email = ?
`;


// UPDATE TABLE
//     SET 
//     dateIn = '0000-00-00',
//     timeIn = 'empty',
//     timeOut = 'empty',
//     duty = 'pending',
//     WHERE email = 