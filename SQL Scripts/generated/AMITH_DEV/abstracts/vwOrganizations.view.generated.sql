-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Organizations
-- Item: vwOrganizations
-- Generated: 11/20/2024, 2:52:33 PM
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- BASE VIEW FOR ENTITY:      Organizations
-----               SCHEMA:      abstracts
-----               BASE TABLE:  Organization
-----               PRIMARY KEY: ID
------------------------------------------------------------
DROP VIEW IF EXISTS [abstracts].[vwOrganizations]
GO

CREATE VIEW [abstracts].[vwOrganizations]
AS
SELECT
    o.*
FROM
    [abstracts].[Organization] AS o
GO
GRANT SELECT ON [abstracts].[vwOrganizations] TO [cdp_Developer], [cdp_UI], [cdp_Integration]
    