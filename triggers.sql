DELIMITER $$
CREATE TRIGGER UserInsertion
	BEFORE INSERT ON User
    	FOR EACH ROW
		BEGIN
		    IF EXISTS (SELECT userName
			       FROM User
                               WHERE userName = NEW.userName)
			THEN SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'This username is already being used, please try another username.';
		    END IF;
        	END $$
DELIMITER ;
