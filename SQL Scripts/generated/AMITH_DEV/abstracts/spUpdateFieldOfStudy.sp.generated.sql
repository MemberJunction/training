-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Field Of Studies
-- Item: spUpdateFieldOfStudy
-- Generated: 11/20/2024, 2:52:33 PM
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- UPDATE PROCEDURE FOR FieldOfStudy
------------------------------------------------------------
DROP PROCEDURE IF EXISTS [abstracts].[spUpdateFieldOfStudy]
GO

CREATE PROCEDURE [abstracts].[spUpdateFieldOfStudy]
    @ID int,
    @NameOfField nvarchar(255)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE
        [abstracts].[FieldOfStudy]
    SET
        [NameOfField] = @NameOfField
    WHERE
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT
                                        *
                                    FROM
                                        [abstracts].[vwFieldOfStudies]
                                    WHERE
                                        [ID] = @ID
                                    
END
GO

GRANT EXECUTE ON [abstracts].[spUpdateFieldOfStudy] TO [cdp_Developer], [cdp_Integration]
GO

------------------------------------------------------------
----- TRIGGER FOR __mj_UpdatedAt field for the FieldOfStudy table
------------------------------------------------------------
DROP TRIGGER IF EXISTS [abstracts].trgUpdateFieldOfStudy
GO
CREATE TRIGGER [abstracts].trgUpdateFieldOfStudy
ON [abstracts].[FieldOfStudy]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE
        [abstracts].[FieldOfStudy]
    SET
        __mj_UpdatedAt = GETUTCDATE()
    FROM
        [abstracts].[FieldOfStudy] AS _organicTable
    INNER JOIN
        INSERTED AS I ON
        _organicTable.[ID] = I.[ID];
END;
GO
        