import { Component, Input } from '@angular/core';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormSectionComponent } from '@memberjunction/ng-base-forms';
import { FieldOfStudyEntity } from 'mj_generatedentities';

@RegisterClass(BaseFormSectionComponent, 'Field Of Studies.details') // Tell MemberJunction about this class 
@Component({
    selector: 'gen-fieldofstudy-form-details',
    styleUrls: ['../../../../../shared/form-styles.css'],
    template: `<div *ngIf="this.record">
    <div class="record-form">
        <mj-form-field 
            [record]="record"
            [ShowLabel]="true"
            FieldName="NameOfField"
            Type="textarea"
            [EditMode]="EditMode"
        ></mj-form-field>
        <mj-form-field 
            [record]="record"
            [ShowLabel]="true"
            FieldName="__mj_CreatedAt"
            Type="textbox"
            [EditMode]="EditMode"
        ></mj-form-field>
        <mj-form-field 
            [record]="record"
            [ShowLabel]="true"
            FieldName="__mj_UpdatedAt"
            Type="textbox"
            [EditMode]="EditMode"
        ></mj-form-field>

    </div>
</div>
    `
})
export class FieldOfStudyDetailsComponent extends BaseFormSectionComponent {
    @Input() override record!: FieldOfStudyEntity;
    @Input() override EditMode: boolean = false;
}

export function LoadFieldOfStudyDetailsComponent() {
    // does nothing, but called in order to prevent tree-shaking from eliminating this component from the build
}
      