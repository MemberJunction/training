-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Submission Persons
-- Item: spCreateSubmissionPerson
-- Generated: 11/20/2024, 2:52:33 PM
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- CREATE PROCEDURE FOR SubmissionPerson
------------------------------------------------------------
DROP PROCEDURE IF EXISTS [abstracts].[spCreateSubmissionPerson]
GO

CREATE PROCEDURE [abstracts].[spCreateSubmissionPerson]
    @SubmissionID int,
    @PersonID int,
    @RoleID uniqueidentifier
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO
    [abstracts].[SubmissionPerson]
        (
            [SubmissionID],
            [PersonID],
            [RoleID]
        )
    VALUES
        (
            @SubmissionID,
            @PersonID,
            @RoleID
        )
    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM [abstracts].[vwSubmissionPersons] WHERE [ID] = SCOPE_IDENTITY()
END
GO
GRANT EXECUTE ON [abstracts].[spCreateSubmissionPerson] TO [cdp_Developer], [cdp_Integration]
    