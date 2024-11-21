import { Component, OnInit } from '@angular/core';
import { Metadata, RunView, RunViewResult } from '@memberjunction/core';
import { PersonEntity, SubmissionEntity, SubmissionPersonEntity } from 'mj_generatedentities';
import { SharedService } from '../shared-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-submission',
  templateUrl: './new-submission.component.html',
  styleUrls: ['./new-submission.component.css']
})

export class NewSubmission implements OnInit {
  public submission: SubmissionEntity;
  public person: PersonEntity;
  public organization: string;
  public organizationRole: string;
  public fieldOfStudyName: string;

  public organizationExists: boolean = true;
  public organizationRoleExists: boolean = true; 

  private md: Metadata;

  constructor (private sharedService: SharedService, private router: Router) {

  }

  async ngOnInit() {
    this.sharedService.setupComplete$.subscribe(async (complete: boolean) => {
      if (complete) {
        this.md = new Metadata();
        this.submission = await this.md.GetEntityObject<SubmissionEntity>('Submissions');    
        this.submission.SubmissionTypeID =  "5DA65B3A-EC1B-40C9-B727-718541CC2DFE";
        this.submission.Status = "Pending";

        this.person = await this.md.GetEntityObject<PersonEntity>('Persons');
      }
    });
  }

  currentStep: number = 0;

  steps = [
    { label: 'Contact Info', icon: 'user' },
    { label: 'Abstract Details', icon: 'list-unordered-outline' },
    { label: 'Requirements & Acknowledgment', icon: 'info-circle' },
    { label: 'Review', icon: 'check-circle' }
  ];

  onStepChange(event: number): void {
    this.currentStep = event;
    console.log('Current step:', this.currentStep);
  }

  async goToNext(): Promise<void> {
    if (this.currentStep === 0) {
      if (! await this.onSavePerson()) {
        alert (this.person.LatestResult.Message);
      } else {
        this.currentStep++;
      }
    } else if (this.currentStep < this.steps.length - 1 || this.fieldOfStudyName) {
      this.currentStep++;
    }
  }

  goToPrevious(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  public async onSave() {
    if (await this.submission.Save()) {
      this.router.navigate(['submissions-list']);
    }
    else {
      alert (this.submission.LatestResult.Message);
    }
  }

  public async onSavePerson() : Promise<boolean> {
    if (this.person) {
      const rv = new RunView();
      const result = await rv.RunView({
        EntityName: 'Persons',
        ExtraFilter: `FirstName = '${this.person.FirstName}' AND 
                      LastName = '${this.person.LastName}' AND 
                      Email = '${this.person.Email}'`
      }, this.md.CurrentUser);

      if (result.Success && result.Results.length > 0) {
        if (await this.person.Load(result.Results[0].ID)) {
          return true;
        }
      } else {
        if (await this.person.Save()) {
          return true;
        }
      }
    }

    return false;
  }

  onReadyToMove() : boolean {
    if (this.currentStep === 0) {
      return this.organizationExists && this.organizationRoleExists && 
             this.person.FirstName?.trim().length > 0 && this.person.LastName?.trim().length > 0 && 
             this.person.Email?.trim().length > 0;
    }
    return false;
  }

  async checkOrganization(value: string): Promise<void> {
    if (this.organization) {
      const organization = this.organization.trim();
      if (organization !== '') {
        // Simulate checking against a database
        const rv = new RunView();
        const result = await rv.RunView({
          EntityName: 'Organizations',
          ExtraFilter: `Name = '${organization}'`
        }, this.md.CurrentUser);

        if (result.Success && result.Results.length > 0) {
          this.person.OrganizationID = result.Results[0].ID;
          this.organizationExists = true;
          return;
        }
      }
    }
    // Reset when the input is empty
    this.organizationExists = false;
  }

  async checkOrganizationRole(value: string): Promise<void> {
    if (this.organizationRole) {
      const organizationRole = this.organizationRole.trim();
      if (organizationRole !== '') {
        // Simulate checking against a database
        const rv = new RunView();
        const result = await rv.RunView({
          EntityName: 'Organization Roles',
          ExtraFilter: `RoleName = '${organizationRole}'`
        }, this.md.CurrentUser);

        if (result.Success && result.Results.length > 0) {
          this.person.OrganizationRoleID = result.Results[0].ID;
          this.organizationRoleExists = true;
          return;
        }
      }
    }
    // Reset when the input is empty
    this.organizationRoleExists = false;
  }
}
