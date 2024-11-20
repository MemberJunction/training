import { BaseEntity, EntitySaveOptions, CompositeKey } from "@memberjunction/core";
import { RegisterClass } from "@memberjunction/global";
import { z } from "zod";

export const loadModule = () => {
  // no-op, only used to ensure this file is a valid module and to allow easy loading
}

     
 
/**
 * zod schema definition for the entity Field Of Studies
 */
export const FieldOfStudySchema = z.object({
    ID: z.number().describe(`
        * * Field Name: ID
        * * Display Name: ID
        * * SQL Data Type: int
    * * Description: Primary key identifier for the field of study.`),
    NameOfField: z.string().describe(`
        * * Field Name: NameOfField
        * * Display Name: Name Of Field
        * * SQL Data Type: nvarchar(255)
    * * Description: The name of the field of study.`),
    __mj_CreatedAt: z.date().describe(`
        * * Field Name: __mj_CreatedAt
        * * Display Name: Created At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    __mj_UpdatedAt: z.date().describe(`
        * * Field Name: __mj_UpdatedAt
        * * Display Name: Updated At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
});

export type FieldOfStudyEntityType = z.infer<typeof FieldOfStudySchema>;

/**
 * zod schema definition for the entity Organization Roles
 */
export const OrganizationRoleSchema = z.object({
    ID: z.number().describe(`
        * * Field Name: ID
        * * Display Name: ID
        * * SQL Data Type: int
    * * Description: Primary key identifier for the organization role.`),
    RoleName: z.string().describe(`
        * * Field Name: RoleName
        * * Display Name: Role Name
        * * SQL Data Type: nvarchar(255)
    * * Description: Name of the role in the organization.`),
    __mj_CreatedAt: z.date().describe(`
        * * Field Name: __mj_CreatedAt
        * * Display Name: Created At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    __mj_UpdatedAt: z.date().describe(`
        * * Field Name: __mj_UpdatedAt
        * * Display Name: Updated At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
});

export type OrganizationRoleEntityType = z.infer<typeof OrganizationRoleSchema>;

/**
 * zod schema definition for the entity Organizations
 */
export const OrganizationSchema = z.object({
    ID: z.number().describe(`
        * * Field Name: ID
        * * Display Name: ID
        * * SQL Data Type: int
    * * Description: Primary key identifier for the organization.`),
    Name: z.string().describe(`
        * * Field Name: Name
        * * Display Name: Name
        * * SQL Data Type: nvarchar(255)
    * * Description: Name of the organization.`),
    __mj_CreatedAt: z.date().describe(`
        * * Field Name: __mj_CreatedAt
        * * Display Name: Created At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    __mj_UpdatedAt: z.date().describe(`
        * * Field Name: __mj_UpdatedAt
        * * Display Name: Updated At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
});

export type OrganizationEntityType = z.infer<typeof OrganizationSchema>;

/**
 * zod schema definition for the entity Persons
 */
export const PersonSchema = z.object({
    ID: z.number().describe(`
        * * Field Name: ID
        * * Display Name: ID
        * * SQL Data Type: int`),
    FirstName: z.string().describe(`
        * * Field Name: FirstName
        * * Display Name: First Name
        * * SQL Data Type: nvarchar(100)`),
    LastName: z.string().describe(`
        * * Field Name: LastName
        * * Display Name: Last Name
        * * SQL Data Type: nvarchar(100)`),
    Email: z.string().describe(`
        * * Field Name: Email
        * * Display Name: Email
        * * SQL Data Type: nvarchar(255)`),
    __mj_CreatedAt: z.date().describe(`
        * * Field Name: __mj_CreatedAt
        * * Display Name: Created At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    __mj_UpdatedAt: z.date().describe(`
        * * Field Name: __mj_UpdatedAt
        * * Display Name: Updated At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    OrganizationID: z.number().nullish().describe(`
        * * Field Name: OrganizationID
        * * Display Name: Organization ID
        * * SQL Data Type: int
        * * Related Entity/Foreign Key: Organizations (vwOrganizations.ID)`),
    OrganizationRoleID: z.number().nullish().describe(`
        * * Field Name: OrganizationRoleID
        * * Display Name: Organization Role ID
        * * SQL Data Type: int
        * * Related Entity/Foreign Key: Organization Roles (vwOrganizationRoles.ID)`),
    Organization: z.string().nullish().describe(`
        * * Field Name: Organization
        * * Display Name: Organization
        * * SQL Data Type: nvarchar(255)`),
});

export type PersonEntityType = z.infer<typeof PersonSchema>;

/**
 * zod schema definition for the entity Reviewer Roles
 */
export const ReviewerRoleSchema = z.object({
    ID: z.string().describe(`
        * * Field Name: ID
        * * Display Name: ID
        * * SQL Data Type: uniqueidentifier
        * * Default Value: newid()`),
    Name: z.string().describe(`
        * * Field Name: Name
        * * Display Name: Name
        * * SQL Data Type: nvarchar(100)`),
    SubmissionTypeID: z.string().nullish().describe(`
        * * Field Name: SubmissionTypeID
        * * Display Name: Submission Type ID
        * * SQL Data Type: uniqueidentifier
        * * Related Entity/Foreign Key: Submission Types (vwSubmissionTypes.ID)`),
    Description: z.string().nullish().describe(`
        * * Field Name: Description
        * * Display Name: Description
        * * SQL Data Type: nvarchar(255)`),
    __mj_CreatedAt: z.date().describe(`
        * * Field Name: __mj_CreatedAt
        * * Display Name: Created At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    __mj_UpdatedAt: z.date().describe(`
        * * Field Name: __mj_UpdatedAt
        * * Display Name: Updated At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    SubmissionType: z.string().nullish().describe(`
        * * Field Name: SubmissionType
        * * Display Name: Submission Type
        * * SQL Data Type: nvarchar(100)`),
});

export type ReviewerRoleEntityType = z.infer<typeof ReviewerRoleSchema>;

/**
 * zod schema definition for the entity Reviews
 */
export const ReviewSchema = z.object({
    ID: z.number().describe(`
        * * Field Name: ID
        * * Display Name: ID
        * * SQL Data Type: int`),
    AssignedAt: z.date().describe(`
        * * Field Name: AssignedAt
        * * Display Name: Assigned At
        * * SQL Data Type: datetime
        * * Default Value: getdate()`),
    SubmissionID: z.number().describe(`
        * * Field Name: SubmissionID
        * * Display Name: Submission ID
        * * SQL Data Type: int
        * * Related Entity/Foreign Key: Submissions (vwSubmissions.ID)`),
    ReviewerID: z.number().describe(`
        * * Field Name: ReviewerID
        * * Display Name: Reviewer ID
        * * SQL Data Type: int
        * * Related Entity/Foreign Key: Persons (vwPersons.ID)`),
    RoleID: z.string().describe(`
        * * Field Name: RoleID
        * * Display Name: Role ID
        * * SQL Data Type: uniqueidentifier
        * * Related Entity/Foreign Key: Reviewer Roles (vwReviewerRoles.ID)`),
    Score: z.number().nullish().describe(`
        * * Field Name: Score
        * * Display Name: Score
        * * SQL Data Type: int`),
    Status: z.union([z.literal('Undecided'), z.literal('Pending'), z.literal('Approved'), z.literal('Rejected')]).describe(`
        * * Field Name: Status
        * * Display Name: Status
        * * SQL Data Type: nvarchar(50)
    * * Value List Type: List
    * * Possible Values 
    *   * Undecided
    *   * Pending
    *   * Approved
    *   * Rejected`),
    ReviewedAt: z.date().nullish().describe(`
        * * Field Name: ReviewedAt
        * * Display Name: Reviewed At
        * * SQL Data Type: datetime`),
    Comments: z.string().nullish().describe(`
        * * Field Name: Comments
        * * Display Name: Comments
        * * SQL Data Type: nvarchar(MAX)`),
    __mj_UpdatedAt: z.date().describe(`
        * * Field Name: __mj_UpdatedAt
        * * Display Name: Updated At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    __mj_CreatedAt: z.date().describe(`
        * * Field Name: __mj_CreatedAt
        * * Display Name: Created At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    Role: z.string().describe(`
        * * Field Name: Role
        * * Display Name: Role
        * * SQL Data Type: nvarchar(100)`),
});

export type ReviewEntityType = z.infer<typeof ReviewSchema>;

/**
 * zod schema definition for the entity Submission Persons
 */
export const SubmissionPersonSchema = z.object({
    ID: z.number().describe(`
        * * Field Name: ID
        * * Display Name: ID
        * * SQL Data Type: int`),
    SubmissionID: z.number().describe(`
        * * Field Name: SubmissionID
        * * Display Name: Submission ID
        * * SQL Data Type: int
        * * Related Entity/Foreign Key: Submissions (vwSubmissions.ID)`),
    PersonID: z.number().describe(`
        * * Field Name: PersonID
        * * Display Name: Person ID
        * * SQL Data Type: int
        * * Related Entity/Foreign Key: Persons (vwPersons.ID)`),
    RoleID: z.string().describe(`
        * * Field Name: RoleID
        * * Display Name: Role ID
        * * SQL Data Type: uniqueidentifier
        * * Related Entity/Foreign Key: Submission Roles (vwSubmissionRoles.ID)`),
    __mj_CreatedAt: z.date().describe(`
        * * Field Name: __mj_CreatedAt
        * * Display Name: Created At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    __mj_UpdatedAt: z.date().describe(`
        * * Field Name: __mj_UpdatedAt
        * * Display Name: Updated At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    Role: z.string().describe(`
        * * Field Name: Role
        * * Display Name: Role
        * * SQL Data Type: nvarchar(100)`),
});

export type SubmissionPersonEntityType = z.infer<typeof SubmissionPersonSchema>;

/**
 * zod schema definition for the entity Submission Roles
 */
export const SubmissionRoleSchema = z.object({
    ID: z.string().describe(`
        * * Field Name: ID
        * * Display Name: ID
        * * SQL Data Type: uniqueidentifier
        * * Default Value: newid()`),
    Name: z.string().describe(`
        * * Field Name: Name
        * * Display Name: Name
        * * SQL Data Type: nvarchar(100)`),
    SubmissionTypeID: z.string().nullish().describe(`
        * * Field Name: SubmissionTypeID
        * * Display Name: Submission Type ID
        * * SQL Data Type: uniqueidentifier
        * * Related Entity/Foreign Key: Submission Types (vwSubmissionTypes.ID)`),
    Description: z.string().nullish().describe(`
        * * Field Name: Description
        * * Display Name: Description
        * * SQL Data Type: nvarchar(255)`),
    __mj_CreatedAt: z.date().describe(`
        * * Field Name: __mj_CreatedAt
        * * Display Name: Created At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    __mj_UpdatedAt: z.date().describe(`
        * * Field Name: __mj_UpdatedAt
        * * Display Name: Updated At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    SubmissionType: z.string().nullish().describe(`
        * * Field Name: SubmissionType
        * * Display Name: Submission Type
        * * SQL Data Type: nvarchar(100)`),
});

export type SubmissionRoleEntityType = z.infer<typeof SubmissionRoleSchema>;

/**
 * zod schema definition for the entity Submission Types
 */
export const SubmissionTypeSchema = z.object({
    ID: z.string().describe(`
        * * Field Name: ID
        * * Display Name: ID
        * * SQL Data Type: uniqueidentifier
        * * Default Value: newid()`),
    Name: z.string().describe(`
        * * Field Name: Name
        * * Display Name: Name
        * * SQL Data Type: nvarchar(100)
    * * Description: Name of the submission type.`),
    ParentID: z.string().nullish().describe(`
        * * Field Name: ParentID
        * * Display Name: Parent ID
        * * SQL Data Type: uniqueidentifier
        * * Related Entity/Foreign Key: Submission Types (vwSubmissionTypes.ID)`),
    Type: z.union([z.literal('Event'), z.literal('Publication'), z.literal('Other')]).describe(`
        * * Field Name: Type
        * * Display Name: Type
        * * SQL Data Type: nvarchar(20)
    * * Value List Type: List
    * * Possible Values 
    *   * Event
    *   * Publication
    *   * Other`),
    SubmissionDeadline: z.date().nullish().describe(`
        * * Field Name: SubmissionDeadline
        * * Display Name: Submission Deadline
        * * SQL Data Type: datetime
    * * Description: Optional, date a submission is due by`),
    Description: z.string().nullish().describe(`
        * * Field Name: Description
        * * Display Name: Description
        * * SQL Data Type: nvarchar(MAX)
    * * Description: Description of the submission type.`),
    EvaluationCriteria: z.string().nullish().describe(`
        * * Field Name: EvaluationCriteria
        * * Display Name: Evaluation Criteria
        * * SQL Data Type: nvarchar(MAX)
    * * Description: Optional, the criteria that should be used to evaluate how good a submission is.`),
    __mj_CreatedAt: z.date().describe(`
        * * Field Name: __mj_CreatedAt
        * * Display Name: Created At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    __mj_UpdatedAt: z.date().describe(`
        * * Field Name: __mj_UpdatedAt
        * * Display Name: Updated At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    Parent: z.string().nullish().describe(`
        * * Field Name: Parent
        * * Display Name: Parent
        * * SQL Data Type: nvarchar(100)`),
});

export type SubmissionTypeEntityType = z.infer<typeof SubmissionTypeSchema>;

/**
 * zod schema definition for the entity Submissions
 */
export const SubmissionSchema = z.object({
    ID: z.number().describe(`
        * * Field Name: ID
        * * Display Name: ID
        * * SQL Data Type: int`),
    SubmittedAt: z.date().describe(`
        * * Field Name: SubmittedAt
        * * Display Name: Submitted At
        * * SQL Data Type: datetime
        * * Default Value: getdate()`),
    Title: z.string().describe(`
        * * Field Name: Title
        * * Display Name: Title
        * * SQL Data Type: nvarchar(200)
    * * Description: Title of the submission.`),
    Description: z.string().nullish().describe(`
        * * Field Name: Description
        * * Display Name: Description
        * * SQL Data Type: nvarchar(MAX)`),
    Contents: z.string().nullish().describe(`
        * * Field Name: Contents
        * * Display Name: Contents
        * * SQL Data Type: nvarchar(MAX)`),
    SubmissionTypeID: z.string().describe(`
        * * Field Name: SubmissionTypeID
        * * Display Name: Submission Type ID
        * * SQL Data Type: uniqueidentifier
        * * Related Entity/Foreign Key: Submission Types (vwSubmissionTypes.ID)`),
    FieldOfStudyID: z.number().describe(`
        * * Field Name: FieldOfStudyID
        * * Display Name: Field Of Study ID
        * * SQL Data Type: int`),
    Status: z.string().describe(`
        * * Field Name: Status
        * * Display Name: Status
        * * SQL Data Type: nvarchar(50)`),
    __mj_UpdatedAt: z.date().describe(`
        * * Field Name: __mj_UpdatedAt
        * * Display Name: Updated At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    __mj_CreatedAt: z.date().describe(`
        * * Field Name: __mj_CreatedAt
        * * Display Name: Created At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    SubmissionType: z.string().describe(`
        * * Field Name: SubmissionType
        * * Display Name: Submission Type
        * * SQL Data Type: nvarchar(100)`),
});

export type SubmissionEntityType = z.infer<typeof SubmissionSchema>;
 
 

/**
 * Field Of Studies - strongly typed entity sub-class
 * * Schema: abstracts
 * * Base Table: FieldOfStudy
 * * Base View: vwFieldOfStudies
 * * @description Table to store fields of study.
 * * Primary Key: ID
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Field Of Studies')
export class FieldOfStudyEntity extends BaseEntity<FieldOfStudyEntityType> {
    /**
    * Loads the Field Of Studies record from the database
    * @param ID: number - primary key value to load the Field Of Studies record.
    * @param EntityRelationshipsToLoad - (optional) the relationships to load
    * @returns {Promise<boolean>} - true if successful, false otherwise
    * @public
    * @async
    * @memberof FieldOfStudyEntity
    * @method
    * @override
    */
    public async Load(ID: number, EntityRelationshipsToLoad?: string[]) : Promise<boolean> {
        const compositeKey: CompositeKey = new CompositeKey();
        compositeKey.KeyValuePairs.push({ FieldName: 'ID', Value: ID });
        return await super.InnerLoad(compositeKey, EntityRelationshipsToLoad);
    }

    /**
    * * Field Name: ID
    * * Display Name: ID
    * * SQL Data Type: int
    * * Description: Primary key identifier for the field of study.
    */
    get ID(): number {
        return this.Get('ID');
    }

    /**
    * * Field Name: NameOfField
    * * Display Name: Name Of Field
    * * SQL Data Type: nvarchar(255)
    * * Description: The name of the field of study.
    */
    get NameOfField(): string {
        return this.Get('NameOfField');
    }
    set NameOfField(value: string) {
        this.Set('NameOfField', value);
    }

    /**
    * * Field Name: __mj_CreatedAt
    * * Display Name: Created At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_CreatedAt(): Date {
        return this.Get('__mj_CreatedAt');
    }

    /**
    * * Field Name: __mj_UpdatedAt
    * * Display Name: Updated At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_UpdatedAt(): Date {
        return this.Get('__mj_UpdatedAt');
    }
}


/**
 * Organization Roles - strongly typed entity sub-class
 * * Schema: abstracts
 * * Base Table: OrganizationRole
 * * Base View: vwOrganizationRoles
 * * @description Table to store roles within an organization.
 * * Primary Key: ID
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Organization Roles')
export class OrganizationRoleEntity extends BaseEntity<OrganizationRoleEntityType> {
    /**
    * Loads the Organization Roles record from the database
    * @param ID: number - primary key value to load the Organization Roles record.
    * @param EntityRelationshipsToLoad - (optional) the relationships to load
    * @returns {Promise<boolean>} - true if successful, false otherwise
    * @public
    * @async
    * @memberof OrganizationRoleEntity
    * @method
    * @override
    */
    public async Load(ID: number, EntityRelationshipsToLoad?: string[]) : Promise<boolean> {
        const compositeKey: CompositeKey = new CompositeKey();
        compositeKey.KeyValuePairs.push({ FieldName: 'ID', Value: ID });
        return await super.InnerLoad(compositeKey, EntityRelationshipsToLoad);
    }

    /**
    * * Field Name: ID
    * * Display Name: ID
    * * SQL Data Type: int
    * * Description: Primary key identifier for the organization role.
    */
    get ID(): number {
        return this.Get('ID');
    }

    /**
    * * Field Name: RoleName
    * * Display Name: Role Name
    * * SQL Data Type: nvarchar(255)
    * * Description: Name of the role in the organization.
    */
    get RoleName(): string {
        return this.Get('RoleName');
    }
    set RoleName(value: string) {
        this.Set('RoleName', value);
    }

    /**
    * * Field Name: __mj_CreatedAt
    * * Display Name: Created At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_CreatedAt(): Date {
        return this.Get('__mj_CreatedAt');
    }

    /**
    * * Field Name: __mj_UpdatedAt
    * * Display Name: Updated At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_UpdatedAt(): Date {
        return this.Get('__mj_UpdatedAt');
    }
}


/**
 * Organizations - strongly typed entity sub-class
 * * Schema: abstracts
 * * Base Table: Organization
 * * Base View: vwOrganizations
 * * @description Table to store organization information.
 * * Primary Key: ID
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Organizations')
export class OrganizationEntity extends BaseEntity<OrganizationEntityType> {
    /**
    * Loads the Organizations record from the database
    * @param ID: number - primary key value to load the Organizations record.
    * @param EntityRelationshipsToLoad - (optional) the relationships to load
    * @returns {Promise<boolean>} - true if successful, false otherwise
    * @public
    * @async
    * @memberof OrganizationEntity
    * @method
    * @override
    */
    public async Load(ID: number, EntityRelationshipsToLoad?: string[]) : Promise<boolean> {
        const compositeKey: CompositeKey = new CompositeKey();
        compositeKey.KeyValuePairs.push({ FieldName: 'ID', Value: ID });
        return await super.InnerLoad(compositeKey, EntityRelationshipsToLoad);
    }

    /**
    * * Field Name: ID
    * * Display Name: ID
    * * SQL Data Type: int
    * * Description: Primary key identifier for the organization.
    */
    get ID(): number {
        return this.Get('ID');
    }

    /**
    * * Field Name: Name
    * * Display Name: Name
    * * SQL Data Type: nvarchar(255)
    * * Description: Name of the organization.
    */
    get Name(): string {
        return this.Get('Name');
    }
    set Name(value: string) {
        this.Set('Name', value);
    }

    /**
    * * Field Name: __mj_CreatedAt
    * * Display Name: Created At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_CreatedAt(): Date {
        return this.Get('__mj_CreatedAt');
    }

    /**
    * * Field Name: __mj_UpdatedAt
    * * Display Name: Updated At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_UpdatedAt(): Date {
        return this.Get('__mj_UpdatedAt');
    }
}


/**
 * Persons - strongly typed entity sub-class
 * * Schema: abstracts
 * * Base Table: Person
 * * Base View: vwPersons
 * * @description Table to store information about individuals.
 * * Primary Key: ID
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Persons')
export class PersonEntity extends BaseEntity<PersonEntityType> {
    /**
    * Loads the Persons record from the database
    * @param ID: number - primary key value to load the Persons record.
    * @param EntityRelationshipsToLoad - (optional) the relationships to load
    * @returns {Promise<boolean>} - true if successful, false otherwise
    * @public
    * @async
    * @memberof PersonEntity
    * @method
    * @override
    */
    public async Load(ID: number, EntityRelationshipsToLoad?: string[]) : Promise<boolean> {
        const compositeKey: CompositeKey = new CompositeKey();
        compositeKey.KeyValuePairs.push({ FieldName: 'ID', Value: ID });
        return await super.InnerLoad(compositeKey, EntityRelationshipsToLoad);
    }

    /**
    * * Field Name: ID
    * * Display Name: ID
    * * SQL Data Type: int
    */
    get ID(): number {
        return this.Get('ID');
    }

    /**
    * * Field Name: FirstName
    * * Display Name: First Name
    * * SQL Data Type: nvarchar(100)
    */
    get FirstName(): string {
        return this.Get('FirstName');
    }
    set FirstName(value: string) {
        this.Set('FirstName', value);
    }

    /**
    * * Field Name: LastName
    * * Display Name: Last Name
    * * SQL Data Type: nvarchar(100)
    */
    get LastName(): string {
        return this.Get('LastName');
    }
    set LastName(value: string) {
        this.Set('LastName', value);
    }

    /**
    * * Field Name: Email
    * * Display Name: Email
    * * SQL Data Type: nvarchar(255)
    */
    get Email(): string {
        return this.Get('Email');
    }
    set Email(value: string) {
        this.Set('Email', value);
    }

    /**
    * * Field Name: __mj_CreatedAt
    * * Display Name: Created At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_CreatedAt(): Date {
        return this.Get('__mj_CreatedAt');
    }

    /**
    * * Field Name: __mj_UpdatedAt
    * * Display Name: Updated At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_UpdatedAt(): Date {
        return this.Get('__mj_UpdatedAt');
    }

    /**
    * * Field Name: OrganizationID
    * * Display Name: Organization ID
    * * SQL Data Type: int
    * * Related Entity/Foreign Key: Organizations (vwOrganizations.ID)
    */
    get OrganizationID(): number | null {
        return this.Get('OrganizationID');
    }
    set OrganizationID(value: number | null) {
        this.Set('OrganizationID', value);
    }

    /**
    * * Field Name: OrganizationRoleID
    * * Display Name: Organization Role ID
    * * SQL Data Type: int
    * * Related Entity/Foreign Key: Organization Roles (vwOrganizationRoles.ID)
    */
    get OrganizationRoleID(): number | null {
        return this.Get('OrganizationRoleID');
    }
    set OrganizationRoleID(value: number | null) {
        this.Set('OrganizationRoleID', value);
    }

    /**
    * * Field Name: Organization
    * * Display Name: Organization
    * * SQL Data Type: nvarchar(255)
    */
    get Organization(): string | null {
        return this.Get('Organization');
    }
}


/**
 * Reviewer Roles - strongly typed entity sub-class
 * * Schema: abstracts
 * * Base Table: ReviewerRole
 * * Base View: vwReviewerRoles
 * * @description Roles associated with reviewer assignments.
 * * Primary Key: ID
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Reviewer Roles')
export class ReviewerRoleEntity extends BaseEntity<ReviewerRoleEntityType> {
    /**
    * Loads the Reviewer Roles record from the database
    * @param ID: string - primary key value to load the Reviewer Roles record.
    * @param EntityRelationshipsToLoad - (optional) the relationships to load
    * @returns {Promise<boolean>} - true if successful, false otherwise
    * @public
    * @async
    * @memberof ReviewerRoleEntity
    * @method
    * @override
    */
    public async Load(ID: string, EntityRelationshipsToLoad?: string[]) : Promise<boolean> {
        const compositeKey: CompositeKey = new CompositeKey();
        compositeKey.KeyValuePairs.push({ FieldName: 'ID', Value: ID });
        return await super.InnerLoad(compositeKey, EntityRelationshipsToLoad);
    }

    /**
    * * Field Name: ID
    * * Display Name: ID
    * * SQL Data Type: uniqueidentifier
    * * Default Value: newid()
    */
    get ID(): string {
        return this.Get('ID');
    }

    /**
    * * Field Name: Name
    * * Display Name: Name
    * * SQL Data Type: nvarchar(100)
    */
    get Name(): string {
        return this.Get('Name');
    }
    set Name(value: string) {
        this.Set('Name', value);
    }

    /**
    * * Field Name: SubmissionTypeID
    * * Display Name: Submission Type ID
    * * SQL Data Type: uniqueidentifier
    * * Related Entity/Foreign Key: Submission Types (vwSubmissionTypes.ID)
    */
    get SubmissionTypeID(): string | null {
        return this.Get('SubmissionTypeID');
    }
    set SubmissionTypeID(value: string | null) {
        this.Set('SubmissionTypeID', value);
    }

    /**
    * * Field Name: Description
    * * Display Name: Description
    * * SQL Data Type: nvarchar(255)
    */
    get Description(): string | null {
        return this.Get('Description');
    }
    set Description(value: string | null) {
        this.Set('Description', value);
    }

    /**
    * * Field Name: __mj_CreatedAt
    * * Display Name: Created At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_CreatedAt(): Date {
        return this.Get('__mj_CreatedAt');
    }

    /**
    * * Field Name: __mj_UpdatedAt
    * * Display Name: Updated At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_UpdatedAt(): Date {
        return this.Get('__mj_UpdatedAt');
    }

    /**
    * * Field Name: SubmissionType
    * * Display Name: Submission Type
    * * SQL Data Type: nvarchar(100)
    */
    get SubmissionType(): string | null {
        return this.Get('SubmissionType');
    }
}


/**
 * Reviews - strongly typed entity sub-class
 * * Schema: abstracts
 * * Base Table: Review
 * * Base View: vwReviews
 * * @description Table for storing reviews of submissions.
 * * Primary Key: ID
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Reviews')
export class ReviewEntity extends BaseEntity<ReviewEntityType> {
    /**
    * Loads the Reviews record from the database
    * @param ID: number - primary key value to load the Reviews record.
    * @param EntityRelationshipsToLoad - (optional) the relationships to load
    * @returns {Promise<boolean>} - true if successful, false otherwise
    * @public
    * @async
    * @memberof ReviewEntity
    * @method
    * @override
    */
    public async Load(ID: number, EntityRelationshipsToLoad?: string[]) : Promise<boolean> {
        const compositeKey: CompositeKey = new CompositeKey();
        compositeKey.KeyValuePairs.push({ FieldName: 'ID', Value: ID });
        return await super.InnerLoad(compositeKey, EntityRelationshipsToLoad);
    }

    /**
    * * Field Name: ID
    * * Display Name: ID
    * * SQL Data Type: int
    */
    get ID(): number {
        return this.Get('ID');
    }

    /**
    * * Field Name: AssignedAt
    * * Display Name: Assigned At
    * * SQL Data Type: datetime
    * * Default Value: getdate()
    */
    get AssignedAt(): Date {
        return this.Get('AssignedAt');
    }
    set AssignedAt(value: Date) {
        this.Set('AssignedAt', value);
    }

    /**
    * * Field Name: SubmissionID
    * * Display Name: Submission ID
    * * SQL Data Type: int
    * * Related Entity/Foreign Key: Submissions (vwSubmissions.ID)
    */
    get SubmissionID(): number {
        return this.Get('SubmissionID');
    }
    set SubmissionID(value: number) {
        this.Set('SubmissionID', value);
    }

    /**
    * * Field Name: ReviewerID
    * * Display Name: Reviewer ID
    * * SQL Data Type: int
    * * Related Entity/Foreign Key: Persons (vwPersons.ID)
    */
    get ReviewerID(): number {
        return this.Get('ReviewerID');
    }
    set ReviewerID(value: number) {
        this.Set('ReviewerID', value);
    }

    /**
    * * Field Name: RoleID
    * * Display Name: Role ID
    * * SQL Data Type: uniqueidentifier
    * * Related Entity/Foreign Key: Reviewer Roles (vwReviewerRoles.ID)
    */
    get RoleID(): string {
        return this.Get('RoleID');
    }
    set RoleID(value: string) {
        this.Set('RoleID', value);
    }

    /**
    * * Field Name: Score
    * * Display Name: Score
    * * SQL Data Type: int
    */
    get Score(): number | null {
        return this.Get('Score');
    }
    set Score(value: number | null) {
        this.Set('Score', value);
    }

    /**
    * * Field Name: Status
    * * Display Name: Status
    * * SQL Data Type: nvarchar(50)
    * * Value List Type: List
    * * Possible Values 
    *   * Undecided
    *   * Pending
    *   * Approved
    *   * Rejected
    */
    get Status(): 'Undecided' | 'Pending' | 'Approved' | 'Rejected' {
        return this.Get('Status');
    }
    set Status(value: 'Undecided' | 'Pending' | 'Approved' | 'Rejected') {
        this.Set('Status', value);
    }

    /**
    * * Field Name: ReviewedAt
    * * Display Name: Reviewed At
    * * SQL Data Type: datetime
    */
    get ReviewedAt(): Date | null {
        return this.Get('ReviewedAt');
    }
    set ReviewedAt(value: Date | null) {
        this.Set('ReviewedAt', value);
    }

    /**
    * * Field Name: Comments
    * * Display Name: Comments
    * * SQL Data Type: nvarchar(MAX)
    */
    get Comments(): string | null {
        return this.Get('Comments');
    }
    set Comments(value: string | null) {
        this.Set('Comments', value);
    }

    /**
    * * Field Name: __mj_UpdatedAt
    * * Display Name: Updated At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_UpdatedAt(): Date {
        return this.Get('__mj_UpdatedAt');
    }

    /**
    * * Field Name: __mj_CreatedAt
    * * Display Name: Created At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_CreatedAt(): Date {
        return this.Get('__mj_CreatedAt');
    }

    /**
    * * Field Name: Role
    * * Display Name: Role
    * * SQL Data Type: nvarchar(100)
    */
    get Role(): string {
        return this.Get('Role');
    }
}


/**
 * Submission Persons - strongly typed entity sub-class
 * * Schema: abstracts
 * * Base Table: SubmissionPerson
 * * Base View: vwSubmissionPersons
 * * Primary Key: ID
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Submission Persons')
export class SubmissionPersonEntity extends BaseEntity<SubmissionPersonEntityType> {
    /**
    * Loads the Submission Persons record from the database
    * @param ID: number - primary key value to load the Submission Persons record.
    * @param EntityRelationshipsToLoad - (optional) the relationships to load
    * @returns {Promise<boolean>} - true if successful, false otherwise
    * @public
    * @async
    * @memberof SubmissionPersonEntity
    * @method
    * @override
    */
    public async Load(ID: number, EntityRelationshipsToLoad?: string[]) : Promise<boolean> {
        const compositeKey: CompositeKey = new CompositeKey();
        compositeKey.KeyValuePairs.push({ FieldName: 'ID', Value: ID });
        return await super.InnerLoad(compositeKey, EntityRelationshipsToLoad);
    }

    /**
    * * Field Name: ID
    * * Display Name: ID
    * * SQL Data Type: int
    */
    get ID(): number {
        return this.Get('ID');
    }

    /**
    * * Field Name: SubmissionID
    * * Display Name: Submission ID
    * * SQL Data Type: int
    * * Related Entity/Foreign Key: Submissions (vwSubmissions.ID)
    */
    get SubmissionID(): number {
        return this.Get('SubmissionID');
    }
    set SubmissionID(value: number) {
        this.Set('SubmissionID', value);
    }

    /**
    * * Field Name: PersonID
    * * Display Name: Person ID
    * * SQL Data Type: int
    * * Related Entity/Foreign Key: Persons (vwPersons.ID)
    */
    get PersonID(): number {
        return this.Get('PersonID');
    }
    set PersonID(value: number) {
        this.Set('PersonID', value);
    }

    /**
    * * Field Name: RoleID
    * * Display Name: Role ID
    * * SQL Data Type: uniqueidentifier
    * * Related Entity/Foreign Key: Submission Roles (vwSubmissionRoles.ID)
    */
    get RoleID(): string {
        return this.Get('RoleID');
    }
    set RoleID(value: string) {
        this.Set('RoleID', value);
    }

    /**
    * * Field Name: __mj_CreatedAt
    * * Display Name: Created At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_CreatedAt(): Date {
        return this.Get('__mj_CreatedAt');
    }

    /**
    * * Field Name: __mj_UpdatedAt
    * * Display Name: Updated At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_UpdatedAt(): Date {
        return this.Get('__mj_UpdatedAt');
    }

    /**
    * * Field Name: Role
    * * Display Name: Role
    * * SQL Data Type: nvarchar(100)
    */
    get Role(): string {
        return this.Get('Role');
    }
}


/**
 * Submission Roles - strongly typed entity sub-class
 * * Schema: abstracts
 * * Base Table: SubmissionRole
 * * Base View: vwSubmissionRoles
 * * @description Roles associated with submission-person relationships.
 * * Primary Key: ID
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Submission Roles')
export class SubmissionRoleEntity extends BaseEntity<SubmissionRoleEntityType> {
    /**
    * Loads the Submission Roles record from the database
    * @param ID: string - primary key value to load the Submission Roles record.
    * @param EntityRelationshipsToLoad - (optional) the relationships to load
    * @returns {Promise<boolean>} - true if successful, false otherwise
    * @public
    * @async
    * @memberof SubmissionRoleEntity
    * @method
    * @override
    */
    public async Load(ID: string, EntityRelationshipsToLoad?: string[]) : Promise<boolean> {
        const compositeKey: CompositeKey = new CompositeKey();
        compositeKey.KeyValuePairs.push({ FieldName: 'ID', Value: ID });
        return await super.InnerLoad(compositeKey, EntityRelationshipsToLoad);
    }

    /**
    * * Field Name: ID
    * * Display Name: ID
    * * SQL Data Type: uniqueidentifier
    * * Default Value: newid()
    */
    get ID(): string {
        return this.Get('ID');
    }

    /**
    * * Field Name: Name
    * * Display Name: Name
    * * SQL Data Type: nvarchar(100)
    */
    get Name(): string {
        return this.Get('Name');
    }
    set Name(value: string) {
        this.Set('Name', value);
    }

    /**
    * * Field Name: SubmissionTypeID
    * * Display Name: Submission Type ID
    * * SQL Data Type: uniqueidentifier
    * * Related Entity/Foreign Key: Submission Types (vwSubmissionTypes.ID)
    */
    get SubmissionTypeID(): string | null {
        return this.Get('SubmissionTypeID');
    }
    set SubmissionTypeID(value: string | null) {
        this.Set('SubmissionTypeID', value);
    }

    /**
    * * Field Name: Description
    * * Display Name: Description
    * * SQL Data Type: nvarchar(255)
    */
    get Description(): string | null {
        return this.Get('Description');
    }
    set Description(value: string | null) {
        this.Set('Description', value);
    }

    /**
    * * Field Name: __mj_CreatedAt
    * * Display Name: Created At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_CreatedAt(): Date {
        return this.Get('__mj_CreatedAt');
    }

    /**
    * * Field Name: __mj_UpdatedAt
    * * Display Name: Updated At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_UpdatedAt(): Date {
        return this.Get('__mj_UpdatedAt');
    }

    /**
    * * Field Name: SubmissionType
    * * Display Name: Submission Type
    * * SQL Data Type: nvarchar(100)
    */
    get SubmissionType(): string | null {
        return this.Get('SubmissionType');
    }
}


/**
 * Submission Types - strongly typed entity sub-class
 * * Schema: abstracts
 * * Base Table: SubmissionType
 * * Base View: vwSubmissionTypes
 * * @description Types of submissions, can be hierarchical using ParentID.
 * * Primary Key: ID
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Submission Types')
export class SubmissionTypeEntity extends BaseEntity<SubmissionTypeEntityType> {
    /**
    * Loads the Submission Types record from the database
    * @param ID: string - primary key value to load the Submission Types record.
    * @param EntityRelationshipsToLoad - (optional) the relationships to load
    * @returns {Promise<boolean>} - true if successful, false otherwise
    * @public
    * @async
    * @memberof SubmissionTypeEntity
    * @method
    * @override
    */
    public async Load(ID: string, EntityRelationshipsToLoad?: string[]) : Promise<boolean> {
        const compositeKey: CompositeKey = new CompositeKey();
        compositeKey.KeyValuePairs.push({ FieldName: 'ID', Value: ID });
        return await super.InnerLoad(compositeKey, EntityRelationshipsToLoad);
    }

    /**
    * * Field Name: ID
    * * Display Name: ID
    * * SQL Data Type: uniqueidentifier
    * * Default Value: newid()
    */
    get ID(): string {
        return this.Get('ID');
    }

    /**
    * * Field Name: Name
    * * Display Name: Name
    * * SQL Data Type: nvarchar(100)
    * * Description: Name of the submission type.
    */
    get Name(): string {
        return this.Get('Name');
    }
    set Name(value: string) {
        this.Set('Name', value);
    }

    /**
    * * Field Name: ParentID
    * * Display Name: Parent ID
    * * SQL Data Type: uniqueidentifier
    * * Related Entity/Foreign Key: Submission Types (vwSubmissionTypes.ID)
    */
    get ParentID(): string | null {
        return this.Get('ParentID');
    }
    set ParentID(value: string | null) {
        this.Set('ParentID', value);
    }

    /**
    * * Field Name: Type
    * * Display Name: Type
    * * SQL Data Type: nvarchar(20)
    * * Value List Type: List
    * * Possible Values 
    *   * Event
    *   * Publication
    *   * Other
    */
    get Type(): 'Event' | 'Publication' | 'Other' {
        return this.Get('Type');
    }
    set Type(value: 'Event' | 'Publication' | 'Other') {
        this.Set('Type', value);
    }

    /**
    * * Field Name: SubmissionDeadline
    * * Display Name: Submission Deadline
    * * SQL Data Type: datetime
    * * Description: Optional, date a submission is due by
    */
    get SubmissionDeadline(): Date | null {
        return this.Get('SubmissionDeadline');
    }
    set SubmissionDeadline(value: Date | null) {
        this.Set('SubmissionDeadline', value);
    }

    /**
    * * Field Name: Description
    * * Display Name: Description
    * * SQL Data Type: nvarchar(MAX)
    * * Description: Description of the submission type.
    */
    get Description(): string | null {
        return this.Get('Description');
    }
    set Description(value: string | null) {
        this.Set('Description', value);
    }

    /**
    * * Field Name: EvaluationCriteria
    * * Display Name: Evaluation Criteria
    * * SQL Data Type: nvarchar(MAX)
    * * Description: Optional, the criteria that should be used to evaluate how good a submission is.
    */
    get EvaluationCriteria(): string | null {
        return this.Get('EvaluationCriteria');
    }
    set EvaluationCriteria(value: string | null) {
        this.Set('EvaluationCriteria', value);
    }

    /**
    * * Field Name: __mj_CreatedAt
    * * Display Name: Created At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_CreatedAt(): Date {
        return this.Get('__mj_CreatedAt');
    }

    /**
    * * Field Name: __mj_UpdatedAt
    * * Display Name: Updated At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_UpdatedAt(): Date {
        return this.Get('__mj_UpdatedAt');
    }

    /**
    * * Field Name: Parent
    * * Display Name: Parent
    * * SQL Data Type: nvarchar(100)
    */
    get Parent(): string | null {
        return this.Get('Parent');
    }
}


/**
 * Submissions - strongly typed entity sub-class
 * * Schema: abstracts
 * * Base Table: Submission
 * * Base View: vwSubmissions
 * * @description Table to store submission details.
 * * Primary Key: ID
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Submissions')
export class SubmissionEntity extends BaseEntity<SubmissionEntityType> {
    /**
    * Loads the Submissions record from the database
    * @param ID: number - primary key value to load the Submissions record.
    * @param EntityRelationshipsToLoad - (optional) the relationships to load
    * @returns {Promise<boolean>} - true if successful, false otherwise
    * @public
    * @async
    * @memberof SubmissionEntity
    * @method
    * @override
    */
    public async Load(ID: number, EntityRelationshipsToLoad?: string[]) : Promise<boolean> {
        const compositeKey: CompositeKey = new CompositeKey();
        compositeKey.KeyValuePairs.push({ FieldName: 'ID', Value: ID });
        return await super.InnerLoad(compositeKey, EntityRelationshipsToLoad);
    }

    /**
    * * Field Name: ID
    * * Display Name: ID
    * * SQL Data Type: int
    */
    get ID(): number {
        return this.Get('ID');
    }

    /**
    * * Field Name: SubmittedAt
    * * Display Name: Submitted At
    * * SQL Data Type: datetime
    * * Default Value: getdate()
    */
    get SubmittedAt(): Date {
        return this.Get('SubmittedAt');
    }
    set SubmittedAt(value: Date) {
        this.Set('SubmittedAt', value);
    }

    /**
    * * Field Name: Title
    * * Display Name: Title
    * * SQL Data Type: nvarchar(200)
    * * Description: Title of the submission.
    */
    get Title(): string {
        return this.Get('Title');
    }
    set Title(value: string) {
        this.Set('Title', value);
    }

    /**
    * * Field Name: Description
    * * Display Name: Description
    * * SQL Data Type: nvarchar(MAX)
    */
    get Description(): string | null {
        return this.Get('Description');
    }
    set Description(value: string | null) {
        this.Set('Description', value);
    }

    /**
    * * Field Name: Contents
    * * Display Name: Contents
    * * SQL Data Type: nvarchar(MAX)
    */
    get Contents(): string | null {
        return this.Get('Contents');
    }
    set Contents(value: string | null) {
        this.Set('Contents', value);
    }

    /**
    * * Field Name: SubmissionTypeID
    * * Display Name: Submission Type ID
    * * SQL Data Type: uniqueidentifier
    * * Related Entity/Foreign Key: Submission Types (vwSubmissionTypes.ID)
    */
    get SubmissionTypeID(): string {
        return this.Get('SubmissionTypeID');
    }
    set SubmissionTypeID(value: string) {
        this.Set('SubmissionTypeID', value);
    }

    /**
    * * Field Name: FieldOfStudyID
    * * Display Name: Field Of Study ID
    * * SQL Data Type: int
    */
    get FieldOfStudyID(): number {
        return this.Get('FieldOfStudyID');
    }
    set FieldOfStudyID(value: number) {
        this.Set('FieldOfStudyID', value);
    }

    /**
    * * Field Name: Status
    * * Display Name: Status
    * * SQL Data Type: nvarchar(50)
    */
    get Status(): string {
        return this.Get('Status');
    }
    set Status(value: string) {
        this.Set('Status', value);
    }

    /**
    * * Field Name: __mj_UpdatedAt
    * * Display Name: Updated At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_UpdatedAt(): Date {
        return this.Get('__mj_UpdatedAt');
    }

    /**
    * * Field Name: __mj_CreatedAt
    * * Display Name: Created At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_CreatedAt(): Date {
        return this.Get('__mj_CreatedAt');
    }

    /**
    * * Field Name: SubmissionType
    * * Display Name: Submission Type
    * * SQL Data Type: nvarchar(100)
    */
    get SubmissionType(): string {
        return this.Get('SubmissionType');
    }
}
