import { Component, OnInit } from '@angular/core';
import { Metadata, RunView } from '@memberjunction/core';
import { SharedService } from '../shared-service';
import { ReviewEntity, SubmissionEntity } from 'mj_generatedentities';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.css']
})
export class ReviewsList implements OnInit {

  public Reviews: ReviewEntity[] | null = null;
  public reviewsLoaded: boolean = false;
  
  constructor (private sharedService: SharedService, private router: Router) {

  }

  async ngOnInit() {
    this.sharedService.setupComplete$.subscribe(async (complete: boolean) => {
      if (complete) {
        const rv = new RunView();
        const rvResult = await rv.RunView<ReviewEntity>(
          {
            EntityName: 'Reviews'
          }
        );

        if(!rvResult.Success){
          this.sharedService.DisplayNotification('Error fetching reviews', 'error');
          return;
        }

        this.Reviews = rvResult.Results;
        this.reviewsLoaded = true;
      }
    });
  }

}
