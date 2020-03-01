import { Component, OnInit } from '@angular/core';
import { Story } from '../../story.model';

import * as fromStory from '../../state/index';
import * as storyActions from '../../state/story.actions';
import * as storyReducer from '../../state/story.reducer';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { AdminGuardService } from '../../../services/admin-guard.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-stories-list',
  templateUrl: './stories-list.component.html',
  styleUrls: ['./stories-list.component.scss']
})
export class StoriesListComponent implements OnInit {
  stories: Story[] = [];
  currentUser: any;
  componentActive = true;
  storyForm: FormGroup;
  adminComment: string = '';
  
  constructor(private store: Store<storyReducer.StoryState>,
              private adminAuthGuard: AdminGuardService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.initializeForm();
    this.store.dispatch(new storyActions.GetStories(this.currentUser.id));

    this.store.pipe(select(fromStory.getStories),
    takeWhile(() => this.componentActive))
    .subscribe(stories => {
      this.stories = stories;
    });
  }

  private initializeForm() {
    const summary = '';
    const description = '';
    const type = '';
    const taskComplexity = '';
    const estimatedTime = '';
    const cost = '';
    const reviewerId = '';

    this.storyForm = new FormGroup({
      userId: new FormControl(this.currentUser? this.currentUser.id : null),
      summary: new FormControl(summary, Validators.required),
      description: new FormControl(description, Validators.required),
      type: new FormControl(type, Validators.required),
      taskComplexity: new FormControl(taskComplexity, Validators.required),
      estimatedTime: new FormControl(estimatedTime, Validators.required),
      cost: new FormControl(cost, Validators.required),
      reviewerId: new FormControl(reviewerId, Validators.required),
      approved: new FormControl(false)
    });
  }
  
  isAdmin() {
    return this.adminAuthGuard.isAdmin();
  }

  accept(story: Story) {
    const storyToReview = {
      ...story,
      approved: true,
      adminComment: this.adminComment
    };
    this.store.dispatch(new storyActions.ReviewStory(storyToReview));
    this.adminComment = '';
  }
  
  reject(story: Story) {
    const storyToReview = {
      ...story,
      approved: false,
      adminComment: this.adminComment
    };
    this.store.dispatch(new storyActions.ReviewStory(storyToReview));
    this.adminComment = '';
  }
}
