import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { StoryService } from '../story.service';
import { Story } from '../story.model';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as storyActions from './story.actions';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Injectable({
    providedIn: 'root'
})
export class StoryEffects {
    constructor(private storyService: StoryService,
                private actions$: Actions,
                private notifier: NotifierService,
                private router: Router) { }


    @Effect()
    createStory$: Observable<Action> = this.actions$.pipe(
        ofType(storyActions.StoryActionTypes.CreateStory),
        map((action: storyActions.CreateStory) => action.payload),
        mergeMap((story: Story) =>
          this.storyService.createStory(story).pipe(
            map(res=> {
                this.notifier.notify('success','Story Created');
                this.router.navigate(['user/stories']);
                return new storyActions.CreateStorySuccess(res);
            }),
            catchError(err => {
              this.notifier.notify('error',`${err}`);
                return of(new storyActions.CreateStoryFailure(err))
            })
          )
        )
      );

    @Effect()
    reviewStory$: Observable<Action> = this.actions$.pipe(
        ofType(storyActions.StoryActionTypes.ReviewStory),
        map((action: storyActions.ReviewStory) => (action.payload)),
        mergeMap((story: Story) =>
          this.storyService.reviewStory(story.reviewerId, story).pipe(
            map((story: Story) => {
              this.notifier.notify('success','Story Review successful');
              this.router.navigate(['user/stories']);
              return new storyActions.ReviewStorySuccess(story);
            }),
            catchError(err => {
              this.notifier.notify('error',`${err}`);
                return of(new storyActions.ReviewStoryFailure(err))
            })
          )
        )
      );


      @Effect()
      getStory$: Observable<Action> = this.actions$.pipe(
          ofType(storyActions.StoryActionTypes.GetStory),
          mergeMap((action: storyActions.GetStory) => this.storyService.getStory(action.payload['userId'], action.payload['storyId'])
          .pipe(
              map(story => new storyActions.GetStorySuccess(story)),
                catchError(err => {
                  this.notifier.notify('error',`${err}`);
                  return of(new storyActions.GetStoryFailure(err))
              })
          )
        )
      );

      @Effect()
      getStories$: Observable<Action> = this.actions$.pipe(
          ofType(storyActions.StoryActionTypes.GetStories),
          mergeMap((action: storyActions.GetStories) => this.storyService.getStories(action.payload)
          .pipe(
              map(stories => new storyActions.GetStoriesSuccess(stories)),
                catchError(err => {
                  this.notifier.notify('error',`${err}`);
                  return of(new storyActions.GetStoriesFailure(err))
              })
          )
        )
      );

    
}