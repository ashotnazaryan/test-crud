import { createAction, props } from '@ngrx/store';
import { Post } from '../models/post';

export const getPosts = createAction('[Posts] Get posts', props<{ search?: string }>());
export const getPostsSuccess = createAction('[Post] Get Posts Success', props<{ posts: Post[] }>());
export const getPostsFailure = createAction('[Post] Get Posts Failure', props<{ error: any }>());

export const getPost = createAction('[Posts] Get post', props<{ id: string }>());
export const getPostSuccess = createAction('[Post] Get Post Success', props<{ post: Post }>());
export const getPostFailure = createAction('[Post] Get Post Failure', props<{ error: any }>());

export const createPost = createAction('[Posts] Create Post', props<{ post: Omit<Post, 'id'> }>());
export const createPostSuccess = createAction('[Post] Create Post Success', props<{ post: Post }>());
export const createPostFailure = createAction('[Post] Create Post Failure', props<{ error: any }>());

export const updatePost = createAction('[Posts] Update Post', props<{ post: Post }>());
export const updatePostSuccess = createAction('[Post] Update Post Success', props<{ post: Post }>());
export const updatePostFailure = createAction('[Post] Update Post Failure', props<{ error: any }>());

export const deletePost = createAction('[Posts] Delete Post', props<{ id: string }>());
export const deletePostSuccess = createAction('[Post] Delete Post Success', props<{ id: string }>());
export const deletePostFailure = createAction('[Post] Delete Post Failure', props<{ error: any }>());
