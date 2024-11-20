-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Organizations
-- Item: spDeleteOrganization
-- Generated: 11/20/2024, 2:52:33 PM
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- DELETE PROCEDURE FOR Organization
------------------------------------------------------------
DROP PROCEDURE IF EXISTS [abstracts].[spDeleteOrganization]
GO

CREATE PROCEDURE [abstracts].[spDeleteOrganization]
    @ID int
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM
        [abstracts].[Organization]
    WHERE
        [ID] = @ID


    SELECT @ID AS [ID] -- Return the primary key to indicate we successfully deleted the record
END
GO
GRANT EXECUTE ON [abstracts].[spDeleteOrganization] TO [cdp_Integration]
    