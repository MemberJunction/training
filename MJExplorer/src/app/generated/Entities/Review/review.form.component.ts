import { Component } from '@angular/core';
import { ReviewEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-base-forms';
import { LoadReviewDetailsComponent } from "./sections/details.component"

@RegisterClass(BaseFormComponent, 'Reviews') // Tell MemberJunction about this class
@Component({
    selector: 'gen-review-form',
    templateUrl: './review.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class ReviewFormComponent extends BaseFormComponent {
    public record!: ReviewEntity;
} 

export function LoadReviewFormComponent() {
    LoadReviewDetailsComponent();
}
