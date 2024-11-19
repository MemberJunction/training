import { Component } from '@angular/core';
import { SubmissionRoleEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-base-forms';
import { LoadSubmissionRoleDetailsComponent } from "./sections/details.component"
import { UserViewGridComponent } from "@memberjunction/ng-user-view-grid"

@RegisterClass(BaseFormComponent, 'Submission Roles') // Tell MemberJunction about this class
@Component({
    selector: 'gen-submissionrole-form',
    templateUrl: './submissionrole.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class SubmissionRoleFormComponent extends BaseFormComponent {
    public record!: SubmissionRoleEntity;
} 

export function LoadSubmissionRoleFormComponent() {
    LoadSubmissionRoleDetailsComponent();
}
