-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Submission Roles
-- Item: spCreateSubmissionRole
-- Generated: 11/19/2024, 11:05:31 AM
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
    @SubmissionTypeID uniqueidentifier = '00000000-0000-0000-0000-000000000000',
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
            CASE @SubmissionTypeID WHEN '00000000-0000-0000-0000-000000000000' THEN null ELSE @SubmissionTypeID END,
            @Description
        )
    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM [abstracts].[vwSubmissionRoles] WHERE [ID] = (SELECT [ID] FROM @InsertedRow)
END
GO
GRANT EXECUTE ON [abstracts].[spCreateSubmissionRole] TO [cdp_Integration], [cdp_Developer]
    