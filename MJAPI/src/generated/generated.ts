/********************************************************************************
* ALL ENTITIES - TypeGraphQL Type Class Definition - AUTO GENERATED FILE
* Generated Entities and Resolvers for Server
*
*   >>> DO NOT MODIFY THIS FILE!!!!!!!!!!!!
*   >>> YOUR CHANGES WILL BE OVERWRITTEN
*   >>> THE NEXT TIME THIS FILE IS GENERATED
*
**********************************************************************************/
import { Arg, Ctx, Int, Query, Resolver, Field, Float, ObjectType, FieldResolver, Root, InputType, Mutation,
            PubSub, PubSubEngine, ResolverBase, RunViewByIDInput, RunViewByNameInput, RunDynamicViewInput,
            AppContext, KeyValuePairInput, DeleteOptionsInput } from '@memberjunction/server';
import { Metadata, EntityPermissionType, CompositeKey } from '@memberjunction/core'

import { MaxLength } from 'class-validator';
import { DataSource } from 'typeorm';
import * as mj_core_schema_server_object_types from '@memberjunction/server'


import { SubmissionTypeEntity, SubmissionPersonEntity, OrganizationEntity, SubmissionRoleEntity, SubmissionEntity, ReviewEntity, FieldOfStudyEntity, OrganizationRoleEntity, ReviewerRoleEntity, PersonEntity } from 'mj_generatedentities';
    

//****************************************************************************
// ENTITY CLASS for Submission Types
//****************************************************************************
@ObjectType({ description: 'Types of submissions, can be hierarchical using ParentID.' })
export class SubmissionType_ {
    @Field() 
    @MaxLength(16)
    ID: string;
        
    @Field({description: 'Name of the submission type.'}) 
    @MaxLength(200)
    Name: string;
        
    @Field({nullable: true}) 
    @MaxLength(16)
    ParentID?: string;
        
    @Field() 
    @MaxLength(40)
    Type: string;
        
    @Field({nullable: true, description: 'Optional, date a submission is due by'}) 
    @MaxLength(8)
    SubmissionDeadline?: Date;
        
    @Field({nullable: true, description: 'Description of the submission type.'}) 
    Description?: string;
        
    @Field({nullable: true, description: 'Optional, the criteria that should be used to evaluate how good a submission is.'}) 
    EvaluationCriteria?: string;
        
    @Field() 
    @MaxLength(10)
    _mj__CreatedAt: Date;
        
    @Field() 
    @MaxLength(10)
    _mj__UpdatedAt: Date;
        
    @Field({nullable: true}) 
    @MaxLength(200)
    Parent?: string;
        
    @Field(() => [Submission_])
    Submissions_SubmissionTypeIDArray: Submission_[]; // Link to Submissions
    
    @Field(() => [SubmissionType_])
    SubmissionTypes_ParentIDArray: SubmissionType_[]; // Link to SubmissionTypes
    
    @Field(() => [ReviewerRole_])
    ReviewerRoles_SubmissionTypeIDArray: ReviewerRole_[]; // Link to ReviewerRoles
    
    @Field(() => [SubmissionRole_])
    SubmissionRoles_SubmissionTypeIDArray: SubmissionRole_[]; // Link to SubmissionRoles
    
}

//****************************************************************************
// INPUT TYPE for Submission Types
//****************************************************************************
@InputType()
export class CreateSubmissionTypeInput {
    @Field()
    Name: string;

    @Field({ nullable: true })
    ParentID?: string;

    @Field()
    Type: string;

    @Field({ nullable: true })
    SubmissionDeadline?: Date;

    @Field({ nullable: true })
    Description?: string;

    @Field({ nullable: true })
    EvaluationCriteria?: string;
}
    

//****************************************************************************
// INPUT TYPE for Submission Types
//****************************************************************************
@InputType()
export class UpdateSubmissionTypeInput {
    @Field()
    ID: string;

    @Field()
    Name: string;

    @Field({ nullable: true })
    ParentID?: string;

    @Field()
    Type: string;

    @Field({ nullable: true })
    SubmissionDeadline?: Date;

    @Field({ nullable: true })
    Description?: string;

    @Field({ nullable: true })
    EvaluationCriteria?: string;

    @Field(() => [KeyValuePairInput], { nullable: true })
    OldValues___?: KeyValuePairInput[];
}
    
//****************************************************************************
// RESOLVER for Submission Types
//****************************************************************************
@ObjectType()
export class RunSubmissionTypeViewResult {
    @Field(() => [SubmissionType_])
    Results: SubmissionType_[];

