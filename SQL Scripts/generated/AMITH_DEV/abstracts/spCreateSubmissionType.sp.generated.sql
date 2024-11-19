-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Submission Types
-- Item: spCreateSubmissionType
-- Generated: 11/19/2024, 11:05:31 AM
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- CREATE PROCEDURE FOR SubmissionType
------------------------------------------------------------
DROP PROCEDURE IF EXISTS [abstracts].[spCreateSubmissionType]
GO

CREATE PROCEDURE [abstracts].[spCreateSubmissionType]
    @Name nvarchar(100),
    @ParentID uniqueidentifier = '00000000-0000-0000-0000-000000000000',
    @Type nvarchar(20),
    @SubmissionDeadline datetime,
    @Description nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @InsertedRow TABLE ([ID] UNIQUEIDENTIFIER)
    INSERT INTO
    [abstracts].[SubmissionType]
        (
            [Name],
            [ParentID],
            [Type],
            [SubmissionDeadline],
            [Description]
        )
    OUTPUT INSERTED.[ID] INTO @InsertedRow
    VALUES
        (
            @Name,
            CASE @ParentID WHEN '00000000-0000-0000-0000-000000000000' THEN null ELSE @ParentID END,
            @Type,
            @SubmissionDeadline,
            @Description
        )
    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM [abstracts].[vwSubmissionTypes] WHERE [ID] = (SELECT [ID] FROM @InsertedRow)
END
GO
GRANT EXECUTE ON [abstracts].[spCreateSubmissionType] TO [cdp_Developer], [cdp_Integration]
    