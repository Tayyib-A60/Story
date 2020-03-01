import { Story } from '../story.model';
import { StoryActionTypes, StoryActions } from './story.actions';

export interface StoryState {
  stories: Story[];
  story: Story;
  error: string;
  response: any;
}

const initialState: StoryState = {
  stories: [],
  story: null,
  error: '',
  response: null
};

export function reducer(state = initialState, action: StoryActions): StoryState {

  switch (action.type) {
    case StoryActionTypes.CreateStorySuccess:
      return {
        ...state,
        response: action.payload,
        error: ''
      };
    case StoryActionTypes.CreateStoryFailure:
      return {
        ...state,
        response: null,
        error: action.payload
      };
    case StoryActionTypes.ReviewStorySuccess:
      const updatedStories = state.stories.map(
        story => story.storyId === action.payload.storyId ? action.payload : story
      );
      return {
        ...state,
        stories: updatedStories,
        error: ''
      };
    case StoryActionTypes.ReviewStoryFailure:
      return {
        ...state,
        error: action.payload
      };
    case StoryActionTypes.GetStoriesSuccess:
      return {
        ...state,
        stories: action.payload,
        error: ''
      };
    case StoryActionTypes.GetStoriesFailure:
      return {
        ...state,
        stories: [],
        error: action.payload
      };
    case StoryActionTypes.GetStorySuccess:
      return {
        ...state,
        story: action.payload,
        error: ''
      };
    case StoryActionTypes.GetStoriesFailure:
      return {
        ...state,
        story: null,
        error: action.payload
      };
    
    default: 
      return { ...state }
  }
}    