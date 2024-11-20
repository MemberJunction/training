-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Submission Types
-- Item: vwSubmissionTypes
-- Generated: 11/20/2024, 2:52:33 PM
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- BASE VIEW FOR ENTITY:      Submission Types
-----               SCHEMA:      abstracts
-----               BASE TABLE:  SubmissionType
-----               PRIMARY KEY: ID
------------------------------------------------------------
DROP VIEW IF EXISTS [abstracts].[vwSubmissionTypes]
GO

CREATE VIEW [abstracts].[vwSubmissionTypes]
AS
SELECT
    s.*,
    SubmissionType_ParentID.[Name] AS [Parent]
FROM
    [abstracts].[SubmissionType] AS s
LEFT OUTER JOIN
    [abstracts].[SubmissionType] AS SubmissionType_ParentID
  ON
    [s].[ParentID] = SubmissionType_ParentID.[ID]
GO
GRANT SELECT ON [abstracts].[vwSubmissionTypes] TO [cdp_Developer], [cdp_UI], [cdp_Integration]
    