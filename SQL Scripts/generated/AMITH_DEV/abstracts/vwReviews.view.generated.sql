-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Reviews
-- Item: vwReviews
-- Generated: 11/19/2024, 3:57:04 PM
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- BASE VIEW FOR ENTITY:      Reviews
-----               SCHEMA:      abstracts
-----               BASE TABLE:  Review
-----               PRIMARY KEY: ID
------------------------------------------------------------
DROP VIEW IF EXISTS [abstracts].[vwReviews]
GO

CREATE VIEW [abstracts].[vwReviews]
AS
SELECT
    r.*,
    ReviewerRole_RoleID.[Name] AS [Role]
FROM
    [abstracts].[Review] AS r
INNER JOIN
    [abstracts].[ReviewerRole] AS ReviewerRole_RoleID
  ON
    [r].[RoleID] = ReviewerRole_RoleID.[ID]
GO
GRANT SELECT ON [abstracts].[vwReviews] TO [cdp_Developer], [cdp_UI], [cdp_Integration]
    