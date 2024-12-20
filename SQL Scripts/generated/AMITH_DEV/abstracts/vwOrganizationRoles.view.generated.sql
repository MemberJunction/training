-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Organization Roles
-- Item: vwOrganizationRoles
-- Generated: 11/20/2024, 2:52:33 PM
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- BASE VIEW FOR ENTITY:      Organization Roles
-----               SCHEMA:      abstracts
-----               BASE TABLE:  OrganizationRole
-----               PRIMARY KEY: ID
------------------------------------------------------------
DROP VIEW IF EXISTS [abstracts].[vwOrganizationRoles]
GO

CREATE VIEW [abstracts].[vwOrganizationRoles]
AS
SELECT
    o.*
FROM
    [abstracts].[OrganizationRole] AS o
GO
GRANT SELECT ON [abstracts].[vwOrganizationRoles] TO [cdp_Integration], [cdp_UI], [cdp_Developer]
    