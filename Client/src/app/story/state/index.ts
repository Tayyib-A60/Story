import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromStory from './story.reducer';


// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends fromRoot.AppState {
    story: fromStory.StoryState;
}

// Selector functions
const getStoryFeatureState = createFeatureSelector<fromStory.StoryState>('story');

export const getStories = createSelector(
    getStoryFeatureState,
    state => state.stories
);

export const getStory = createSelector(
    getStoryFeatureState,
    state => state.story
);

// export const getCurrentProduct = createSelector(
//     getStoryFeatureState,
//     getCurrentProductId,
//     (state, currentProductId) => {
//         if (currentProductId === 0) {
//             return {
//                 id: 0,
//                 productName: '',
//                 productCode: 'New',
//                 description: '',
//                 starRating: 0
//             };
//         } else {
//             return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
//         }
//     }
// );
