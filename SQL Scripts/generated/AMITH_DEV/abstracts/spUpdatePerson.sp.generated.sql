-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Persons
-- Item: spUpdatePerson
-- Generated: 11/19/2024, 11:05:31 AM
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- UPDATE PROCEDURE FOR Person
------------------------------------------------------------
DROP PROCEDURE IF EXISTS [abstracts].[spUpdatePerson]
GO

CREATE PROCEDURE [abstracts].[spUpdatePerson]
    @ID int,
    @FirstName nvarchar(100),
    @LastName nvarchar(100),
    @Email nvarchar(255)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE
        [abstracts].[Person]
    SET
        [FirstName] = @FirstName,
        [LastName] = @LastName,
        [Email] = @Email
    WHERE
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT
                                        *
                                    FROM
                                        [abstracts].[vwPersons]
                                    WHERE
                                        [ID] = @ID
                                    
END
GO

GRANT EXECUTE ON [abstracts].[spUpdatePerson] TO [cdp_Developer], [cdp_Integration]
GO

------------------------------------------------------------
----- TRIGGER FOR __mj_UpdatedAt field for the Person table
------------------------------------------------------------
DROP TRIGGER IF EXISTS [abstracts].trgUpdatePerson
GO
CREATE TRIGGER [abstracts].trgUpdatePerson
ON [abstracts].[Person]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE
        [abstracts].[Person]
    SET
        __mj_UpdatedAt = GETUTCDATE()
    FROM
        [abstracts].[Person] AS _organicTable
    INNER JOIN
        INSERTED AS I ON
        _organicTable.[ID] = I.[ID];
END;
GO
        