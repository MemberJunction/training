-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Reviews
-- Item: spDeleteReview
-- Generated: 11/20/2024, 2:52:33 PM
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- DELETE PROCEDURE FOR Review
------------------------------------------------------------
DROP PROCEDURE IF EXISTS [abstracts].[spDeleteReview]
GO

CREATE PROCEDURE [abstracts].[spDeleteReview]
    @ID int
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM
        [abstracts].[Review]
    WHERE
        [ID] = @ID


    SELECT @ID AS [ID] -- Return the primary key to indicate we successfully deleted the record
END
GO
GRANT EXECUTE ON [abstracts].[spDeleteReview] TO [cdp_Integration]
    