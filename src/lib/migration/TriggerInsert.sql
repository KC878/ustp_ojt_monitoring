DELIMITER $$

-- Trigger to insert into User_Status table when a new user is inserted
CREATE TRIGGER after_user_insert
AFTER INSERT ON Users
FOR EACH ROW
BEGIN
    -- Insert a record into User_Status with the default 'inactive' loginStatusID
    INSERT INTO User_Status (userID, name, email, timeRendered, status, timeIn, timeOut, duty)
    VALUES (NEW.userID, NEW.name, NEW.email, 486, 'offline', 'empty', 'empty', 'pending');
END $$

DELIMITER ;