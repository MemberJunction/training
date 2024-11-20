-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Submissions
-- Item: spCreateSubmission
-- Generated: 11/20/2024, 2:52:33 PM
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- CREATE PROCEDURE FOR Submission
------------------------------------------------------------
DROP PROCEDURE IF EXISTS [abstracts].[spCreateSubmission]
GO

CREATE PROCEDURE [abstracts].[spCreateSubmission]
    @SubmittedAt datetime,
    @Title nvarchar(200),
    @Description nvarchar(MAX),
    @Contents nvarchar(MAX),
    @SubmissionTypeID uniqueidentifier,
    @FieldOfStudyID int,
    @Status nvarchar(50)
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO
    [abstracts].[Submission]
        (
            [SubmittedAt],
            [Title],
            [Description],
            [Contents],
            [SubmissionTypeID],
            [FieldOfStudyID],
            [Status]
        )
    VALUES
        (
            @SubmittedAt,
            @Title,
            @Description,
            @Contents,
            @SubmissionTypeID,
            @FieldOfStudyID,
            @Status
        )
    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM [abstracts].[vwSubmissions] WHERE [ID] = SCOPE_IDENTITY()
END
GO
GRANT EXECUTE ON [abstracts].[spCreateSubmission] TO [cdp_Developer], [cdp_Integration]
    