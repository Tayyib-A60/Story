import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as storyReducer from '../../state/story.reducer';
import * as storyActions from '../../state/story.actions';
import * as userActions from '../../../user/state/user.actions';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromUser from '../../../user/state/index';
import { takeWhile } from 'rxjs/operators';
import { Story } from '../../story.model';

@Component({
  selector: 'app-create-story',
  templateUrl: './create-story.component.html',
  styleUrls: ['./create-story.component.scss']
})
export class CreateStoryComponent implements OnInit {
  storyForm: FormGroup;
  currentUser: any;
  currentUser$: Observable<any>;
  componentActive = true;
  adminUsers: any[];
  id: number;
  editMode: boolean;
  story: Story;

  constructor(private store: Store<storyReducer.StoryState>) { }

  ngOnInit() {
    this.currentUser = sessionStorage.getItem('currentUser') ? 
    JSON.parse(sessionStorage.getItem('currentUser')) : null;
    this.store.dispatch(new userActions.GetAdminUsers(this.currentUser['id']));
    
    this.store.pipe(select(fromUser.getAdminusers),
    takeWhile(() => this.componentActive))
    .subscribe(adminUsers => {
      this.adminUsers = adminUsers;
    });
    this.initializeForm();
    
  }

  private initializeForm() {
    let summary = '';
    let description = '';
    let type = '';
    let taskComplexity = '';
    let estimatedTime = null;
    let cost = null;
    let reviewerId = '';

    this.storyForm = new FormGroup({
      userId: new FormControl(this.currentUser.id, Validators.required),
      summary: new FormControl(summary, Validators.required),
      description: new FormControl(description, Validators.required),
      type: new FormControl(type, Validators.required),
      reviewerId: new FormControl(reviewerId, Validators.required),
      taskComplexity: new FormControl(taskComplexity, Validators.required),
      estimatedTime: new FormControl(estimatedTime, [ Validators.required, Validators.min(1)]),
      cost: new FormControl(cost, [Validators.required, Validators.min(0)])
    });
  }

  createStory() {
      this.storyForm.get('reviewerId').patchValue(Number(this.storyForm.get('reviewerId').value));
      this.store.dispatch(new storyActions.CreateStory(this.storyForm.value));
      this.storyForm.reset();
  }

}
