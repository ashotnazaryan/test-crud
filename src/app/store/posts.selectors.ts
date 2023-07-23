import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.state';

export const selectPostsState = createFeatureSelector<PostsState>('posts');
export const selectPosts = createSelector(selectPostsState, (state) => state.posts);
export const selectPost = createSelector(selectPostsState, (state) => state.post);
export const selectLoading = createSelector(selectPostsState, (state) => state.loading);
