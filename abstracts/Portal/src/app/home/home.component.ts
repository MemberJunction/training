import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared-service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { SubmissionTypeEntity } from 'mj_generatedentities';
import { Metadata, RunView } from '@memberjunction/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public title: string = environment.APP_TITLE
  public submissionTypes: SubmissionTypeEntity[] = [];

  constructor(public sharedService: SharedService, public router: Router) {

  }

  async ngOnInit()  {
    console.log('HomeComponent.ngOnInit');
    if (this.sharedService.AccessDenied)
      this.router.navigate(['/no-access']);
    else {
      this.sharedService.setupComplete$.subscribe(async (complete: boolean) => {
        if (complete) {
          const md = new Metadata();
          console.log(md.Entities)
          const rv = new RunView();
          const result = await rv.RunView<SubmissionTypeEntity>({
            EntityName: 'Submission Types',
            OrderBy: 'Name',
          })      
          this.submissionTypes = result.Results;  
        }
      });
    }
  }
}
