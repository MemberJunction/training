import { Component } from '@angular/core';
import { FieldOfStudyEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-base-forms';
import { LoadFieldOfStudyDetailsComponent } from "./sections/details.component"

@RegisterClass(BaseFormComponent, 'Field Of Studies') // Tell MemberJunction about this class
@Component({
    selector: 'gen-fieldofstudy-form',
    templateUrl: './fieldofstudy.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class FieldOfStudyFormComponent extends BaseFormComponent {
    public record!: FieldOfStudyEntity;
} 

export function LoadFieldOfStudyFormComponent() {
    LoadFieldOfStudyDetailsComponent();
}
