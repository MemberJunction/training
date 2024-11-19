-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Submission Persons
-- Item: spDeleteSubmissionPerson
-- Generated: 11/19/2024, 11:05:31 AM
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- DELETE PROCEDURE FOR SubmissionPerson
------------------------------------------------------------
DROP PROCEDURE IF EXISTS [abstracts].[spDeleteSubmissionPerson]
GO

CREATE PROCEDURE [abstracts].[spDeleteSubmissionPerson]
    @ID int
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM
        [abstracts].[SubmissionPerson]
    WHERE
        [ID] = @ID


    SELECT @ID AS [ID] -- Return the primary key to indicate we successfully deleted the record
END
GO
GRANT EXECUTE ON [abstracts].[spDeleteSubmissionPerson] TO [cdp_Integration]
    