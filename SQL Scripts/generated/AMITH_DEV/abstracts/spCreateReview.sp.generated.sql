-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Reviews
-- Item: spCreateReview
-- Generated: 11/20/2024, 2:52:33 PM
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- CREATE PROCEDURE FOR Review
------------------------------------------------------------
DROP PROCEDURE IF EXISTS [abstracts].[spCreateReview]
GO

CREATE PROCEDURE [abstracts].[spCreateReview]
    @AssignedAt datetime,
    @SubmissionID int,
    @ReviewerID int,
    @RoleID uniqueidentifier,
    @Score int,
    @Status nvarchar(50),
    @ReviewedAt datetime,
    @Comments nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO
    [abstracts].[Review]
        (
            [AssignedAt],
            [SubmissionID],
            [ReviewerID],
            [RoleID],
            [Score],
            [Status],
            [ReviewedAt],
            [Comments]
        )
    VALUES
        (
            @AssignedAt,
            @SubmissionID,
            @ReviewerID,
            @RoleID,
            @Score,
            @Status,
            @ReviewedAt,
            @Comments
        )
    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM [abstracts].[vwReviews] WHERE [ID] = SCOPE_IDENTITY()
END
GO
GRANT EXECUTE ON [abstracts].[spCreateReview] TO [cdp_Developer], [cdp_Integration]
    