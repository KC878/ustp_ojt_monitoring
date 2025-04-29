DELIMITER $$

-- Trigger to insert into User_Status table when a new user is inserted
CREATE TRIGGER after_user_insert
AFTER INSERT ON Users
FOR EACH ROW
BEGIN

    INSERT INTO User_Status (userID, name, email, timeRendered, status, dateIn, timeIn, timeOut, duty)
    VALUES (NEW.userID, NEW.name, NEW.email, 0, 'offline', '1970-01-01', 'empty',  'empty', 'pending');
END $$

DELIMITER ;