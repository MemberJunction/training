DROP PROCEDURE IF EXISTS ${flyway:defaultSchema}.spRecompileAllViews
GO
CREATE PROCEDURE ${flyway:defaultSchema}.spRecompileAllViews
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @ViewSchema NVARCHAR(128);
    DECLARE @ViewName NVARCHAR(128);
    DECLARE @FullViewName NVARCHAR(256);

    -- Cursor to fetch all views with their schema names
    DECLARE cur CURSOR FOR
        SELECT s.name AS SchemaName, v.name AS ViewName
        FROM sys.views v
        INNER JOIN sys.schemas s ON v.schema_id = s.schema_id
		WHERE s.name NOT IN ('sys', 'INFORMATION_SCHEMA'); -- Exclude system schemas

    OPEN cur;
    FETCH NEXT FROM cur INTO @ViewSchema, @ViewName;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        -- Construct the full view name with schema
        SET @FullViewName = QUOTENAME(@ViewSchema) + '.' + QUOTENAME(@ViewName);
        
        -- Refresh the view
        EXEC sp_refreshview @FullViewName;
        
        -- Fetch the next view
        FETCH NEXT FROM cur INTO @ViewSchema, @ViewName;
    END

    -- Clean up
    CLOSE cur;
    DEALLOCATE cur;
END
GO

-- recompiile these two base views 
EXEC sp_refreshview '${flyway:defaultSchema}.vwCompanyIntegrationRuns'
EXEC sp_refreshview '${flyway:defaultSchema}.vwDatasetItems'

GO
-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Company Integration Runs
-- Item: spCreateCompanyIntegrationRun
-- Generated: 10/23/2024, 3:56:09 PM
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- CREATE PROCEDURE FOR CompanyIntegrationRun
------------------------------------------------------------
DROP PROCEDURE IF EXISTS [${flyway:defaultSchema}].[spCreateCompanyIntegrationRun]
GO

CREATE PROCEDURE [${flyway:defaultSchema}].[spCreateCompanyIntegrationRun]
    @CompanyIntegrationID uniqueidentifier,
    @RunByUserID uniqueidentifier,
    @StartedAt datetime,
    @EndedAt datetime,
    @TotalRecords int,
    @Comments nvarchar(MAX),
    @Status nvarchar(20),
    @ErrorLog nvarchar(MAX),
    @ConfigData nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @InsertedRow TABLE ([ID] UNIQUEIDENTIFIER)
    INSERT INTO
    [${flyway:defaultSchema}].[CompanyIntegrationRun]
        (
            [CompanyIntegrationID],
            [RunByUserID],
            [StartedAt],
            [EndedAt],
            [TotalRecords],
            [Comments],
            [Status],
            [ErrorLog],
            [ConfigData]
        )
    OUTPUT INSERTED.[ID] INTO @InsertedRow
    VALUES
        (
            @CompanyIntegrationID,
            @RunByUserID,
            @StartedAt,
            @EndedAt,
            @TotalRecords,
            @Comments,
            @Status,
            @ErrorLog,
            @ConfigData
        )
    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM [${flyway:defaultSchema}].[vwCompanyIntegrationRuns] WHERE [ID] = (SELECT [ID] FROM @InsertedRow)
END
GO
GRANT EXECUTE ON [${flyway:defaultSchema}].[spCreateCompanyIntegrationRun] TO [cdp_Developer], [cdp_Integration]
    

-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Company Integration Runs
-- Item: spUpdateCompanyIntegrationRun
-- Generated: 10/23/2024, 3:56:09 PM
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- UPDATE PROCEDURE FOR CompanyIntegrationRun
------------------------------------------------------------
DROP PROCEDURE IF EXISTS [${flyway:defaultSchema}].[spUpdateCompanyIntegrationRun]
GO

CREATE PROCEDURE [${flyway:defaultSchema}].[spUpdateCompanyIntegrationRun]
    @ID uniqueidentifier,
    @CompanyIntegrationID uniqueidentifier,
    @RunByUserID uniqueidentifier,
    @StartedAt datetime,
    @EndedAt datetime,
    @TotalRecords int,
    @Comments nvarchar(MAX),
    @Status nvarchar(20),
    @ErrorLog nvarchar(MAX),
    @ConfigData nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE
        [${flyway:defaultSchema}].[CompanyIntegrationRun]
    SET
        [CompanyIntegrationID] = @CompanyIntegrationID,
        [RunByUserID] = @RunByUserID,
        [StartedAt] = @StartedAt,
        [EndedAt] = @EndedAt,
        [TotalRecords] = @TotalRecords,
        [Comments] = @Comments,
        [Status] = @Status,
        [ErrorLog] = @ErrorLog,
        [ConfigData] = @ConfigData
    WHERE
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT
                                        *
                                    FROM
                                        [${flyway:defaultSchema}].[vwCompanyIntegrationRuns]
                                    WHERE
                                        [ID] = @ID
                                    
END
GO

GRANT EXECUTE ON [${flyway:defaultSchema}].[spUpdateCompanyIntegrationRun] TO [cdp_Developer], [cdp_Integration]
GO

------------------------------------------------------------
----- TRIGGER FOR ${flyway:defaultSchema}_UpdatedAt field for the CompanyIntegrationRun table
------------------------------------------------------------
DROP TRIGGER IF EXISTS [${flyway:defaultSchema}].trgUpdateCompanyIntegrationRun
GO
CREATE TRIGGER [${flyway:defaultSchema}].trgUpdateCompanyIntegrationRun
ON [${flyway:defaultSchema}].[CompanyIntegrationRun]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE
        [${flyway:defaultSchema}].[CompanyIntegrationRun]
    SET
        ${flyway:defaultSchema}_UpdatedAt = GETUTCDATE()
    FROM
        [${flyway:defaultSchema}].[CompanyIntegrationRun] AS _organicTable
    INNER JOIN
        INSERTED AS I ON
        _organicTable.[ID] = I.[ID];
END;
GO
