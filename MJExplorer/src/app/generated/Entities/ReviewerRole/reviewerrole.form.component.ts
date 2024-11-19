import { Component } from '@angular/core';
import { ReviewerRoleEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-base-forms';
import { LoadReviewerRoleDetailsComponent } from "./sections/details.component"
import { UserViewGridComponent } from "@memberjunction/ng-user-view-grid"

@RegisterClass(BaseFormComponent, 'Reviewer Roles') // Tell MemberJunction about this class
@Component({
    selector: 'gen-reviewerrole-form',
    templateUrl: './reviewerrole.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class ReviewerRoleFormComponent extends BaseFormComponent {
    public record!: ReviewerRoleEntity;
} 

export function LoadReviewerRoleFormComponent() {
    LoadReviewerRoleDetailsComponent();
}
