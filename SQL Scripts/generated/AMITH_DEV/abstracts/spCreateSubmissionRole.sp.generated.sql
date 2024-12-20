-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Submission Roles
-- Item: spCreateSubmissionRole
-- Generated: 11/20/2024, 2:52:33 PM
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- CREATE PROCEDURE FOR SubmissionRole
------------------------------------------------------------
DROP PROCEDURE IF EXISTS [abstracts].[spCreateSubmissionRole]
GO

CREATE PROCEDURE [abstracts].[spCreateSubmissionRole]
    @Name nvarchar(100),
    @SubmissionTypeID uniqueidentifier,
    @Description nvarchar(255)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @InsertedRow TABLE ([ID] UNIQUEIDENTIFIER)
    INSERT INTO
    [abstracts].[SubmissionRole]
        (
            [Name],
            [SubmissionTypeID],
            [Description]
        )
    OUTPUT INSERTED.[ID] INTO @InsertedRow
    VALUES
        (
            @Name,
            @SubmissionTypeID,
            @Description
        )
    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM [abstracts].[vwSubmissionRoles] WHERE [ID] = (SELECT [ID] FROM @InsertedRow)
END
GO
GRANT EXECUTE ON [abstracts].[spCreateSubmissionRole] TO [cdp_Integration], [cdp_Developer]
    