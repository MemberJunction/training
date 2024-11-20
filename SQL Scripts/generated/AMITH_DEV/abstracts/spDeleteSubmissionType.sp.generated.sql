-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Submission Types
-- Item: spDeleteSubmissionType
-- Generated: 11/20/2024, 2:52:33 PM
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- DELETE PROCEDURE FOR SubmissionType
------------------------------------------------------------
DROP PROCEDURE IF EXISTS [abstracts].[spDeleteSubmissionType]
GO

CREATE PROCEDURE [abstracts].[spDeleteSubmissionType]
    @ID uniqueidentifier
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM
        [abstracts].[SubmissionType]
    WHERE
        [ID] = @ID


    SELECT @ID AS [ID] -- Return the primary key to indicate we successfully deleted the record
END
GO
GRANT EXECUTE ON [abstracts].[spDeleteSubmissionType] TO [cdp_Integration]
    