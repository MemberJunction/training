import { Component, OnInit } from '@angular/core';
import { Metadata } from '@memberjunction/core';
import { SubmissionEntity } from 'mj_generatedentities';
import { SharedService } from '../shared-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-submission',
  templateUrl: './new-submission.component.html',
  styleUrls: ['./new-submission.component.css']
})
export class NewSubmission implements OnInit {
  public submission: SubmissionEntity;

  constructor (private sharedService: SharedService, private router: Router) {

  }

  async ngOnInit() {
    this.sharedService.setupComplete$.subscribe(async (complete: boolean) => {
      if (complete) {
        const md = new Metadata();
        this.submission = await md.GetEntityObject<SubmissionEntity>('Submissions');    
        this.submission.SubmissionTypeID =  "5DA65B3A-EC1B-40C9-B727-718541CC2DFE";
        this.submission.Status = "Pending";
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

  goToNext(): void {
    if (this.currentStep < this.steps.length - 1) {
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
}
