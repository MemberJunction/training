import { Component } from '@angular/core';
import { SubmissionTypeEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-base-forms';
import { LoadSubmissionTypeDetailsComponent } from "./sections/details.component"
import { UserViewGridComponent } from "@memberjunction/ng-user-view-grid"

@RegisterClass(BaseFormComponent, 'Submission Types') // Tell MemberJunction about this class
@Component({
    selector: 'gen-submissiontype-form',
    templateUrl: './submissiontype.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class SubmissionTypeFormComponent extends BaseFormComponent {
    public record!: SubmissionTypeEntity;
} 

export function LoadSubmissionTypeFormComponent() {
    LoadSubmissionTypeDetailsComponent();
}
