import { Component } from '@angular/core';
import { OrganizationRoleEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-base-forms';
import { LoadOrganizationRoleDetailsComponent } from "./sections/details.component"
import { UserViewGridComponent } from "@memberjunction/ng-user-view-grid"

@RegisterClass(BaseFormComponent, 'Organization Roles') // Tell MemberJunction about this class
@Component({
    selector: 'gen-organizationrole-form',
    templateUrl: './organizationrole.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class OrganizationRoleFormComponent extends BaseFormComponent {
    public record!: OrganizationRoleEntity;
} 

export function LoadOrganizationRoleFormComponent() {
    LoadOrganizationRoleDetailsComponent();
}
