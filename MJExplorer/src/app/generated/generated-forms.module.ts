/**********************************************************************************
* GENERATED FILE - This file is automatically managed by the MJ CodeGen tool, 
* 
* DO NOT MODIFY THIS FILE - any changes you make will be wiped out the next time the file is
* generated
* 
**********************************************************************************/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// MemberJunction Imports
import { BaseFormsModule } from '@memberjunction/ng-base-forms';
import { FormToolbarModule } from '@memberjunction/ng-form-toolbar';
import { UserViewGridModule } from '@memberjunction/ng-user-view-grid';
import { LinkDirectivesModule } from '@memberjunction/ng-link-directives';
import { MJTabStripModule } from "@memberjunction/ng-tabstrip";
import { ContainerDirectivesModule } from "@memberjunction/ng-container-directives";

// Kendo Imports
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ComboBoxModule } from '@progress/kendo-angular-dropdowns';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';

// Import Generated Components
import { FieldOfStudyFormComponent, LoadFieldOfStudyFormComponent } from "./Entities/FieldOfStudy/fieldofstudy.form.component";
import { OrganizationRoleFormComponent, LoadOrganizationRoleFormComponent } from "./Entities/OrganizationRole/organizationrole.form.component";
import { OrganizationFormComponent, LoadOrganizationFormComponent } from "./Entities/Organization/organization.form.component";
import { PersonFormComponent, LoadPersonFormComponent } from "./Entities/Person/person.form.component";
import { ReviewerRoleFormComponent, LoadReviewerRoleFormComponent } from "./Entities/ReviewerRole/reviewerrole.form.component";
import { ReviewFormComponent, LoadReviewFormComponent } from "./Entities/Review/review.form.component";
import { SubmissionPersonFormComponent, LoadSubmissionPersonFormComponent } from "./Entities/SubmissionPerson/submissionperson.form.component";
import { SubmissionRoleFormComponent, LoadSubmissionRoleFormComponent } from "./Entities/SubmissionRole/submissionrole.form.component";
import { SubmissionTypeFormComponent, LoadSubmissionTypeFormComponent } from "./Entities/SubmissionType/submissiontype.form.component";
import { SubmissionFormComponent, LoadSubmissionFormComponent } from "./Entities/Submission/submission.form.component";
import { FieldOfStudyDetailsComponent, LoadFieldOfStudyDetailsComponent } from "./Entities/FieldOfStudy/sections/details.component"
import { OrganizationRoleDetailsComponent, LoadOrganizationRoleDetailsComponent } from "./Entities/OrganizationRole/sections/details.component"
import { OrganizationDetailsComponent, LoadOrganizationDetailsComponent } from "./Entities/Organization/sections/details.component"
import { PersonDetailsComponent, LoadPersonDetailsComponent } from "./Entities/Person/sections/details.component"
import { ReviewerRoleDetailsComponent, LoadReviewerRoleDetailsComponent } from "./Entities/ReviewerRole/sections/details.component"
import { ReviewDetailsComponent, LoadReviewDetailsComponent } from "./Entities/Review/sections/details.component"
import { SubmissionPersonDetailsComponent, LoadSubmissionPersonDetailsComponent } from "./Entities/SubmissionPerson/sections/details.component"
import { SubmissionRoleDetailsComponent, LoadSubmissionRoleDetailsComponent } from "./Entities/SubmissionRole/sections/details.component"
import { SubmissionTypeDetailsComponent, LoadSubmissionTypeDetailsComponent } from "./Entities/SubmissionType/sections/details.component"
import { SubmissionDetailsComponent, LoadSubmissionDetailsComponent } from "./Entities/Submission/sections/details.component"
   

@NgModule({
declarations: [
    FieldOfStudyFormComponent,
    OrganizationRoleFormComponent,
    OrganizationFormComponent,
    PersonFormComponent,
    ReviewerRoleFormComponent,
    ReviewFormComponent,
    SubmissionPersonFormComponent,
    SubmissionRoleFormComponent,
    SubmissionTypeFormComponent,
    SubmissionFormComponent,
    FieldOfStudyDetailsComponent,
    OrganizationRoleDetailsComponent,
    OrganizationDetailsComponent,
    PersonDetailsComponent,
    ReviewerRoleDetailsComponent,
    ReviewDetailsComponent,
    SubmissionPersonDetailsComponent,
    SubmissionRoleDetailsComponent,
    SubmissionTypeDetailsComponent,
    SubmissionDetailsComponent],
imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    InputsModule,
    ButtonsModule,
    DateInputsModule,
    UserViewGridModule,
    LinkDirectivesModule,
    BaseFormsModule,
    FormToolbarModule,
    MJTabStripModule,
    ContainerDirectivesModule,
    DropDownListModule,
    ComboBoxModule,
    UserViewGridModule
],
exports: [
]
})
export class GeneratedForms_SubModule_0 { }
    


@NgModule({
declarations: [
],
imports: [
    GeneratedForms_SubModule_0
]
})
export class GeneratedFormsModule { }
    
export function LoadGeneratedForms() {
    // This function doesn't do much, but it calls each generated form's loader function
    // which in turn calls the sections for that generated form. Ultimately, those bits of 
    // code do NOTHING - the point is to prevent the code from being eliminated during tree shaking
    // since it is dynamically instantiated on demand, and the Angular compiler has no way to know that,
    // in production builds tree shaking will eliminate the code unless we do this
    LoadFieldOfStudyFormComponent();
    LoadOrganizationRoleFormComponent();
    LoadOrganizationFormComponent();
    LoadPersonFormComponent();
    LoadReviewerRoleFormComponent();
    LoadReviewFormComponent();
    LoadSubmissionPersonFormComponent();
    LoadSubmissionRoleFormComponent();
    LoadSubmissionTypeFormComponent();
    LoadSubmissionFormComponent();
    LoadFieldOfStudyDetailsComponent();
    LoadOrganizationRoleDetailsComponent();
    LoadOrganizationDetailsComponent();
    LoadPersonDetailsComponent();
    LoadReviewerRoleDetailsComponent();
    LoadReviewDetailsComponent();
    LoadSubmissionPersonDetailsComponent();
    LoadSubmissionRoleDetailsComponent();
    LoadSubmissionTypeDetailsComponent();
    LoadSubmissionDetailsComponent();
}
    