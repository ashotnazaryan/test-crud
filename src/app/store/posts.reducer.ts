import { createReducer, on } from '@ngrx/store';
import {
  getPosts,
  getPostsSuccess,
  getPostsFailure,
  getPost,
  getPostSuccess,
  getPostFailure,
  deletePost,
  deletePostSuccess,
  deletePostFailure,
  createPost,
  createPostSuccess,
  createPostFailure,
  updatePost,
  updatePostSuccess,
  updatePostFailure
} from './posts.actions';
import { PostsState } from './posts.state';

export const initialState: PostsState = {
  posts: [],
  post: null,
  loading: false,
  error: null
};

export const postsReducer = createReducer(
  initialState,
  on(getPosts, (state) => ({ ...state, loading: true })),
  on(getPostsSuccess, (state, { posts }) => ({ ...state, posts, loading: false, error: null })),
  on(getPostsFailure, (state, { error }) => ({ ...state, posts: [], loading: false, error })),

  on(getPost, (state) => ({ ...state, loading: true })),
  on(getPostSuccess, (state, { post }) => ({ ...state, post, loading: false, error: null })),
  on(getPostFailure, (state, { error }) => ({ ...state, post: null, loading: false, error })),

  on(createPost, (state) => ({ ...state, loading: true })),
  on(createPostSuccess, (state, { post }) => ({
    ...state,
    posts: [post, ...state.posts],
    loading: false,
    error: null
  })),
  on(createPostFailure, (state, { error }) => ({ ...state, posts: state.posts, loading: false, error })),

  on(updatePost, (state) => ({ ...state, loading: true })),
  on(updatePostSuccess, (state, { post }) => ({
    ...state,
    posts: [...state.posts.map((item) => {
      return post.id === item.id ? { ...post } : { ...item }
    })],
    loading: false,
    error: null
  })),
  on(updatePostFailure, (state, { error }) => ({ ...state, posts: state.posts, loading: false, error })),

  on(deletePost, (state) => ({ ...state, loading: true })),
  on(deletePostSuccess, (state, { id }) => ({
    ...state,
    posts: [...state.posts.filter((post) => post.id !== id)],
    loading: false,
    error: null
  })),
  on(deletePostFailure, (state, { error }) => ({ ...state, loading: false, error })),
);
