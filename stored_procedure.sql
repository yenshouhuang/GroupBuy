DELIMITER $$
CREATE PROCEDURE AnalyzeUser()
BEGIN
	DECLARE varUserId INT;
	DECLARE varTotalPostNum INT;
	DECLARE varuserEngagement VARCHAR(255);
    DECLARE varMostFreCategory VARCHAR(255);
	DECLARE loop_exit BOOLEAN DEFAULT FALSE;
	DECLARE curInfo CURSOR FOR (SELECT userId, COUNT(postId) AS NumOfPost
                                    FROM User NATURAL JOIN Post
                                    GROUP BY userId
                                    );

	DECLARE CONTINUE HANDLER FOR NOT FOUND SET loop_exit = TRUE;

        DROP TABLE AnalyzedTable;

        CREATE TABLE AnalyzedTable(
		userId INT PRIMARY KEY,
        	MostFreCategory VARCHAR(255),
        	userEngagement VARCHAR(255));


	OPEN curInfo;
	cloop: LOOP
		FETCH curInfo INTO varUserId, varTotalPostNum;
		IF loop_exit THEN
			LEAVE cloop;
		END IF;

        	IF (varTotalPostNum >=100) THEN
			SET varuserEngagement = 'Very High Engagement';
		ELSEIF (varTotalPostNum >= 50 AND varTotalPostNum < 100) THEN
			SET varuserEngagement = 'High Engagement';
		ELSEIF (varTotalPostNum >= 10 AND varTotalPostNum < 50) THEN
			SET varuserEngagement = 'Medium Engagement';
		ELSEIF (varTotalPostNum > 0 AND varTotalPostNum < 10) THEN
			SET varuserEngagement = 'Low Engagement';
		ELSE
			SET varuserEngagement = 'No Engagement';
		END IF;

		SELECT categoryName
		INTO varMostFreCategory
		FROM (SELECT userId, categoryId, categoryName, ct_category,
		      RANK() OVER (PARTITION BY userId ORDER BY ct_category DESC) AS rnk
		      FROM (SELECT userId, categoryId,categoryName, COUNT(categoryId) AS ct_category
			    FROM Post NATURAL JOIN Category
			    GROUP BY userId, categoryId
			    HAVING userId = varUserId
			    ORDER BY userId, count(categoryId) DESC) temp) x
		WHERE x.rnk = 1
		LIMIT 1 ;

		INSERT INTO AnalyzedTable
		VALUE (varUserId, varMostFreCategory,varuserEngagement);

	END LOOP cloop;
	CLOSE curInfo;

	SELECT *
        FROM AnalyzedTable
        ORDER BY userId;
END$$
DELIMITER ;
