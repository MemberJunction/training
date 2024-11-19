import { Component, OnInit } from '@angular/core';
import { Metadata } from '@memberjunction/core';
import { SubmissionEntity } from 'mj_generatedentities';
import { SharedService } from '../shared-service';


@Component({
  selector: 'app-new-submission',
  templateUrl: './new-submission.component.html',
  styleUrls: ['./new-submission.component.css']
})
export class NewSubmission implements OnInit {
  public submission: SubmissionEntity;

  constructor (private sharedService: SharedService) {

  }
  async ngOnInit() {
    this.sharedService.setupComplete$.subscribe(async (complete: boolean) => {
      if (complete) {
        const md = new Metadata();
        this.submission = await md.GetEntityObject<SubmissionEntity>('Submissions');    
      }
    });
  }

  public async onSave() {
    if (!await this.submission.Save()) {
      alert (this.submission.LatestResult.Message);
    }
  }
}
