-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Submission Roles
-- Item: vwSubmissionRoles
-- Generated: 11/20/2024, 2:52:33 PM
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- BASE VIEW FOR ENTITY:      Submission Roles
-----               SCHEMA:      abstracts
-----               BASE TABLE:  SubmissionRole
-----               PRIMARY KEY: ID
------------------------------------------------------------
DROP VIEW IF EXISTS [abstracts].[vwSubmissionRoles]
GO

CREATE VIEW [abstracts].[vwSubmissionRoles]
AS
SELECT
    s.*,
    SubmissionType_SubmissionTypeID.[Name] AS [SubmissionType]
FROM
    [abstracts].[SubmissionRole] AS s
LEFT OUTER JOIN
    [abstracts].[SubmissionType] AS SubmissionType_SubmissionTypeID
  ON
    [s].[SubmissionTypeID] = SubmissionType_SubmissionTypeID.[ID]
GO
GRANT SELECT ON [abstracts].[vwSubmissionRoles] TO [cdp_UI], [cdp_Integration], [cdp_Developer]
    