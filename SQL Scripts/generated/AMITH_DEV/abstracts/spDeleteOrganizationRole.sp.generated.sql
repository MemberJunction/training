-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Organization Roles
-- Item: spDeleteOrganizationRole
-- Generated: 11/20/2024, 2:52:33 PM
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- DELETE PROCEDURE FOR OrganizationRole
------------------------------------------------------------
DROP PROCEDURE IF EXISTS [abstracts].[spDeleteOrganizationRole]
GO

CREATE PROCEDURE [abstracts].[spDeleteOrganizationRole]
    @ID int
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM
        [abstracts].[OrganizationRole]
    WHERE
        [ID] = @ID


    SELECT @ID AS [ID] -- Return the primary key to indicate we successfully deleted the record
END
GO
GRANT EXECUTE ON [abstracts].[spDeleteOrganizationRole] TO [cdp_Integration]
    