    @Field(() => String, {nullable: true})
    UserViewRunID?: string;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(SubmissionType_)
export class SubmissionTypeResolver extends ResolverBase {
    @Query(() => RunSubmissionTypeViewResult)
    async RunSubmissionTypeViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunSubmissionTypeViewResult)
    async RunSubmissionTypeViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunSubmissionTypeViewResult)
    async RunSubmissionTypeDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Submission Types';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }
    @Query(() => SubmissionType_, { nullable: true })
    async SubmissionType(@Arg('ID', () => String) ID: string, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<SubmissionType_ | null> {
        this.CheckUserReadPermissions('Submission Types', userPayload);
        const sSQL = `SELECT * FROM [abstracts].[vwSubmissionTypes] WHERE [ID]='${ID}' ` + this.getRowLevelSecurityWhereClause('Submission Types', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.MapFieldNamesToCodeNames('Submission Types', await dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {}))
        return result;
    }
    
    @FieldResolver(() => [Submission_])
    async Submissions_SubmissionTypeIDArray(@Root() submissiontype_: SubmissionType_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Submissions', userPayload);
        const sSQL = `SELECT * FROM [abstracts].[vwSubmissions] WHERE [SubmissionTypeID]='${submissiontype_.ID}' ` + this.getRowLevelSecurityWhereClause('Submissions', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.ArrayMapFieldNamesToCodeNames('Submissions', await dataSource.query(sSQL));
        return result;
    }
        
    @FieldResolver(() => [SubmissionType_])
    async SubmissionTypes_ParentIDArray(@Root() submissiontype_: SubmissionType_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Submission Types', userPayload);
        const sSQL = `SELECT * FROM [abstracts].[vwSubmissionTypes] WHERE [ParentID]='${submissiontype_.ID}' ` + this.getRowLevelSecurityWhereClause('Submission Types', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.ArrayMapFieldNamesToCodeNames('Submission Types', await dataSource.query(sSQL));
        return result;
    }
        
    @FieldResolver(() => [ReviewerRole_])
    async ReviewerRoles_SubmissionTypeIDArray(@Root() submissiontype_: SubmissionType_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Reviewer Roles', userPayload);
        const sSQL = `SELECT * FROM [abstracts].[vwReviewerRoles] WHERE [SubmissionTypeID]='${submissiontype_.ID}' ` + this.getRowLevelSecurityWhereClause('Reviewer Roles', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.ArrayMapFieldNamesToCodeNames('Reviewer Roles', await dataSource.query(sSQL));
        return result;
    }
        
    @FieldResolver(() => [SubmissionRole_])
    async SubmissionRoles_SubmissionTypeIDArray(@Root() submissiontype_: SubmissionType_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Submission Roles', userPayload);
        const sSQL = `SELECT * FROM [abstracts].[vwSubmissionRoles] WHERE [SubmissionTypeID]='${submissiontype_.ID}' ` + this.getRowLevelSecurityWhereClause('Submission Roles', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.ArrayMapFieldNamesToCodeNames('Submission Roles', await dataSource.query(sSQL));
        return result;
    }
        
    @Mutation(() => SubmissionType_)
    async CreateSubmissionType(
        @Arg('input', () => CreateSubmissionTypeInput) input: CreateSubmissionTypeInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        return this.CreateRecord('Submission Types', input, dataSource, userPayload, pubSub)
    }
        
    @Mutation(() => SubmissionType_)
    async UpdateSubmissionType(
        @Arg('input', () => UpdateSubmissionTypeInput) input: UpdateSubmissionTypeInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        return this.UpdateRecord('Submission Types', input, dataSource, userPayload, pubSub);
    }
    
    @Mutation(() => SubmissionType_)
    async DeleteSubmissionType(@Arg('ID', () => String) ID: string, @Arg('options___', () => DeleteOptionsInput) options: DeleteOptionsInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const key = new CompositeKey([{FieldName: 'ID', Value: ID}]);
        return this.DeleteRecord('Submission Types', key, options, dataSource, userPayload, pubSub);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Submission Persons
//****************************************************************************
@ObjectType()
export class SubmissionPerson_ {
    @Field(() => Int) 
    ID: number;
        
    @Field(() => Int) 
    SubmissionID: number;
        
    @Field(() => Int) 
    PersonID: number;
        
    @Field() 
    @MaxLength(16)
    RoleID: string;
        
    @Field() 
    @MaxLength(10)
    _mj__CreatedAt: Date;
        
    @Field() 
    @MaxLength(10)
    _mj__UpdatedAt: Date;
        
    @Field() 
    @MaxLength(200)
    Role: string;
        
}

//****************************************************************************
// INPUT TYPE for Submission Persons
//****************************************************************************
@InputType()
export class CreateSubmissionPersonInput {
    @Field(() => Int)
    SubmissionID: number;

    @Field(() => Int)
    PersonID: number;

    @Field()
    RoleID: string;
}
    

//****************************************************************************
// INPUT TYPE for Submission Persons
//****************************************************************************
@InputType()
export class UpdateSubmissionPersonInput {
    @Field(() => Int)
    ID: number;

    @Field(() => Int)
    SubmissionID: number;

    @Field(() => Int)
    PersonID: number;

    @Field()
    RoleID: string;

    @Field(() => [KeyValuePairInput], { nullable: true })
    OldValues___?: KeyValuePairInput[];
}
    
//****************************************************************************
// RESOLVER for Submission Persons
//****************************************************************************
@ObjectType()
export class RunSubmissionPersonViewResult {
    @Field(() => [SubmissionPerson_])
    Results: SubmissionPerson_[];

    @Field(() => String, {nullable: true})
    UserViewRunID?: string;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(SubmissionPerson_)
export class SubmissionPersonResolver extends ResolverBase {
    @Query(() => RunSubmissionPersonViewResult)
    async RunSubmissionPersonViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunSubmissionPersonViewResult)
    async RunSubmissionPersonViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunSubmissionPersonViewResult)
    async RunSubmissionPersonDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Submission Persons';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }
    @Query(() => SubmissionPerson_, { nullable: true })
    async SubmissionPerson(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<SubmissionPerson_ | null> {
        this.CheckUserReadPermissions('Submission Persons', userPayload);
        const sSQL = `SELECT * FROM [abstracts].[vwSubmissionPersons] WHERE [ID]=${ID} ` + this.getRowLevelSecurityWhereClause('Submission Persons', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.MapFieldNamesToCodeNames('Submission Persons', await dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {}))
        return result;
    }
    
    @Mutation(() => SubmissionPerson_)
    async CreateSubmissionPerson(
        @Arg('input', () => CreateSubmissionPersonInput) input: CreateSubmissionPersonInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        return this.CreateRecord('Submission Persons', input, dataSource, userPayload, pubSub)
    }
        
    @Mutation(() => SubmissionPerson_)
    async UpdateSubmissionPerson(
        @Arg('input', () => UpdateSubmissionPersonInput) input: UpdateSubmissionPersonInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        return this.UpdateRecord('Submission Persons', input, dataSource, userPayload, pubSub);
    }
    
    @Mutation(() => SubmissionPerson_)
    async DeleteSubmissionPerson(@Arg('ID', () => Int) ID: number, @Arg('options___', () => DeleteOptionsInput) options: DeleteOptionsInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const key = new CompositeKey([{FieldName: 'ID', Value: ID}]);
        return this.DeleteRecord('Submission Persons', key, options, dataSource, userPayload, pubSub);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Organizations
//****************************************************************************
@ObjectType({ description: 'Table to store organization information.' })
export class Organization_ {
    @Field(() => Int, {description: 'Primary key identifier for the organization.'}) 
    ID: number;
        
    @Field({description: 'Name of the organization.'}) 
    @MaxLength(510)
    Name: string;
        
    @Field() 
    @MaxLength(10)
    _mj__CreatedAt: Date;
        
    @Field() 
    @MaxLength(10)
    _mj__UpdatedAt: Date;
        
    @Field(() => [Person_])
    Persons_OrganizationIDArray: Person_[]; // Link to Persons
    
}

//****************************************************************************
// INPUT TYPE for Organizations
//****************************************************************************
@InputType()
export class CreateOrganizationInput {
    @Field()
    Name: string;
}
    

//****************************************************************************
// INPUT TYPE for Organizations
//****************************************************************************
@InputType()
export class UpdateOrganizationInput {
    @Field(() => Int)
    ID: number;

    @Field()
    Name: string;

    @Field(() => [KeyValuePairInput], { nullable: true })
    OldValues___?: KeyValuePairInput[];
}
    
//****************************************************************************
// RESOLVER for Organizations
//****************************************************************************
@ObjectType()
export class RunOrganizationViewResult {
    @Field(() => [Organization_])
    Results: Organization_[];

    @Field(() => String, {nullable: true})
    UserViewRunID?: string;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Organization_)
export class OrganizationResolver extends ResolverBase {
    @Query(() => RunOrganizationViewResult)
    async RunOrganizationViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunOrganizationViewResult)
    async RunOrganizationViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunOrganizationViewResult)
    async RunOrganizationDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Organizations';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }
    @Query(() => Organization_, { nullable: true })
    async Organization(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Organization_ | null> {
        this.CheckUserReadPermissions('Organizations', userPayload);
        const sSQL = `SELECT * FROM [abstracts].[vwOrganizations] WHERE [ID]=${ID} ` + this.getRowLevelSecurityWhereClause('Organizations', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.MapFieldNamesToCodeNames('Organizations', await dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {}))
        return result;
    }
    
    @FieldResolver(() => [Person_])
    async Persons_OrganizationIDArray(@Root() organization_: Organization_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Persons', userPayload);
        const sSQL = `SELECT * FROM [abstracts].[vwPersons] WHERE [OrganizationID]=${organization_.ID} ` + this.getRowLevelSecurityWhereClause('Persons', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.ArrayMapFieldNamesToCodeNames('Persons', await dataSource.query(sSQL));
        return result;
    }
        
    @Mutation(() => Organization_)
    async CreateOrganization(
        @Arg('input', () => CreateOrganizationInput) input: CreateOrganizationInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        return this.CreateRecord('Organizations', input, dataSource, userPayload, pubSub)
    }
        
    @Mutation(() => Organization_)
    async UpdateOrganization(
        @Arg('input', () => UpdateOrganizationInput) input: UpdateOrganizationInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        return this.UpdateRecord('Organizations', input, dataSource, userPayload, pubSub);
    }
    
    @Mutation(() => Organization_)
    async DeleteOrganization(@Arg('ID', () => Int) ID: number, @Arg('options___', () => DeleteOptionsInput) options: DeleteOptionsInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const key = new CompositeKey([{FieldName: 'ID', Value: ID}]);
        return this.DeleteRecord('Organizations', key, options, dataSource, userPayload, pubSub);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Submission Roles
//****************************************************************************
@ObjectType({ description: 'Roles associated with submission-person relationships.' })
export class SubmissionRole_ {
    @Field() 
    @MaxLength(16)
    ID: string;
        
    @Field() 
    @MaxLength(200)
    Name: string;
        
    @Field({nullable: true}) 
    @MaxLength(16)
    SubmissionTypeID?: string;
        
    @Field({nullable: true}) 
    @MaxLength(510)
    Description?: string;
        
    @Field() 
    @MaxLength(10)
    _mj__CreatedAt: Date;
        
    @Field() 
    @MaxLength(10)
    _mj__UpdatedAt: Date;
        
    @Field({nullable: true}) 
    @MaxLength(200)
    SubmissionType?: string;
        
    @Field(() => [SubmissionPerson_])
    SubmissionPersons_RoleIDArray: SubmissionPerson_[]; // Link to SubmissionPersons
    
}

//****************************************************************************
// INPUT TYPE for Submission Roles
//****************************************************************************
@InputType()
export class CreateSubmissionRoleInput {
    @Field()
    Name: string;

    @Field({ nullable: true })
    SubmissionTypeID?: string;

    @Field({ nullable: true })
    Description?: string;
}
    

//****************************************************************************
// INPUT TYPE for Submission Roles
//****************************************************************************
@InputType()
export class UpdateSubmissionRoleInput {
    @Field()
    ID: string;

    @Field()
    Name: string;

    @Field({ nullable: true })
    SubmissionTypeID?: string;

    @Field({ nullable: true })
    Description?: string;

    @Field(() => [KeyValuePairInput], { nullable: true })
    OldValues___?: KeyValuePairInput[];
}
    
//****************************************************************************
// RESOLVER for Submission Roles
//****************************************************************************
@ObjectType()
export class RunSubmissionRoleViewResult {
    @Field(() => [SubmissionRole_])
    Results: SubmissionRole_[];

    @Field(() => String, {nullable: true})
    UserViewRunID?: string;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(SubmissionRole_)
export class SubmissionRoleResolver extends ResolverBase {
    @Query(() => RunSubmissionRoleViewResult)
    async RunSubmissionRoleViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunSubmissionRoleViewResult)
    async RunSubmissionRoleViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunSubmissionRoleViewResult)
    async RunSubmissionRoleDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Submission Roles';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }
    @Query(() => SubmissionRole_, { nullable: true })
    async SubmissionRole(@Arg('ID', () => String) ID: string, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<SubmissionRole_ | null> {
        this.CheckUserReadPermissions('Submission Roles', userPayload);
        const sSQL = `SELECT * FROM [abstracts].[vwSubmissionRoles] WHERE [ID]='${ID}' ` + this.getRowLevelSecurityWhereClause('Submission Roles', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.MapFieldNamesToCodeNames('Submission Roles', await dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {}))
        return result;
    }
    
    @FieldResolver(() => [SubmissionPerson_])
    async SubmissionPersons_RoleIDArray(@Root() submissionrole_: SubmissionRole_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Submission Persons', userPayload);
        const sSQL = `SELECT * FROM [abstracts].[vwSubmissionPersons] WHERE [RoleID]='${submissionrole_.ID}' ` + this.getRowLevelSecurityWhereClause('Submission Persons', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.ArrayMapFieldNamesToCodeNames('Submission Persons', await dataSource.query(sSQL));
        return result;
    }
        
    @Mutation(() => SubmissionRole_)
    async CreateSubmissionRole(
        @Arg('input', () => CreateSubmissionRoleInput) input: CreateSubmissionRoleInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        return this.CreateRecord('Submission Roles', input, dataSource, userPayload, pubSub)
    }
        
    @Mutation(() => SubmissionRole_)
    async UpdateSubmissionRole(
        @Arg('input', () => UpdateSubmissionRoleInput) input: UpdateSubmissionRoleInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        return this.UpdateRecord('Submission Roles', input, dataSource, userPayload, pubSub);
    }
    
    @Mutation(() => SubmissionRole_)
    async DeleteSubmissionRole(@Arg('ID', () => String) ID: string, @Arg('options___', () => DeleteOptionsInput) options: DeleteOptionsInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const key = new CompositeKey([{FieldName: 'ID', Value: ID}]);
        return this.DeleteRecord('Submission Roles', key, options, dataSource, userPayload, pubSub);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Submissions
//****************************************************************************
@ObjectType({ description: 'Table to store submission details.' })
export class Submission_ {
    @Field(() => Int) 
    ID: number;
        
    @Field() 
    @MaxLength(8)
    SubmittedAt: Date;
        
    @Field({description: 'Title of the submission.'}) 
    @MaxLength(400)
    Title: string;
        
    @Field({nullable: true}) 
    Description?: string;
        
    @Field({nullable: true}) 
    Contents?: string;
        
    @Field() 
    @MaxLength(16)
    SubmissionTypeID: string;
        
    @Field(() => Int) 
    FieldOfStudyID: number;
        
    @Field() 
    @MaxLength(100)
    Status: string;
        
    @Field() 
    @MaxLength(10)
    _mj__UpdatedAt: Date;
        
    @Field() 
    @MaxLength(10)
    _mj__CreatedAt: Date;
        
    @Field() 
    @MaxLength(200)
    SubmissionType: string;
        
    @Field(() => [Review_])
    Reviews_SubmissionIDArray: Review_[]; // Link to Reviews
    
    @Field(() => [SubmissionPerson_])
    SubmissionPersons_SubmissionIDArray: SubmissionPerson_[]; // Link to SubmissionPersons
    
}

//****************************************************************************
// INPUT TYPE for Submissions
//****************************************************************************
@InputType()
export class CreateSubmissionInput {
    @Field()
    SubmittedAt: Date;

    @Field()
    Title: string;

    @Field({ nullable: true })
    Description?: string;

    @Field({ nullable: true })
    Contents?: string;

    @Field()
    SubmissionTypeID: string;

    @Field(() => Int)
    FieldOfStudyID: number;

    @Field()
    Status: string;
}
    

//****************************************************************************
// INPUT TYPE for Submissions
//****************************************************************************
@InputType()
export class UpdateSubmissionInput {
    @Field(() => Int)
    ID: number;

    @Field()
    SubmittedAt: Date;

    @Field()
    Title: string;

    @Field({ nullable: true })
    Description?: string;

    @Field({ nullable: true })
    Contents?: string;

    @Field()
    SubmissionTypeID: string;

    @Field(() => Int)
    FieldOfStudyID: number;

    @Field()
    Status: string;

    @Field(() => [KeyValuePairInput], { nullable: true })
    OldValues___?: KeyValuePairInput[];
}
    
//****************************************************************************
// RESOLVER for Submissions
//****************************************************************************
@ObjectType()
export class RunSubmissionViewResult {
    @Field(() => [Submission_])
    Results: Submission_[];

    @Field(() => String, {nullable: true})
    UserViewRunID?: string;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Submission_)
export class SubmissionResolver extends ResolverBase {
    @Query(() => RunSubmissionViewResult)
    async RunSubmissionViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunSubmissionViewResult)
    async RunSubmissionViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunSubmissionViewResult)
    async RunSubmissionDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Submissions';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }
    @Query(() => Submission_, { nullable: true })
    async Submission(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Submission_ | null> {
        this.CheckUserReadPermissions('Submissions', userPayload);
        const sSQL = `SELECT * FROM [abstracts].[vwSubmissions] WHERE [ID]=${ID} ` + this.getRowLevelSecurityWhereClause('Submissions', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.MapFieldNamesToCodeNames('Submissions', await dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {}))
        return result;
    }
    
    @FieldResolver(() => [Review_])
    async Reviews_SubmissionIDArray(@Root() submission_: Submission_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Reviews', userPayload);
        const sSQL = `SELECT * FROM [abstracts].[vwReviews] WHERE [SubmissionID]=${submission_.ID} ` + this.getRowLevelSecurityWhereClause('Reviews', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.ArrayMapFieldNamesToCodeNames('Reviews', await dataSource.query(sSQL));
        return result;
    }
        
    @FieldResolver(() => [SubmissionPerson_])
    async SubmissionPersons_SubmissionIDArray(@Root() submission_: Submission_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Submission Persons', userPayload);
        const sSQL = `SELECT * FROM [abstracts].[vwSubmissionPersons] WHERE [SubmissionID]=${submission_.ID} ` + this.getRowLevelSecurityWhereClause('Submission Persons', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.ArrayMapFieldNamesToCodeNames('Submission Persons', await dataSource.query(sSQL));
        return result;
    }
        
    @Mutation(() => Submission_)
    async CreateSubmission(
        @Arg('input', () => CreateSubmissionInput) input: CreateSubmissionInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        return this.CreateRecord('Submissions', input, dataSource, userPayload, pubSub)
    }
        
    @Mutation(() => Submission_)
    async UpdateSubmission(
        @Arg('input', () => UpdateSubmissionInput) input: UpdateSubmissionInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        return this.UpdateRecord('Submissions', input, dataSource, userPayload, pubSub);
    }
    
    @Mutation(() => Submission_)
    async DeleteSubmission(@Arg('ID', () => Int) ID: number, @Arg('options___', () => DeleteOptionsInput) options: DeleteOptionsInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const key = new CompositeKey([{FieldName: 'ID', Value: ID}]);
        return this.DeleteRecord('Submissions', key, options, dataSource, userPayload, pubSub);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Reviews
//****************************************************************************
@ObjectType({ description: 'Table for storing reviews of submissions.' })
export class Review_ {
    @Field(() => Int) 
    ID: number;
        
    @Field() 
    @MaxLength(8)
    AssignedAt: Date;
        
    @Field(() => Int) 
    SubmissionID: number;
        
    @Field(() => Int) 
    ReviewerID: number;
        
    @Field() 
    @MaxLength(16)
    RoleID: string;
        
    @Field(() => Int, {nullable: true}) 
    Score?: number;
        
    @Field() 
    @MaxLength(100)
    Status: string;
        
    @Field({nullable: true}) 
    @MaxLength(8)
    ReviewedAt?: Date;
        
    @Field({nullable: true}) 
    Comments?: string;
        
    @Field() 
    @MaxLength(10)
    _mj__UpdatedAt: Date;
        
    @Field() 
    @MaxLength(10)
    _mj__CreatedAt: Date;
        
    @Field() 
    @MaxLength(200)
    Role: string;
        
}

//****************************************************************************
// INPUT TYPE for Reviews
//****************************************************************************
@InputType()
export class CreateReviewInput {
    @Field()
    AssignedAt: Date;

    @Field(() => Int)
    SubmissionID: number;

    @Field(() => Int)
    ReviewerID: number;

    @Field()
    RoleID: string;

    @Field(() => Int, { nullable: true })
    Score?: number;

    @Field()
    Status: string;

    @Field({ nullable: true })
    ReviewedAt?: Date;

    @Field({ nullable: true })
    Comments?: string;
}
    

//****************************************************************************
// INPUT TYPE for Reviews
//****************************************************************************
@InputType()
export class UpdateReviewInput {
    @Field(() => Int)
    ID: number;

    @Field()
    AssignedAt: Date;

    @Field(() => Int)
    SubmissionID: number;

    @Field(() => Int)
    ReviewerID: number;

    @Field()
    RoleID: string;

    @Field(() => Int, { nullable: true })
    Score?: number;

    @Field()
    Status: string;

    @Field({ nullable: true })
    ReviewedAt?: Date;

    @Field({ nullable: true })
    Comments?: string;

    @Field(() => [KeyValuePairInput], { nullable: true })
    OldValues___?: KeyValuePairInput[];
}
    
//****************************************************************************
// RESOLVER for Reviews
//****************************************************************************
@ObjectType()
export class RunReviewViewResult {
    @Field(() => [Review_])
    Results: Review_[];

    @Field(() => String, {nullable: true})
    UserViewRunID?: string;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Review_)
export class ReviewResolver extends ResolverBase {
    @Query(() => RunReviewViewResult)
    async RunReviewViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunReviewViewResult)
    async RunReviewViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunReviewViewResult)
    async RunReviewDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Reviews';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }
    @Query(() => Review_, { nullable: true })
    async Review(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Review_ | null> {
        this.CheckUserReadPermissions('Reviews', userPayload);
        const sSQL = `SELECT * FROM [abstracts].[vwReviews] WHERE [ID]=${ID} ` + this.getRowLevelSecurityWhereClause('Reviews', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.MapFieldNamesToCodeNames('Reviews', await dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {}))
        return result;
    }
    
    @Mutation(() => Review_)
    async CreateReview(
        @Arg('input', () => CreateReviewInput) input: CreateReviewInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        return this.CreateRecord('Reviews', input, dataSource, userPayload, pubSub)
    }
        
    @Mutation(() => Review_)
    async UpdateReview(
        @Arg('input', () => UpdateReviewInput) input: UpdateReviewInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        return this.UpdateRecord('Reviews', input, dataSource, userPayload, pubSub);
    }
    
    @Mutation(() => Review_)
    async DeleteReview(@Arg('ID', () => Int) ID: number, @Arg('options___', () => DeleteOptionsInput) options: DeleteOptionsInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const key = new CompositeKey([{FieldName: 'ID', Value: ID}]);
        return this.DeleteRecord('Reviews', key, options, dataSource, userPayload, pubSub);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Field Of Studies
//****************************************************************************
@ObjectType({ description: 'Table to store fields of study.' })
export class FieldOfStudy_ {
    @Field(() => Int, {description: 'Primary key identifier for the field of study.'}) 
    ID: number;
        
    @Field({description: 'The name of the field of study.'}) 
    @MaxLength(510)
    NameOfField: string;
        
    @Field() 
    @MaxLength(10)
    _mj__CreatedAt: Date;
        
    @Field() 
    @MaxLength(10)
    _mj__UpdatedAt: Date;
        
}

//****************************************************************************
// INPUT TYPE for Field Of Studies
//****************************************************************************
@InputType()
export class CreateFieldOfStudyInput {
    @Field()
    NameOfField: string;
}
    

//****************************************************************************
// INPUT TYPE for Field Of Studies
//****************************************************************************
@InputType()
export class UpdateFieldOfStudyInput {
    @Field(() => Int)
    ID: number;

    @Field()
    NameOfField: string;

    @Field(() => [KeyValuePairInput], { nullable: true })
    OldValues___?: KeyValuePairInput[];
}
    
//****************************************************************************
// RESOLVER for Field Of Studies
//****************************************************************************
@ObjectType()
export class RunFieldOfStudyViewResult {
    @Field(() => [FieldOfStudy_])
    Results: FieldOfStudy_[];

    @Field(() => String, {nullable: true})
    UserViewRunID?: string;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(FieldOfStudy_)
export class FieldOfStudyResolver extends ResolverBase {
    @Query(() => RunFieldOfStudyViewResult)
    async RunFieldOfStudyViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunFieldOfStudyViewResult)
    async RunFieldOfStudyViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunFieldOfStudyViewResult)
    async RunFieldOfStudyDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Field Of Studies';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }
    @Query(() => FieldOfStudy_, { nullable: true })
    async FieldOfStudy(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<FieldOfStudy_ | null> {
        this.CheckUserReadPermissions('Field Of Studies', userPayload);
        const sSQL = `SELECT * FROM [abstracts].[vwFieldOfStudies] WHERE [ID]=${ID} ` + this.getRowLevelSecurityWhereClause('Field Of Studies', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.MapFieldNamesToCodeNames('Field Of Studies', await dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {}))
        return result;
    }
    
    @Mutation(() => FieldOfStudy_)
    async CreateFieldOfStudy(
        @Arg('input', () => CreateFieldOfStudyInput) input: CreateFieldOfStudyInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        return this.CreateRecord('Field Of Studies', input, dataSource, userPayload, pubSub)
    }
        
    @Mutation(() => FieldOfStudy_)
    async UpdateFieldOfStudy(
        @Arg('input', () => UpdateFieldOfStudyInput) input: UpdateFieldOfStudyInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        return this.UpdateRecord('Field Of Studies', input, dataSource, userPayload, pubSub);
    }
    
    @Mutation(() => FieldOfStudy_)
    async DeleteFieldOfStudy(@Arg('ID', () => Int) ID: number, @Arg('options___', () => DeleteOptionsInput) options: DeleteOptionsInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const key = new CompositeKey([{FieldName: 'ID', Value: ID}]);
        return this.DeleteRecord('Field Of Studies', key, options, dataSource, userPayload, pubSub);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Organization Roles
//****************************************************************************
@ObjectType({ description: 'Table to store roles within an organization.' })
export class OrganizationRole_ {
    @Field(() => Int, {description: 'Primary key identifier for the organization role.'}) 
    ID: number;
        
    @Field({description: 'Name of the role in the organization.'}) 
    @MaxLength(510)
    RoleName: string;
        
    @Field() 
    @MaxLength(10)
    _mj__CreatedAt: Date;
        
    @Field() 
    @MaxLength(10)
    _mj__UpdatedAt: Date;
        
    @Field(() => [Person_])
    Persons_OrganizationRoleIDArray: Person_[]; // Link to Persons
    
}

//****************************************************************************
// INPUT TYPE for Organization Roles
//****************************************************************************
@InputType()
export class CreateOrganizationRoleInput {
    @Field()
    RoleName: string;
}
    

//****************************************************************************
// INPUT TYPE for Organization Roles
//****************************************************************************
@InputType()
export class UpdateOrganizationRoleInput {
    @Field(() => Int)
    ID: number;

    @Field()
    RoleName: string;

    @Field(() => [KeyValuePairInput], { nullable: true })
    OldValues___?: KeyValuePairInput[];
}
    
//****************************************************************************
// RESOLVER for Organization Roles
//****************************************************************************
@ObjectType()
export class RunOrganizationRoleViewResult {
    @Field(() => [OrganizationRole_])
    Results: OrganizationRole_[];

    @Field(() => String, {nullable: true})
    UserViewRunID?: string;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(OrganizationRole_)
export class OrganizationRoleResolver extends ResolverBase {
    @Query(() => RunOrganizationRoleViewResult)
    async RunOrganizationRoleViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunOrganizationRoleViewResult)
    async RunOrganizationRoleViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunOrganizationRoleViewResult)
    async RunOrganizationRoleDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Organization Roles';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }
    @Query(() => OrganizationRole_, { nullable: true })
    async OrganizationRole(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<OrganizationRole_ | null> {
        this.CheckUserReadPermissions('Organization Roles', userPayload);
        const sSQL = `SELECT * FROM [abstracts].[vwOrganizationRoles] WHERE [ID]=${ID} ` + this.getRowLevelSecurityWhereClause('Organization Roles', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.MapFieldNamesToCodeNames('Organization Roles', await dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {}))
        return result;
    }
    
    @FieldResolver(() => [Person_])
    async Persons_OrganizationRoleIDArray(@Root() organizationrole_: OrganizationRole_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Persons', userPayload);
        const sSQL = `SELECT * FROM [abstracts].[vwPersons] WHERE [OrganizationRoleID]=${organizationrole_.ID} ` + this.getRowLevelSecurityWhereClause('Persons', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.ArrayMapFieldNamesToCodeNames('Persons', await dataSource.query(sSQL));
        return result;
    }
        
    @Mutation(() => OrganizationRole_)
    async CreateOrganizationRole(
        @Arg('input', () => CreateOrganizationRoleInput) input: CreateOrganizationRoleInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        return this.CreateRecord('Organization Roles', input, dataSource, userPayload, pubSub)
    }
        
    @Mutation(() => OrganizationRole_)
    async UpdateOrganizationRole(
        @Arg('input', () => UpdateOrganizationRoleInput) input: UpdateOrganizationRoleInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        return this.UpdateRecord('Organization Roles', input, dataSource, userPayload, pubSub);
    }
    
    @Mutation(() => OrganizationRole_)
    async DeleteOrganizationRole(@Arg('ID', () => Int) ID: number, @Arg('options___', () => DeleteOptionsInput) options: DeleteOptionsInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const key = new CompositeKey([{FieldName: 'ID', Value: ID}]);
        return this.DeleteRecord('Organization Roles', key, options, dataSource, userPayload, pubSub);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Reviewer Roles
//****************************************************************************
@ObjectType({ description: 'Roles associated with reviewer assignments.' })
export class ReviewerRole_ {
    @Field() 
    @MaxLength(16)
    ID: string;
        
    @Field() 
    @MaxLength(200)
    Name: string;
        
    @Field({nullable: true}) 
    @MaxLength(16)
    SubmissionTypeID?: string;
        
    @Field({nullable: true}) 
    @MaxLength(510)
    Description?: string;
        
    @Field() 
    @MaxLength(10)
    _mj__CreatedAt: Date;
        
    @Field() 
    @MaxLength(10)
    _mj__UpdatedAt: Date;
        
    @Field({nullable: true}) 
    @MaxLength(200)
    SubmissionType?: string;
        
    @Field(() => [Review_])
    Reviews_RoleIDArray: Review_[]; // Link to Reviews
    
}

//****************************************************************************
// INPUT TYPE for Reviewer Roles
//****************************************************************************
@InputType()
export class CreateReviewerRoleInput {
    @Field()
    Name: string;

    @Field({ nullable: true })
    SubmissionTypeID?: string;

    @Field({ nullable: true })
    Description?: string;
}
    

//****************************************************************************
// INPUT TYPE for Reviewer Roles
//****************************************************************************
@InputType()
export class UpdateReviewerRoleInput {
    @Field()
    ID: string;

    @Field()
    Name: string;

    @Field({ nullable: true })
    SubmissionTypeID?: string;

    @Field({ nullable: true })
    Description?: string;

    @Field(() => [KeyValuePairInput], { nullable: true })
    OldValues___?: KeyValuePairInput[];
}
    
//****************************************************************************
// RESOLVER for Reviewer Roles
//****************************************************************************
@ObjectType()
export class RunReviewerRoleViewResult {
    @Field(() => [ReviewerRole_])
    Results: ReviewerRole_[];

    @Field(() => String, {nullable: true})
    UserViewRunID?: string;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(ReviewerRole_)
export class ReviewerRoleResolver extends ResolverBase {
    @Query(() => RunReviewerRoleViewResult)
    async RunReviewerRoleViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunReviewerRoleViewResult)
    async RunReviewerRoleViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunReviewerRoleViewResult)
    async RunReviewerRoleDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Reviewer Roles';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }
    @Query(() => ReviewerRole_, { nullable: true })
    async ReviewerRole(@Arg('ID', () => String) ID: string, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<ReviewerRole_ | null> {
        this.CheckUserReadPermissions('Reviewer Roles', userPayload);
        const sSQL = `SELECT * FROM [abstracts].[vwReviewerRoles] WHERE [ID]='${ID}' ` + this.getRowLevelSecurityWhereClause('Reviewer Roles', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.MapFieldNamesToCodeNames('Reviewer Roles', await dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {}))
        return result;
    }
    
    @FieldResolver(() => [Review_])
    async Reviews_RoleIDArray(@Root() reviewerrole_: ReviewerRole_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Reviews', userPayload);
        const sSQL = `SELECT * FROM [abstracts].[vwReviews] WHERE [RoleID]='${reviewerrole_.ID}' ` + this.getRowLevelSecurityWhereClause('Reviews', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.ArrayMapFieldNamesToCodeNames('Reviews', await dataSource.query(sSQL));
        return result;
    }
        
    @Mutation(() => ReviewerRole_)
    async CreateReviewerRole(
        @Arg('input', () => CreateReviewerRoleInput) input: CreateReviewerRoleInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        return this.CreateRecord('Reviewer Roles', input, dataSource, userPayload, pubSub)
    }
        
    @Mutation(() => ReviewerRole_)
    async UpdateReviewerRole(
        @Arg('input', () => UpdateReviewerRoleInput) input: UpdateReviewerRoleInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        return this.UpdateRecord('Reviewer Roles', input, dataSource, userPayload, pubSub);
    }
    
    @Mutation(() => ReviewerRole_)
    async DeleteReviewerRole(@Arg('ID', () => String) ID: string, @Arg('options___', () => DeleteOptionsInput) options: DeleteOptionsInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const key = new CompositeKey([{FieldName: 'ID', Value: ID}]);
        return this.DeleteRecord('Reviewer Roles', key, options, dataSource, userPayload, pubSub);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Persons
//****************************************************************************
@ObjectType({ description: 'Table to store information about individuals.' })
export class Person_ {
    @Field(() => Int) 
    ID: number;
        
    @Field() 
    @MaxLength(200)
    FirstName: string;
        
    @Field() 
    @MaxLength(200)
    LastName: string;
        
    @Field() 
    @MaxLength(510)
    Email: string;
        
    @Field() 
    @MaxLength(10)
    _mj__CreatedAt: Date;
        
    @Field() 
    @MaxLength(10)
    _mj__UpdatedAt: Date;
        
    @Field(() => Int, {nullable: true}) 
    OrganizationID?: number;
        
    @Field(() => Int, {nullable: true}) 
    OrganizationRoleID?: number;
        
    @Field({nullable: true}) 
    @MaxLength(510)
    Organization?: string;
        
    @Field(() => [Review_])
    Reviews_ReviewerIDArray: Review_[]; // Link to Reviews
    
    @Field(() => [SubmissionPerson_])
    SubmissionPersons_PersonIDArray: SubmissionPerson_[]; // Link to SubmissionPersons
    
}

//****************************************************************************
// INPUT TYPE for Persons
//****************************************************************************
@InputType()
export class CreatePersonInput {
    @Field()
    FirstName: string;

    @Field()
    LastName: string;

    @Field()
    Email: string;

    @Field(() => Int, { nullable: true })
    OrganizationID?: number;

    @Field(() => Int, { nullable: true })
    OrganizationRoleID?: number;
}
    

//****************************************************************************
// INPUT TYPE for Persons
//****************************************************************************
@InputType()
export class UpdatePersonInput {
    @Field(() => Int)
    ID: number;

    @Field()
    FirstName: string;

    @Field()
    LastName: string;

    @Field()
    Email: string;

    @Field(() => Int, { nullable: true })
    OrganizationID?: number;

    @Field(() => Int, { nullable: true })
    OrganizationRoleID?: number;

    @Field(() => [KeyValuePairInput], { nullable: true })
    OldValues___?: KeyValuePairInput[];
}
    
//****************************************************************************
// RESOLVER for Persons
//****************************************************************************
@ObjectType()
export class RunPersonViewResult {
    @Field(() => [Person_])
    Results: Person_[];

    @Field(() => String, {nullable: true})
    UserViewRunID?: string;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Person_)
export class PersonResolver extends ResolverBase {
    @Query(() => RunPersonViewResult)
    async RunPersonViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunPersonViewResult)
    async RunPersonViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunPersonViewResult)
    async RunPersonDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        input.EntityName = 'Persons';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }
    @Query(() => Person_, { nullable: true })
    async Person(@Arg('ID', () => Int) ID: number, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Person_ | null> {
        this.CheckUserReadPermissions('Persons', userPayload);
        const sSQL = `SELECT * FROM [abstracts].[vwPersons] WHERE [ID]=${ID} ` + this.getRowLevelSecurityWhereClause('Persons', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.MapFieldNamesToCodeNames('Persons', await dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {}))
        return result;
    }
    
    @FieldResolver(() => [Review_])
    async Reviews_ReviewerIDArray(@Root() person_: Person_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Reviews', userPayload);
        const sSQL = `SELECT * FROM [abstracts].[vwReviews] WHERE [ReviewerID]=${person_.ID} ` + this.getRowLevelSecurityWhereClause('Reviews', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.ArrayMapFieldNamesToCodeNames('Reviews', await dataSource.query(sSQL));
        return result;
    }
        
    @FieldResolver(() => [SubmissionPerson_])
    async SubmissionPersons_PersonIDArray(@Root() person_: Person_, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Submission Persons', userPayload);
        const sSQL = `SELECT * FROM [abstracts].[vwSubmissionPersons] WHERE [PersonID]=${person_.ID} ` + this.getRowLevelSecurityWhereClause('Submission Persons', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.ArrayMapFieldNamesToCodeNames('Submission Persons', await dataSource.query(sSQL));
        return result;
    }
        
    @Mutation(() => Person_)
    async CreatePerson(
        @Arg('input', () => CreatePersonInput) input: CreatePersonInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        return this.CreateRecord('Persons', input, dataSource, userPayload, pubSub)
    }
        
    @Mutation(() => Person_)
    async UpdatePerson(
        @Arg('input', () => UpdatePersonInput) input: UpdatePersonInput,
        @Ctx() { dataSource, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        return this.UpdateRecord('Persons', input, dataSource, userPayload, pubSub);
    }
    
    @Mutation(() => Person_)
    async DeletePerson(@Arg('ID', () => Int) ID: number, @Arg('options___', () => DeleteOptionsInput) options: DeleteOptionsInput, @Ctx() { dataSource, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const key = new CompositeKey([{FieldName: 'ID', Value: ID}]);
        return this.DeleteRecord('Persons', key, options, dataSource, userPayload, pubSub);
    }
    
}