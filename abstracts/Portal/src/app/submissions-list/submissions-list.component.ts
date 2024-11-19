import { Component, OnInit } from '@angular/core';
import { Metadata, RunView } from '@memberjunction/core';
import { SharedService } from '../shared-service';
import { SubmissionEntity } from 'mj_generatedentities';
import { Router } from '@angular/router';


@Component({
  selector: 'app-submissions-list',
  templateUrl: './submissions-list.component.html',
  styleUrls: ['./submissions-list.component.css']
})
export class SubmissionsList implements OnInit {

  public submissions: SubmissionEntity[];
  
  constructor (private sharedService: SharedService, private router: Router) {

  }

  async ngOnInit() {
    this.sharedService.setupComplete$.subscribe(async (complete: boolean) => {
      if (complete) {
        const rv = new RunView();
        const result = await rv.RunView<SubmissionEntity>(
          {
            EntityName: 'Submissions'
          }
        );
        this.submissions = result.Results;
      }
    });
  }

}
