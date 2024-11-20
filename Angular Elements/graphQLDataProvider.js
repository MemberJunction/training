"use strict";
/**************************************************************************************************************
 * The graphQLDataProvider provides a data provider for the entities framework that uses GraphQL to communicate
 * with the server.
 * In practice - this FILE will NOT exist in the entities library, we need to move to its own separate project
 * so it is only included by the consumer of the entities library if they want to use it.
**************************************************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLTransactionGroup = exports.GraphQLDataProvider = exports.GraphQLProviderConfigData = void 0;
const core_1 = require("@memberjunction/core");
const core_entities_1 = require("@memberjunction/core-entities");
const graphql_request_1 = require("graphql-request");
const idb_1 = require("@tempfix/idb");
const rxjs_1 = require("rxjs");
const graphql_ws_1 = require("graphql-ws");
const FieldMapper_1 = require("./FieldMapper");
class GraphQLProviderConfigData extends core_1.ProviderConfigDataBase {
    /**
     * Token is the JWT token that is used to authenticate the user with the server
     */
    get Token() { return this.Data.Token; }
    set Token(token) { this.Data.Token = token; }
    /**
     * URL is the URL to the GraphQL endpoint
     */
    get URL() { return this.Data.URL; }
    /**
     * WSURL is the URL to the GraphQL websocket endpoint. This is used for subscriptions, if you are not using subscriptions, you can pass in a blank string for this
     */
    get WSURL() { return this.Data.WSURL; }
    /**
     * RefreshTokenFunction is a function that can be called by the GraphQLDataProvider whenever it receives an exception that the JWT it has already is expired
     */
    get RefreshTokenFunction() { return this.Data.RefreshFunction; }
    /**
     *
     * @param token Token is the JWT token that is used to authenticate the user with the server
     * @param url the URL to the GraphQL endpoint
     * @param wsurl the URL to the GraphQL websocket endpoint. This is used for subscriptions, if you are not using subscriptions, you can pass in a blank string for this
     * @param refreshTokenFunction is a function that can be called by the GraphQLDataProvider whenever it receives an exception that the JWT it has already is expired
     * @param MJCoreSchemaName the name of the MJ Core schema, if it is not the default name of __mj
     * @param includeSchemas optional, an array of schema names to include in the metadata. If not passed, all schemas are included
     * @param excludeSchemas optional, an array of schema names to exclude from the metadata. If not passed, no schemas are excluded
     */
    constructor(token, url, wsurl, refreshTokenFunction, MJCoreSchemaName, includeSchemas, excludeSchemas) {
        super({
            Token: token,
            URL: url,
            WSURL: wsurl,
            RefreshTokenFunction: refreshTokenFunction,
        }, MJCoreSchemaName, includeSchemas, excludeSchemas);
    }
}
exports.GraphQLProviderConfigData = GraphQLProviderConfigData;
// The GraphQLDataProvider implements both the IEntityDataProvider and IMetadataProvider interfaces.
class GraphQLDataProvider extends core_1.ProviderBase {
    constructor() {
        super(...arguments);
        this._innerCurrentUserQueryString = `CurrentUser {
        ${this.userInfoString()}
        UserRolesArray {
            ${this.userRoleInfoString()}
        }
    }
    `;
        this._currentUserQuery = (0, graphql_request_1.gql) `query CurrentUserAndRoles {
        ${this._innerCurrentUserQueryString}
    }`;
        this._wsClient = null;
        this._pushStatusRequests = [];
    }
    get ConfigData() { return GraphQLDataProvider._configData; }
    GenerateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
    async Config(configData) {
        try {
            // FIRST, set up the GraphQL client
            if (GraphQLDataProvider._sessionId === undefined)
                GraphQLDataProvider._sessionId = this.GenerateUUID();
            GraphQLDataProvider._configData = configData;
            // now create the new client, if it isn't alreayd created
            if (!GraphQLDataProvider._client)
                GraphQLDataProvider._client = GraphQLDataProvider.CreateNewGraphQLClient(configData.URL, configData.Token, GraphQLDataProvider._sessionId);
            return super.Config(configData); // now parent class can do it's config
        }
        catch (e) {
            (0, core_1.LogError)(e);
            throw (e);
        }
    }
    get sessionId() {
        return GraphQLDataProvider._sessionId;
    }
    get AllowRefresh() {
        return true; // this provider doesn't have any issues with allowing refreshes at any time
    }
    async GetCurrentUser() {
        const d = await GraphQLDataProvider.ExecuteGQL(this._currentUserQuery, null);
        if (d) {
            (0, core_1.LogStatus)("GetCurrentUser", undefined, d.CurrentUser);
            (0, core_1.LogStatus)(Object.keys(d.CurrentUser).join(", "));
            (0, core_1.LogStatus)("test");
            // convert the user and the user roles _mj__*** fields back to __mj_***
            const u = this.ConvertBackToMJFields(d.CurrentUser);
            const roles = u.UserRolesArray.map(r => this.ConvertBackToMJFields(r));
            u.UserRolesArray = roles;
            return new core_1.UserInfo(this, { ...u, UserRoles: roles }); // need to pass in the UserRoles as a separate property that is what is expected here
        }
    }
    /**************************************************************************/
    // START ---- IRunReportProvider
    /**************************************************************************/
    async RunReport(params, contextUser) {
        const query = (0, graphql_request_1.gql) `
        query GetReportDataQuery ($ReportID: String!) {
            GetReportData(ReportID: $ReportID) {
                Success
                Results
                RowCount
                ExecutionTime
                ErrorMessage
            }
        }`;
        const result = await GraphQLDataProvider.ExecuteGQL(query, { ReportID: params.ReportID });
        if (result && result.GetReportData)
            return {
                ReportID: params.ReportID,
                Success: result.GetReportData.Success,
                Results: JSON.parse(result.GetReportData.Results),
                RowCount: result.GetReportData.RowCount,
                ExecutionTime: result.GetReportData.ExecutionTime,
                ErrorMessage: result.GetReportData.ErrorMessage,
            };
    }
    /**************************************************************************/
    // END ---- IRunReportProvider
    /**************************************************************************/
    /**************************************************************************/
    // START ---- IRunQueryProvider
    /**************************************************************************/
    async RunQuery(params, contextUser) {
        const query = (0, graphql_request_1.gql) `
        query GetQueryDataQuery ($QueryID: String!) {
            GetQueryData(QueryID: $QueryID) {
                Success
                Results
                RowCount
                ExecutionTime
                ErrorMessage
            }
        }`;
        const result = await GraphQLDataProvider.ExecuteGQL(query, { QueryID: params.QueryID });
        if (result && result.GetQueryData)
            return {
                QueryID: params.QueryID,
                Success: result.GetQueryData.Success,
                Results: JSON.parse(result.GetQueryData.Results),
                RowCount: result.GetQueryData.RowCount,
                ExecutionTime: result.GetQueryData.ExecutionTime,
                ErrorMessage: result.GetQueryData.ErrorMessage,
            };
    }
    /**************************************************************************/
    // END ---- IRunReportProvider
    /**************************************************************************/
    /**************************************************************************/
    // START ---- IRunViewProvider
    /**************************************************************************/
    async RunView(params, contextUser) {
        try {
            let qName = '';
            let paramType = '';
            if (params) {
                const innerParams = {};
                let entity, viewEntity;
                if (params.ViewEntity) {
                    viewEntity = params.ViewEntity;
                    entity = viewEntity.Entity;
                }
                else {
                    const { entityName, v } = await this.getEntityNameAndUserView(params, contextUser);
                    viewEntity = v;
                    entity = entityName;
                }
                // get entity metadata
                const e = this.Entities.find(e => e.Name === entity);
                if (!e)
                    throw new Error(`Entity ${entity} not found in metadata`);
                let dynamicView = false;
                if (params.ViewID) {
                    qName = `Run${e.ClassName}ViewByID`;
                    paramType = 'RunViewByIDInput';
                    innerParams.ViewID = params.ViewID;
                }
                else if (params.ViewName) {
                    qName = `Run${e.ClassName}ViewByName`;
                    paramType = 'RunViewByNameInput';
                    innerParams.ViewName = params.ViewName;
                }
                else {
                    dynamicView = true;
                    qName = `Run${e.ClassName}DynamicView`;
                    paramType = 'RunDynamicViewInput';
                    innerParams.EntityName = params.EntityName;
                }
                innerParams.ExtraFilter = params.ExtraFilter ? params.ExtraFilter : '';
                innerParams.OrderBy = params.OrderBy ? params.OrderBy : '';
                innerParams.UserSearchString = params.UserSearchString ? params.UserSearchString : '';
                innerParams.Fields = params.Fields; // pass it straight through, either null or array of strings
                innerParams.IgnoreMaxRows = params.IgnoreMaxRows ? params.IgnoreMaxRows : false;
                innerParams.MaxRows = params.MaxRows ? params.MaxRows : 0;
                innerParams.ForceAuditLog = params.ForceAuditLog ? params.ForceAuditLog : false;
                innerParams.ResultType = params.ResultType ? params.ResultType : 'simple';
                if (params.AuditLogDescription && params.AuditLogDescription.length > 0)
                    innerParams.AuditLogDescription = params.AuditLogDescription;
                if (!dynamicView) {
                    innerParams.ExcludeUserViewRunID = params.ExcludeUserViewRunID ? params.ExcludeUserViewRunID : "";
                    innerParams.ExcludeDataFromAllPriorViewRuns = params.ExcludeDataFromAllPriorViewRuns ? params.ExcludeDataFromAllPriorViewRuns : false;
                    innerParams.OverrideExcludeFilter = params.OverrideExcludeFilter ? params.OverrideExcludeFilter : '';
                    innerParams.SaveViewResults = params.SaveViewResults ? params.SaveViewResults : false;
                }
                const fieldList = this.getViewRunTimeFieldList(e, viewEntity, params, dynamicView);
                const query = (0, graphql_request_1.gql) `
                    query RunViewQuery ($input: ${paramType}!) {
                    ${qName}(input: $input) {
                        Results {
                            ${fieldList.join("\n                        ")}
                        }
                        UserViewRunID
                        RowCount
                        TotalRowCount
                        ExecutionTime
                        Success
                        ErrorMessage
                    }
                }`;
                const viewData = await GraphQLDataProvider.ExecuteGQL(query, { input: innerParams });
                if (viewData && viewData[qName]) {
                    // now, if we have any results in viewData that are for the CodeName, we need to convert them to the Name
                    // so that the caller gets back what they expect
                    const results = viewData[qName].Results;
                    if (results && results.length > 0) {
                        const codeNameDiffFields = e.Fields.filter(f => f.CodeName !== f.Name && f.CodeName !== undefined);
                        results.forEach(r => {
                            // for _mj__ results, we need to convert them back to the Name
                            this.ConvertBackToMJFields(r);
                            codeNameDiffFields.forEach(f => {
                                r[f.Name] = r[f.CodeName];
                                // delete r[f.CodeName];  // Leave the CodeName in the results, it is useful to have both
                            });
                        });
                    }
                    return viewData[qName];
                }
            }
            else
                throw ("No parameters passed to RunView");
            return null;
        }
        catch (e) {
            (0, core_1.LogError)(e);
            throw (e);
        }
    }
    async getEntityNameAndUserView(params, contextUser) {
        let entityName;
        let v;
        if (!params.EntityName) {
            if (params.ViewID) {
                v = await core_entities_1.ViewInfo.GetViewEntity(params.ViewID, contextUser);
                entityName = v.Entity;
            }
            else if (params.ViewName) {
                v = await core_entities_1.ViewInfo.GetViewEntityByName(params.ViewName, contextUser);
                entityName = v.Entity;
            }
            else
                throw new Error(`No EntityName, ViewID or ViewName passed to RunView`);
        }
        else
            entityName = params.EntityName;
        return { entityName, v };
    }
    getViewRunTimeFieldList(e, v, params, dynamicView) {
        const fieldList = [];
        const mapper = new FieldMapper_1.FieldMapper();
        if (params.Fields) {
            for (const kv of e.PrimaryKeys) {
                if (params.Fields.find(f => f.trim().toLowerCase() === kv.Name.toLowerCase()) === undefined)
                    fieldList.push(kv.Name); // always include the primary key fields in view run time field list
            }
            // now add any other fields that were passed in
            params.Fields.forEach(f => {
                fieldList.push(mapper.MapFieldName(f));
            });
        }
        else {
            // no fields were passed in. So, let's check to see if we are running an dynamic view.
            // If so, we need to include all fields since the caller didn't specify the fields they want
            // otherwise, we include the fields that are part of the view definition.
            if (dynamicView) {
                // include all fields since no fields were passed in
                e.Fields.forEach(f => {
                    if (!f.IsBinaryFieldType) {
                        fieldList.push(mapper.MapFieldName(f.CodeName));
                    }
                });
            }
            else {
                // NOTE: in the below, c.EntityField SHOULD always exist, however there is a possibility that at some point a VIEW was created that used fields
                // and those fields are NO LONGER part of an entity, in that situation we should just remove them, rather than letting the whole view blow up which
                // would happen if we dno't check for c.EntityField? in the below
                // first make sure we have the primary key field in the view column list, always should, but make sure
                for (const kv of e.PrimaryKeys) {
                    if (fieldList.find(f => f.trim().toLowerCase() === kv.Name.toLowerCase()) === undefined)
                        fieldList.push(kv.Name); // always include the primary key fields in view run time field list
                }
                // Now: include the fields that are part of the view definition
                v.Columns.forEach(c => {
                    if (c.hidden === false && !fieldList.find(item => item.trim().toLowerCase() === c.EntityField?.Name.trim().toLowerCase())) { // don't include hidden fields and don't include the pkey field again
                        if (!c.EntityField) {
                            // this can happen if a field was previously included in a view, but is no longer part of the entity
                            // simply don't include it in the field list
                        }
                        else
                            fieldList.push(mapper.MapFieldName(c.EntityField.CodeName));
                    }
                });
            }
        }
        return fieldList;
    }
    /**************************************************************************/
    // END ---- IRunViewProvider
    /**************************************************************************/
    /**************************************************************************/
    // START ---- IEntityDataProvider
    /**************************************************************************/
    get ProviderType() {
        return core_1.ProviderType.Network;
    }
    async GetRecordChanges(entityName, primaryKey) {
        try {
            const p = {
                EntityName: 'Record Changes',
                ExtraFilter: `RecordID = '${primaryKey.Values()}' AND Entity = '${entityName}'`,
                //OrderBy: 'ChangedAt DESC',
            };
            const result = await this.RunView(p);
            if (result) {
                // sort the results client side because, for now, the RunViewParams doesn't support OrderBy dynamically like we tried. Later change this to do via the SQL query
                return result.Results.sort((a, b) => {
                    return (a.ChangedAt > b.ChangedAt) ? -1 : 1; // sort descending on the date.... GraphQL passes back the date as time since base date
                });
            }
            else
                return null;
        }
        catch (e) {
            (0, core_1.LogError)(e);
            throw (e);
        }
    }
    /**
     * Returns a list of dependencies - records that are linked to the specified Entity/KeyValuePairs combination. A dependency is as defined by the relationships in the database. The MemberJunction metadata that is used
     * for this simply reflects the foreign key relationships that exist in the database. The CodeGen tool is what detects all of the relationships and generates the metadata that is used by MemberJunction. The metadata in question
     * is within the EntityField table and specifically the RelatedEntity and RelatedEntityField columns. In turn, this method uses that metadata and queries the database to determine the dependencies. To get the list of entity dependencies
     * you can use the utility method GetEntityDependencies(), which doesn't check for dependencies on a specific record, but rather gets the metadata in one shot that can be used for dependency checking.
     * @param entityName the name of the entity to check
     * @param KeyValuePairs the KeyValuePairs of the record to check
     */
    async GetRecordDependencies(entityName, primaryKey) {
        try {
            // execute the gql query to get the dependencies
            const query = (0, graphql_request_1.gql) `query GetRecordDependenciesQuery ($entityName: String!, $CompositeKey: CompositeKeyInputType!) {
                GetRecordDependencies(entityName: $entityName, CompositeKey: $CompositeKey) {
                    EntityName
                    RelatedEntityName
                    FieldName
                    CompositeKey {
                        KeyValuePairs {
                            FieldName
                            Value
                        }
                    }
                }
            }`;
            // now we have our query built, execute it
            const vars = {
                entityName: entityName,
                CompositeKey: { KeyValuePairs: this.ensureKeyValuePairValueIsString(primaryKey.KeyValuePairs) }
            };
            const data = await GraphQLDataProvider.ExecuteGQL(query, vars);
            return data?.GetRecordDependencies; // shape of the result should exactly match the RecordDependency type
        }
        catch (e) {
            (0, core_1.LogError)(e);
            throw (e);
        }
    }
    ensureKeyValuePairValueIsString(kvps) {
        return kvps.map(kv => {
            return { FieldName: kv.FieldName, Value: kv.Value.toString() };
        });
    }
    async GetRecordDuplicates(params, contextUser) {
        if (!params) {
            return null;
        }
        const query = (0, graphql_request_1.gql) `query GetRecordDuplicatesQuery ($params: PotentialDuplicateRequestType!) {
            GetRecordDuplicates(params: $params) {
                Status
                ErrorMessage
                PotentialDuplicateResult {
                    EntityID
                    DuplicateRunDetailMatchRecordIDs
                    RecordPrimaryKeys {
                        KeyValuePairs {
                            FieldName
                            Value
                    }
                }
                    Duplicates {
                        ProbabilityScore
                        KeyValuePairs {
                            FieldName
                            Value
                        }
                    }
                }
            }
        }`;
        let request = {
            EntityID: params.EntityID,
            EntityDocumentID: params.EntityDocumentID,
            ListID: params.ListID,
            ProbabilityScore: params.ProbabilityScore,
            Options: params.Options,
            RecordIDs: params.RecordIDs.map(recordID => {
                return recordID.Copy();
            })
        };
        const data = await GraphQLDataProvider.ExecuteGQL(query, { params: request });
        if (data && data.GetRecordDuplicates) {
            return data.GetRecordDuplicates;
        }
    }
    async MergeRecords(request) {
        const e = this.Entities.find(e => e.Name.trim().toLowerCase() === request.EntityName.trim().toLowerCase());
        if (!e || !e.AllowRecordMerge)
            throw new Error(`Entity ${request.EntityName} does not allow record merging, check the AllowRecordMerge property in the entity metadata`);
        try {
            // execute the gql query to get the dependencies
            const mutation = (0, graphql_request_1.gql) `mutation MergeRecordsMutation ($request: RecordMergeRequest!) {
                MergeRecords(request: $request) {
                    Success
                    OverallStatus
                    RecordMergeLogID
                    RecordStatus {
                        CompositeKey {
                            KeyValuePairs {
                                FieldName
                                Value
                            }
                        }
                        Success
                        RecordMergeDeletionLogID
                        Message
                    }
                }
            }`;
            // create a new request that is compatible with the server's expectations where field maps and also the primary key values are all strings
            const newRequest = {
                EntityName: request.EntityName,
                SurvivingRecordCompositeKey: { KeyValuePairs: this.ensureKeyValuePairValueIsString(request.SurvivingRecordCompositeKey.KeyValuePairs) },
                FieldMap: request.FieldMap?.map(fm => {
                    return {
                        FieldName: fm.FieldName,
                        Value: fm.Value.toString() // turn the value into a string, since that is what the server expects
                    };
                }),
                RecordsToMerge: request.RecordsToMerge.map(r => {
                    return r.Copy();
                })
            };
            // now we have our query built, execute it
            const data = await GraphQLDataProvider.ExecuteGQL(mutation, { request: newRequest });
            return data?.MergeRecords; // shape of the result should exactly match the RecordDependency type
        }
        catch (e) {
            (0, core_1.LogError)(e);
            return {
                Success: false,
                OverallStatus: e && e.message ? e.message : e,
                RecordStatus: [],
                RecordMergeLogID: "",
                Request: request,
            };
            throw (e);
        }
    }
    async Save(entity, user, options) {
        const result = new core_1.BaseEntityResult();
        try {
            entity.RegisterTransactionPreprocessing(); // as of the time of writing, this isn't technically needed because we are not doing any async preprocessing, but it is good to have it here for future use in case something is added with async between here and the TransactionItem being added.
            const vars = { input: {} };
            const type = entity.IsSaved ? "Update" : "Create";
            result.StartedAt = new Date();
            result.Type = entity.IsSaved ? 'update' : 'create';
            result.OriginalValues = entity.Fields.map(f => { return { FieldName: f.CodeName, Value: f.Value }; });
            entity.ResultHistory.push(result); // push the new result as we have started a process
            // Create the query for the mutation first, we will provide the specific
            // input values later in the loop below. Here we are just setting up the mutation
            // and the fields that will be returned since the mutation returns back the latest
            // values for the entity and we need to have those values to update the entity after the
            // save
            const mutationName = `${type}${entity.EntityInfo.ClassName}`;
            // only pass along writable fields, AND the PKEY value if this is an update
            const filteredFields = entity.Fields.filter(f => !f.ReadOnly || (f.IsPrimaryKey && entity.IsSaved));
            const mapper = new FieldMapper_1.FieldMapper();
            const inner = `                ${mutationName}(input: $input) {
                ${entity.Fields.map(f => mapper.MapFieldName(f.CodeName)).join("\n                    ")}
            }`;
            const outer = (0, graphql_request_1.gql) `mutation ${type}${entity.EntityInfo.ClassName} ($input: ${mutationName}Input!) {
                ${inner}
            }
            `;
            for (let i = 0; i < filteredFields.length; i++) {
                const f = filteredFields[i];
                let val = f.Value;
                if (val && f.EntityFieldInfo.TSType === core_1.EntityFieldTSType.Date)
                    val = val.getTime();
                if (val && f.EntityFieldInfo.TSType === core_1.EntityFieldTSType.Boolean && typeof val !== 'boolean')
                    val = parseInt(val) === 0 ? false : true; // convert to boolean
                if (val == null && f.EntityFieldInfo.AllowsNull == false) {
                    if (f.EntityFieldInfo.DefaultValue != null) {
                        // no value, but there is a default value, so use that, since field does NOT allow NULL
                        val = f.EntityFieldInfo.DefaultValue;
                    }
                    else {
                        // no default value, null value and field doesn't allow nulls, so set to either 0 or empty string
                        if (f.FieldType == core_1.EntityFieldTSType.Number || f.FieldType == core_1.EntityFieldTSType.Boolean)
                            val = 0;
                        else
                            val = '';
                    }
                }
                vars.input[f.CodeName] = val;
            }
            // now add an OldValues prop to the vars IF the type === 'update'
            if (type.trim().toLowerCase() === 'update') {
                const ov = [];
                entity.Fields.forEach(f => {
                    const val = f.OldValue ? (typeof f.OldValue === 'string' ? f.OldValue : f.OldValue.toString()) : null;
                    ov.push({ Key: f.CodeName, Value: val }); // pass ALL old values to server, slightly inefficient but we want full record
                });
                vars.input['OldValues___'] = ov; // add the OldValues prop to the input property that is part of the vars already
            }
            if (entity.TransactionGroup) {
                return new Promise((resolve, reject) => {
                    const mutationInputTypes = [
                        {
                            varName: 'input',
                            inputType: mutationName + 'Input!'
                        }
                    ];
                    entity.RaiseReadyForTransaction(); // let the entity know we're ready to be part of the transaction
                    // we are part of a transaction group, so just add our query to the list
                    // and when the transaction is committed, we will send all the queries at once
                    entity.TransactionGroup.AddTransaction(new core_1.TransactionItem(entity, inner, vars, { mutationName,
                        mutationInputTypes: mutationInputTypes }, (results, success) => {
                        // we get here whenever the transaction group does gets around to committing
                        // our query. We need to update our entity with the values that were returned
                        // from the mutation if it was successful.
                        result.EndedAt = new Date();
                        if (success && results) {
                            // got our data, send it back to the caller, which is the entity object
                            // and that object needs to update itself from this data.
                            result.Success = true;
                            resolve(this.ConvertBackToMJFields(results));
                        }
                        else {
                            // the transaction failed, nothing to update, but we need to call Reject so the
                            // promise resolves with a rejection so our outer caller knows
                            result.Success = false;
                            result.Message = 'Transaction failed';
                            reject();
                        }
                    }));
                });
            }
            else {
                // not part of a transaction group, so just go for it and send across our GQL
                const d = await GraphQLDataProvider.ExecuteGQL(outer, vars);
                if (d && d[type + entity.EntityInfo.ClassName]) {
                    result.Success = true;
                    result.EndedAt = new Date();
                    const ret = this.ConvertBackToMJFields(d[type + entity.EntityInfo.ClassName]);
                    return ret;
                }
                else
                    throw new Error(`Save failed for ${entity.EntityInfo.ClassName}`);
            }
        }
        catch (e) {
            result.Success = false;
            result.EndedAt = new Date();
            result.Message = e.response?.errors?.length > 0 ? e.response.errors[0].message : e.message;
            (0, core_1.LogError)(e);
            return null;
        }
    }
    async Load(entity, primaryKey, EntityRelationshipsToLoad = null, user) {
        try {
            const vars = {};
            let pkeyInnerParamString = '';
            let pkeyOuterParamString = '';
            for (let i = 0; i < primaryKey.KeyValuePairs.length; i++) {
                const field = entity.Fields.find(f => f.Name.trim().toLowerCase() === primaryKey.KeyValuePairs[i].FieldName.trim().toLowerCase()).EntityFieldInfo;
                const val = primaryKey.GetValueByIndex(i);
                const pkeyGraphQLType = field.GraphQLType;
                // build up the param string for the outer query definition
                if (pkeyOuterParamString.length > 0)
                    pkeyOuterParamString += ', ';
                pkeyOuterParamString += `$${field.CodeName}: ${pkeyGraphQLType}!`;
                // build up the param string for the inner query call
                if (pkeyInnerParamString.length > 0)
                    pkeyInnerParamString += ', ';
                pkeyInnerParamString += `${field.CodeName}: $${field.CodeName}`;
                // build up the variables we are passing along to the query
                if (field.TSType === core_1.EntityFieldTSType.Number) {
                    if (isNaN(primaryKey.GetValueByIndex(i)))
                        throw new Error(`Primary Key value ${val} (${field.Name}) is not a valid number`);
                    vars[field.CodeName] = parseInt(val); // converting to number here for graphql type to work properly
                }
                else
                    vars[field.CodeName] = val;
            }
            const rel = EntityRelationshipsToLoad && EntityRelationshipsToLoad.length > 0 ? this.getRelatedEntityString(entity.EntityInfo, EntityRelationshipsToLoad) : '';
            const mapper = new FieldMapper_1.FieldMapper();
            const query = (0, graphql_request_1.gql) `query Single${entity.EntityInfo.ClassName}${rel.length > 0 ? 'Full' : ''} (${pkeyOuterParamString}) {
                ${entity.EntityInfo.ClassName}(${pkeyInnerParamString}) {
                                    ${entity.Fields.filter((f) => !f.EntityFieldInfo.IsBinaryFieldType)
                .map((f) => {
                if (f.EntityFieldInfo.Name.trim().toLowerCase().startsWith('__mj_')) {
                    // fields that start with __mj_ need to be converted to _mj__ for the GraphQL query
                    return f.CodeName.replace('__mj_', '_mj__');
                }
                else {
                    return f.CodeName;
                }
            })
                .join('\n                    ')}
                    ${rel}
                }
            }
            `;
            const d = await GraphQLDataProvider.ExecuteGQL(query, vars);
            if (d && d[entity.EntityInfo.ClassName]) {
                // the resulting object has all the values in it, but we need to convert any elements that start with _mj__ back to __mj_
                return this.ConvertBackToMJFields(d[entity.EntityInfo.ClassName]);
            }
            else
                return null;
        }
        catch (e) {
            (0, core_1.LogError)(e);
            return null;
        }
    }
    /**
     * This method will convert back any fields that start with _mj__ back to __mj_ so that the entity object can properly update itself with the data that was returned from the server
     * @param ret
     * @returns
     */
    ConvertBackToMJFields(ret) {
        const mapper = new FieldMapper_1.FieldMapper();
        mapper.ReverseMapFields(ret);
        return ret; // clean object to pass back here
    }
    getRelatedEntityString(entityInfo, EntityRelationshipsToLoad) {
        let rel = '';
        for (let i = 0; i < entityInfo.RelatedEntities.length; i++) {
            if (EntityRelationshipsToLoad.indexOf(entityInfo.RelatedEntities[i].RelatedEntity) >= 0) {
                const r = entityInfo.RelatedEntities[i];
                const re = this.Entities.find(e => e.ID === r.RelatedEntityID);
                rel += `
                ${re.CodeName} {
                    ${re.Fields.map(f => f.CodeName).join("\n                    ")}
                }
                `;
            }
        }
        return rel;
    }
    async Delete(entity, options, user) {
        const result = new core_1.BaseEntityResult();
        try {
            entity.RegisterTransactionPreprocessing();
            result.StartedAt = new Date();
            result.Type = 'delete';
            result.OriginalValues = entity.Fields.map(f => { return { FieldName: f.CodeName, Value: f.Value }; });
            entity.ResultHistory.push(result); // push the new result as we have started a process
            const vars = {};
            const mutationInputTypes = [];
            let pkeyInnerParamString = '';
            let pkeyOuterParamString = '';
            let returnValues = '';
            for (let kv of entity.PrimaryKey.KeyValuePairs) {
                const pk = entity.Fields.find(f => f.Name.trim().toLowerCase() === kv.FieldName.trim().toLowerCase()); // get the field for the primary key field
                vars[pk.CodeName] = pk.Value;
                mutationInputTypes.push({ varName: pk.CodeName, inputType: pk.EntityFieldInfo.GraphQLType + '!' }); // only used when doing a transaction group, but it is easier to do in this main loop
                if (pkeyInnerParamString.length > 0)
                    pkeyInnerParamString += ', ';
                pkeyInnerParamString += `${pk.CodeName}: $${pk.CodeName}`;
                if (pkeyOuterParamString.length > 0)
                    pkeyOuterParamString += ', ';
                pkeyOuterParamString += `$${pk.CodeName}: ${pk.EntityFieldInfo.GraphQLType}!`;
                if (returnValues.length > 0)
                    returnValues += '\n                    ';
                returnValues += `${pk.CodeName}`;
            }
            mutationInputTypes.push({ varName: "options___", inputType: 'DeleteOptionsInput!' }); // only used when doing a transaction group, but it is easier to do in this main loop
            vars["options___"] = options ? options : { SkipEntityAIActions: false, SkipEntityActions: false };
            const queryName = 'Delete' + entity.EntityInfo.ClassName;
            const inner = (0, graphql_request_1.gql) `${queryName}(${pkeyInnerParamString}, options___: $options___) {
                ${returnValues}
            }
            `;
            const query = (0, graphql_request_1.gql) `mutation ${queryName} (${pkeyOuterParamString}, $options___: DeleteOptionsInput!) {
                ${inner}
            }
            `;
            if (entity.TransactionGroup) {
                // we have a transaction group, need to play nice and be part of it
                entity.RaiseReadyForTransaction();
                return new Promise((resolve, reject) => {
                    // we are part of a transaction group, so just add our query to the list
                    // and when the transaction is committed, we will send all the queries at once
                    entity.TransactionGroup.AddTransaction(new core_1.TransactionItem(entity, inner, vars, { mutationName: queryName,
                        mutationInputTypes: mutationInputTypes }, (results, success) => {
                        // we get here whenever the transaction group does gets around to committing
                        // our query.
                        result.EndedAt = new Date(); // done processing
                        if (success && results) {
                            // success indicated by the entity.PrimaryKey.Value matching the return value of the mutation
                            let success = true;
                            for (const pk of entity.PrimaryKey.KeyValuePairs) {
                                // check each primary key value to see if it matches the return value of the mutation
                                if (pk.Value !== results[pk.FieldName]) {
                                    success = false;
                                }
                            }
                            if (success) {
                                result.Success = true;
                                resolve(true);
                            }
                            else {
                                // the transaction failed, nothing to update, but we need to call Reject so the
                                // promise resolves with a rejection so our outer caller knows
                                result.Success = false;
                                result.Message = 'Transaction failed to commit';
                                reject();
                            }
                        }
                        else {
                            // the transaction failed, nothing to update, but we need to call Reject so the
                            // promise resolves with a rejection so our outer caller knows
                            result.Success = false;
                            result.Message = 'Transaction failed to commit';
                            reject();
                        }
                    }));
                });
            }
            else {
                // no transaction just go for it
                const d = await GraphQLDataProvider.ExecuteGQL(query, vars);
                if (d && d[queryName]) {
                    const data = d[queryName];
                    for (let key of entity.PrimaryKey.KeyValuePairs) {
                        // we want to now compare key.Value against data[key.FieldName]
                        let returnedVal = data[key.FieldName];
                        let originalVal = key.Value;
                        // we want to ignore types so we should convert numbers to strings for the comparison
                        if (typeof originalVal === 'number')
                            originalVal = originalVal.toString();
                        if (typeof returnedVal === 'number')
                            returnedVal = returnedVal.toString();
                        // now compare the two values
                        if (originalVal !== returnedVal) {
                            throw new Error(`Primary key value mismatch in server Delete response. Field: ${key.FieldName}, Original: ${originalVal}, Returned: ${returnedVal}`);
                        }
                    }
                    result.Success = true;
                    result.EndedAt = new Date(); // done processing
                    return true; // all of the return values match the primary key values, so we are good and delete worked
                }
                else
                    throw new Error(`Delete failed for ${entity.EntityInfo.Name}: ${entity.PrimaryKey.ToString()} `);
            }
        }
        catch (e) {
            result.EndedAt = new Date(); // done processing
            result.Success = false;
            result.Message = e.response?.errors?.length > 0 ? e.response.errors[0].message : e.message;
            (0, core_1.LogError)(e);
            return false;
        }
    }
    /**************************************************************************/
    // END ---- IEntityDataProvider
    /**************************************************************************/
    /**************************************************************************/
    // START ---- IMetadataProvider
    /**************************************************************************/
    async GetDatasetByName(datasetName, itemFilters) {
        const query = (0, graphql_request_1.gql) `query GetDatasetByName($DatasetName: String!, $ItemFilters: [DatasetItemFilterTypeGQL!]) {
            GetDatasetByName(DatasetName: $DatasetName, ItemFilters: $ItemFilters) {
                DatasetID
                DatasetName
                Success
                Status
                LatestUpdateDate
                Results
            }
        }`;
        const data = await GraphQLDataProvider.ExecuteGQL(query, { DatasetName: datasetName, ItemFilters: itemFilters });
        if (data && data.GetDatasetByName && data.GetDatasetByName.Success) {
            return {
                DatasetID: data.GetDatasetByName.DatasetID,
                DatasetName: data.GetDatasetByName.DatasetName,
                Success: data.GetDatasetByName.Success,
                Status: data.GetDatasetByName.Status,
                LatestUpdateDate: new Date(data.GetDatasetByName.LatestUpdateDate),
                Results: JSON.parse(data.GetDatasetByName.Results)
            };
        }
        else {
            return {
                DatasetID: "",
                DatasetName: datasetName,
                Success: false,
                Status: 'Unknown',
                LatestUpdateDate: null,
                Results: null
            };
        }
    }
    async GetDatasetStatusByName(datasetName, itemFilters) {
        const query = (0, graphql_request_1.gql) `query GetDatasetStatusByName($DatasetName: String!, $ItemFilters: [DatasetItemFilterTypeGQL!]) {
            GetDatasetStatusByName(DatasetName: $DatasetName, ItemFilters: $ItemFilters) {
                DatasetID
                DatasetName
                Success
                Status
                LatestUpdateDate
                EntityUpdateDates
            }
        }`;
        const data = await GraphQLDataProvider.ExecuteGQL(query, { DatasetName: datasetName, ItemFilters: itemFilters });
        if (data && data.GetDatasetStatusByName && data.GetDatasetStatusByName.Success) {
            return {
                DatasetID: data.GetDatasetStatusByName.DatasetID,
                DatasetName: data.GetDatasetStatusByName.DatasetName,
                Success: data.GetDatasetStatusByName.Success,
                Status: data.GetDatasetStatusByName.Status,
                LatestUpdateDate: new Date(data.GetDatasetStatusByName.LatestUpdateDate),
                EntityUpdateDates: JSON.parse(data.GetDatasetStatusByName.EntityUpdateDates)
            };
        }
        else {
            return {
                DatasetID: "",
                DatasetName: datasetName,
                Success: false,
                Status: 'Unknown',
                LatestUpdateDate: null,
                EntityUpdateDates: null
            };
        }
    }
    async CreateTransactionGroup() {
        return new GraphQLTransactionGroup();
    }
    async GetRecordFavoriteStatus(userId, entityName, primaryKey) {
        const valResult = primaryKey.Validate();
        if (!valResult.IsValid)
            return false;
        const e = this.Entities.find(e => e.Name === entityName);
        if (!e)
            throw new Error(`Entity ${entityName} not found in metadata`);
        const query = (0, graphql_request_1.gql) `query GetRecordFavoriteStatus($params: UserFavoriteSearchParams!) {
            GetRecordFavoriteStatus(params: $params) {
                Success
                IsFavorite
            }
        }`;
        const data = await GraphQLDataProvider.ExecuteGQL(query, { params: {
                UserID: userId,
                EntityID: e.ID,
                CompositeKey: { KeyValuePairs: this.ensureKeyValuePairValueIsString(primaryKey.KeyValuePairs) }
            }
        });
        if (data && data.GetRecordFavoriteStatus && data.GetRecordFavoriteStatus.Success)
            return data.GetRecordFavoriteStatus.IsFavorite;
    }
    async SetRecordFavoriteStatus(userId, entityName, primaryKey, isFavorite, contextUser) {
        const e = this.Entities.find(e => e.Name === entityName);
        if (!e) {
            throw new Error(`Entity ${entityName} not found in metadata`);
        }
        const query = (0, graphql_request_1.gql) `mutation SetRecordFavoriteStatus($params: UserFavoriteSetParams!) {
            SetRecordFavoriteStatus(params: $params){
                Success
            }
        }`;
        const data = await GraphQLDataProvider.ExecuteGQL(query, { params: {
                UserID: userId,
                EntityID: e.ID,
                CompositeKey: { KeyValuePairs: this.ensureKeyValuePairValueIsString(primaryKey.KeyValuePairs) },
                IsFavorite: isFavorite
            }
        });
        if (data && data.SetRecordFavoriteStatus !== null)
            return data.SetRecordFavoriteStatus.Success;
    }
    async GetEntityRecordName(entityName, primaryKey) {
        if (!entityName || !primaryKey || primaryKey.KeyValuePairs?.length === 0) {
            return null;
        }
        const query = (0, graphql_request_1.gql) `query GetEntityRecordNameQuery ($EntityName: String!, $CompositeKey: CompositeKeyInputType!) {
            GetEntityRecordName(EntityName: $EntityName, CompositeKey: $CompositeKey) {
                Success
                Status
                RecordName
            }
        }`;
        const data = await GraphQLDataProvider.ExecuteGQL(query, {
            EntityName: entityName,
            CompositeKey: { KeyValuePairs: this.ensureKeyValuePairValueIsString(primaryKey.KeyValuePairs) }
        });
        if (data && data.GetEntityRecordName && data.GetEntityRecordName.Success)
            return data.GetEntityRecordName.RecordName;
    }
    async GetEntityRecordNames(info) {
        if (!info)
            return null;
        const query = (0, graphql_request_1.gql) `query GetEntityRecordNamesQuery ($info: [EntityRecordNameInput!]!) {
            GetEntityRecordNames(info: $info) {
                Success
                Status
                CompositeKey {
                    KeyValuePairs {
                        FieldName
                        Value
                    }
                }
                EntityName
                RecordName
            }
        }`;
        const data = await GraphQLDataProvider.ExecuteGQL(query, { info: info.map(i => {
                return {
                    EntityName: i.EntityName,
                    CompositeKey: { KeyValuePairs: this.ensureKeyValuePairValueIsString(i.CompositeKey.KeyValuePairs) }
                };
            }) });
        if (data && data.GetEntityRecordNames)
            return data.GetEntityRecordNames;
    }
    static async ExecuteGQL(query, variables, refreshTokenIfNeeded = true) {
        try {
            const data = await GraphQLDataProvider._client.request(query, variables);
            return data;
        }
        catch (e) {
            if (e && e.response && e.response.errors?.length > 0) { //e.code === 'JWT_EXPIRED') {
                const error = e.response.errors[0];
                const code = error?.extensions?.code?.toUpperCase().trim();
                if (code === 'JWT_EXPIRED') {
                    if (refreshTokenIfNeeded) {
                        // token expired, so we need to refresh it and try again
                        await GraphQLDataProvider.RefreshToken();
                        return await GraphQLDataProvider.ExecuteGQL(query, variables, false /*don't attempt to refresh again*/);
                    }
                    else {
                        // token expired but the caller doesn't want a refresh, so just return the error
                        (0, core_1.LogError)(`JWT_EXPIRED and refreshTokenIfNeeded is false`);
                        throw e;
                    }
                }
                else
                    throw e;
            }
            else {
                (0, core_1.LogError)(e);
                throw e; // force the caller to handle the error
            }
        }
    }
    static async RefreshToken() {
        if (GraphQLDataProvider._configData.Data.RefreshTokenFunction) {
            const newToken = await GraphQLDataProvider._configData.Data.RefreshTokenFunction();
            if (newToken) {
                GraphQLDataProvider._configData.Token = newToken; // update the token
                GraphQLDataProvider._client = this.CreateNewGraphQLClient(GraphQLDataProvider._configData.URL, GraphQLDataProvider._configData.Token, GraphQLDataProvider._sessionId);
            }
            else {
                throw new Error('Refresh token function returned null or undefined token');
            }
        }
        else {
            throw new Error('No refresh token function provided');
        }
    }
    static CreateNewGraphQLClient(url, token, sessionId) {
        return new graphql_request_1.GraphQLClient(url, {
            headers: {
                authorization: 'Bearer ' + token,
                'x-session-id': sessionId
            }
        });
    }
    userInfoString() {
        return this.infoString(new core_1.UserInfo(null, null));
    }
    userRoleInfoString() {
        return this.infoString(new core_1.UserRoleInfo(null));
    }
    infoString(object) {
        let sOutput = '';
        const keys = Object.keys(object);
        for (const k of keys) {
            if (k.startsWith('__mj_')) {
                sOutput += k.replace('__mj_', '_mj__') + '\n            ';
            }
            else if (!k.startsWith('_')) {
                sOutput += k + '\n            ';
            }
        }
        return sOutput;
    }
    get LocalStorageProvider() {
        if (!this._localStorageProvider)
            this._localStorageProvider = new BrowserIndexedDBStorageProvider();
        return this._localStorageProvider;
    }
    /**************************************************************************/
    // END ---- IMetadataProvider
    /**************************************************************************/
    get Metadata() {
        return this;
    }
    PushStatusUpdates(sessionId = null) {
        if (!sessionId)
            sessionId = this.sessionId;
        if (!this._wsClient)
            this._wsClient = (0, graphql_ws_1.createClient)({
                url: this.ConfigData.WSURL,
                connectionParams: {
                    Authorization: 'Bearer ' + this.ConfigData.Token,
                },
            });
        const existingRequest = this._pushStatusRequests.find(r => r.sessionId === sessionId);
        if (existingRequest)
            return existingRequest.observable;
        const SUBSCRIBE_TO_STATUS = (0, graphql_request_1.gql) `subscription StatusUpdates($sessionId: String!) {
            statusUpdates(sessionId: $sessionId) {
                date
                message
                sessionId
            }
        }
        `;
        const newObservable = new rxjs_1.Observable((observer) => {
            const unsubscribe = this._wsClient.subscribe({ query: SUBSCRIBE_TO_STATUS, variables: { sessionId } }, {
                next: (data) => {
                    return observer.next(data.data.statusUpdates);
                },
                error: (error) => {
                    return observer.error(error);
                },
                complete: () => {
                    return observer.complete();
                },
            });
            return () => {
                // Cleanup logic
                console.log('would unsub here');
                //unsubscribe();
            };
        });
        this._pushStatusRequests.push({ sessionId, observable: newObservable });
        return newObservable;
    }
}
exports.GraphQLDataProvider = GraphQLDataProvider;
// this class implements a simple in-memory only storage as a fallback if the browser doesn't support local storage
class BrowserStorageProviderBase {
    constructor() {
        this._localStorage = {};
    }
    async getItem(key) {
        return new Promise((resolve) => {
            if (this._localStorage.hasOwnProperty(key))
                resolve(this._localStorage[key]);
            else
                resolve(null);
        });
    }
    async setItem(key, value) {
        return new Promise((resolve) => {
            this._localStorage[key] = value;
            resolve();
        });
    }
    async remove(key) {
        return new Promise((resolve) => {
            if (this._localStorage.hasOwnProperty(key)) {
                delete this._localStorage[key];
            }
            resolve();
        });
    }
}
// This implementation just wraps the browser local storage and if for some reason the browser doesn't
// have a localStorage object, we just use a simple object to store the data in memory.
class BrowserLocalStorageProvider extends BrowserStorageProviderBase {
    async getItem(key) {
        if (localStorage)
            return localStorage.getItem(key);
        else
            return await super.getItem(key);
    }
    async setItem(key, value) {
        if (localStorage)
            localStorage.setItem(key, value);
        else
            await super.setItem(key, value);
    }
    async remove(key) {
        if (localStorage)
            localStorage.removeItem(key);
        else
            await super.remove(key);
    }
}
const IDB_DB_NAME = 'MJ_Metadata';
const IDB_DB_ObjectStoreName = 'Metadata_KVPairs';
class BrowserIndexedDBStorageProvider extends BrowserStorageProviderBase {
    constructor() {
        super();
        this.dbPromise = (0, idb_1.openDB)(IDB_DB_NAME, 1, {
            upgrade(db) {
                if (!db.objectStoreNames.contains(IDB_DB_ObjectStoreName)) {
                    db.createObjectStore(IDB_DB_ObjectStoreName);
                }
            },
        });
    }
    async setItem(key, value) {
        const db = await this.dbPromise;
        const tx = db.transaction(IDB_DB_ObjectStoreName, 'readwrite');
        await tx.objectStore(IDB_DB_ObjectStoreName).put(value, key);
        await tx.done;
    }
    async getItem(key) {
        const db = await this.dbPromise;
        const value = await db.transaction(IDB_DB_ObjectStoreName).objectStore(IDB_DB_ObjectStoreName).get(key);
        return value;
    }
    async remove(key) {
        const db = await this.dbPromise;
        const tx = db.transaction(IDB_DB_ObjectStoreName, 'readwrite');
        await tx.objectStore(IDB_DB_ObjectStoreName).delete(key);
        await tx.done;
    }
}
class GraphQLTransactionGroup extends core_1.TransactionGroupBase {
    async HandleSubmit(items) {
        // iterate through each instruction and build up the combined query string 
        // and the combined variables object
        let combinedQuery = '';
        let mutationParams = '';
        const combinedVars = {};
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            let itemMutation = item.Instruction;
            if (item.Vars) {
                const keys = Object.keys(item.Vars);
                // rename the variables to avoid collisions and aggregate the varisables
                // from the item into our combined variables
                for (let j = 0; j < keys.length; j++) {
                    const key = keys[j];
                    const newKey = `${key}_${i}`;
                    combinedVars[newKey] = item.Vars[key];
                    const keyRegEx = new RegExp('\\$' + key, 'g'); // Create the RegExp dynamically with the global flag.
                    itemMutation = itemMutation.replace(keyRegEx, '$' + newKey);
                    const mutationInputType = item.ExtraData.mutationInputTypes.find((t) => t.varName === key)?.inputType;
                    //{varName: pk.CodeName, inputType: pk.EntityFieldInfo.GraphQLType + '!'}
                    mutationParams += `$${newKey}: ${mutationInputType} \n`;
                }
            }
            // add in the specific mutation and give it an alias so we can easily figure out the results
            // from each of them and pass back properly
            combinedQuery += `mutation_${i}: ` + itemMutation + '\n';
        }
        combinedQuery = `mutation TransactionGroup(${mutationParams}){ \n` + combinedQuery + '\n}'; // wrap it up in a mutation so we can execute it
        const execResults = await GraphQLDataProvider.ExecuteGQL(combinedQuery, combinedVars);
        const returnResults = [];
        for (let i = 0; i < items.length; i++) {
            /// NEED TO TEST TO SEE WHAT ORDER WE GET RESULTS BACK AS
            const result = execResults[`mutation_${i}`];
            const item = items[i];
            returnResults.push(new core_1.TransactionResult(item, result, result !== null));
        }
        return returnResults;
    }
}
exports.GraphQLTransactionGroup = GraphQLTransactionGroup;
//# sourceMappingURL=graphQLDataProvider.js.map