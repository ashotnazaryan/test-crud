import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { getPosts, getPostsSuccess, getPostsFailure, getPost, getPostSuccess, getPostFailure, deletePostSuccess, deletePostFailure, deletePost, createPost, createPostSuccess, createPostFailure, updatePost, updatePostSuccess, updatePostFailure } from './posts.actions';
import { GraphqlService } from '../services/grapghql.service';

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private graphqlService: GraphqlService) { }

  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPosts),
      switchMap((params) => this.graphqlService.getPosts(params.search)
        .pipe(
          map((posts) => getPostsSuccess({ posts })),
          catchError((error) => of(getPostsFailure({ error })))
        )
      )
    )
  );

  getPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPost),
      switchMap((params) => this.graphqlService.getPostById(params.id)
        .pipe(
          map((post) => getPostSuccess({ post })),
          catchError((error) => of(getPostFailure({ error })))
        )
      )
    )
  );

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPost),
      switchMap((params) => this.graphqlService.createPost(params.post.title, params.post.body)
        .pipe(
          map((response) => createPostSuccess({ post: response.data?.createPost })),
          catchError((error) => of(createPostFailure({ error })))
        )
      )
    )
  );

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePost),
      switchMap((params) => this.graphqlService.updatePost(params.post.id, params.post.title, params.post.body)
        .pipe(
          map((response) => updatePostSuccess({ post: response.data?.updatePost })),
          catchError((error) => of(updatePostFailure({ error })))
        )
      )
    )
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePost),
      switchMap((params) => this.graphqlService.deletePost(params.id)
        .pipe(
          map(() => deletePostSuccess(params)),
          catchError((error) => of(deletePostFailure({ error })))
        )
      )
    )
  );
}
