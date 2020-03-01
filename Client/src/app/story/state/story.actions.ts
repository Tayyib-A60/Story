import { Story } from '../story.model';

/* NgRx */
import { Action } from '@ngrx/store';

export enum StoryActionTypes {
  CreateStory = '[Story] Create Story',
  CreateStorySuccess = '[Story] Create Story Success',
  CreateStoryFailure = '[Story] Create Story Failure',
  ReviewStory = '[Story] Review Story',
  ReviewStorySuccess = '[Story] Review Story Success',
  ReviewStoryFailure = '[Story] Review Story Failure',
  GetStory = '[Story] Get Story',
  GetStorySuccess = '[Story] Get Story Success',
  GetStoryFailure = '[Story] Get Story Failure',
  GetStories = '[Story] Get Stories',
  GetStoriesSuccess = '[Story] Get Stories Success',
  GetStoriesFailure = '[Story] Get Stories Failure',
}

// Action Creators

export class CreateStory implements Action {
  readonly type = StoryActionTypes.CreateStory;

  constructor(public payload: Story) {
      this.type = StoryActionTypes.CreateStory;
  }
}

export class CreateStorySuccess implements Action {
  readonly type = StoryActionTypes.CreateStorySuccess;

  constructor(public payload: any) {
      this.type = StoryActionTypes.CreateStorySuccess
  }
}

export class CreateStoryFailure implements Action {
  readonly type = StoryActionTypes.CreateStoryFailure;

  constructor(public payload: string) {
      this.type = StoryActionTypes.CreateStoryFailure
  }
}

export class ReviewStory implements Action {
  readonly type = StoryActionTypes.ReviewStory;

  constructor(public payload: Story) {
      this.type = StoryActionTypes.ReviewStory
  }
}

export class ReviewStorySuccess implements Action {
  readonly type = StoryActionTypes.ReviewStorySuccess;

  constructor(public payload: Story) {
      this.type = StoryActionTypes.ReviewStorySuccess
  }
}

export class ReviewStoryFailure implements Action {
  readonly type = StoryActionTypes.ReviewStoryFailure;

  constructor(public payload: any) {
      this.type = StoryActionTypes.ReviewStoryFailure
  }
}

export class GetStory implements Action {
  readonly type = StoryActionTypes.GetStory;

  constructor(public payload: any) {
      this.type = StoryActionTypes.GetStory
  }
}

export class GetStorySuccess implements Action {
  readonly type = StoryActionTypes.GetStorySuccess;

  constructor(public payload: any) {
      this.type = StoryActionTypes.GetStorySuccess
  }
}

export class GetStoryFailure implements Action {
  readonly type = StoryActionTypes.GetStoryFailure;

  constructor(public payload: any) {
      this.type = StoryActionTypes.GetStoryFailure
  }
}

export class GetStories implements Action {
  readonly type = StoryActionTypes.GetStories;

  constructor(public payload: number) {
      this.type = StoryActionTypes.GetStories
  }
}

export class GetStoriesSuccess implements Action {
  readonly type = StoryActionTypes.GetStoriesSuccess;

  constructor(public payload: any) {
      this.type = StoryActionTypes.GetStoriesSuccess
  }
}

export class GetStoriesFailure implements Action {
  readonly type = StoryActionTypes.GetStoriesFailure;

  constructor(public payload: any) {
      this.type = StoryActionTypes.GetStoriesFailure
  }
}

export type StoryActions = CreateStory
    | CreateStorySuccess
    | CreateStoryFailure
    | ReviewStory
    | ReviewStorySuccess
    | ReviewStoryFailure
    | GetStory
    | GetStorySuccess
    | GetStoryFailure
    | GetStories
    | GetStoriesSuccess
    | GetStoriesFailure;