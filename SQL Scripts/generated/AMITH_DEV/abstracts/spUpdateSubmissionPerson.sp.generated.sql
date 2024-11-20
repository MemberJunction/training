-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Submission Persons
-- Item: spUpdateSubmissionPerson
-- Generated: 11/20/2024, 2:52:33 PM
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- UPDATE PROCEDURE FOR SubmissionPerson
------------------------------------------------------------
DROP PROCEDURE IF EXISTS [abstracts].[spUpdateSubmissionPerson]
GO

CREATE PROCEDURE [abstracts].[spUpdateSubmissionPerson]
    @ID int,
    @SubmissionID int,
    @PersonID int,
    @RoleID uniqueidentifier
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE
        [abstracts].[SubmissionPerson]
    SET
        [SubmissionID] = @SubmissionID,
        [PersonID] = @PersonID,
        [RoleID] = @RoleID
    WHERE
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT
                                        *
                                    FROM
                                        [abstracts].[vwSubmissionPersons]
                                    WHERE
                                        [ID] = @ID
                                    
END
GO

GRANT EXECUTE ON [abstracts].[spUpdateSubmissionPerson] TO [cdp_Developer], [cdp_Integration]
GO

------------------------------------------------------------
----- TRIGGER FOR __mj_UpdatedAt field for the SubmissionPerson table
------------------------------------------------------------
DROP TRIGGER IF EXISTS [abstracts].trgUpdateSubmissionPerson
GO
CREATE TRIGGER [abstracts].trgUpdateSubmissionPerson
ON [abstracts].[SubmissionPerson]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE
        [abstracts].[SubmissionPerson]
    SET
        __mj_UpdatedAt = GETUTCDATE()
    FROM
        [abstracts].[SubmissionPerson] AS _organicTable
    INNER JOIN
        INSERTED AS I ON
        _organicTable.[ID] = I.[ID];
END;
GO
        