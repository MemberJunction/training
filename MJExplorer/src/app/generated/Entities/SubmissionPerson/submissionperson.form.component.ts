import { Component } from '@angular/core';
import { SubmissionPersonEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-base-forms';
import { LoadSubmissionPersonDetailsComponent } from "./sections/details.component"

@RegisterClass(BaseFormComponent, 'Submission Persons') // Tell MemberJunction about this class
@Component({
    selector: 'gen-submissionperson-form',
    templateUrl: './submissionperson.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class SubmissionPersonFormComponent extends BaseFormComponent {
    public record!: SubmissionPersonEntity;
} 

export function LoadSubmissionPersonFormComponent() {
    LoadSubmissionPersonDetailsComponent();
}
