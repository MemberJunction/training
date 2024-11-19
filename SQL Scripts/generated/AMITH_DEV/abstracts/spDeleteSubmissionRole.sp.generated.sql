-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Submission Roles
-- Item: spDeleteSubmissionRole
-- Generated: 11/19/2024, 11:05:31 AM
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- DELETE PROCEDURE FOR SubmissionRole
------------------------------------------------------------
DROP PROCEDURE IF EXISTS [abstracts].[spDeleteSubmissionRole]
GO

CREATE PROCEDURE [abstracts].[spDeleteSubmissionRole]
    @ID uniqueidentifier
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM
        [abstracts].[SubmissionRole]
    WHERE
        [ID] = @ID


    SELECT @ID AS [ID] -- Return the primary key to indicate we successfully deleted the record
END
GO
GRANT EXECUTE ON [abstracts].[spDeleteSubmissionRole] TO [cdp_Integration]
    