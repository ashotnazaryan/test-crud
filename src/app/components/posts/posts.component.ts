import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs';
import { Post } from '../../models/post';
import { selectLoading, selectPosts } from '../../store/posts.selectors';
import { deletePost, getPosts } from '../../store/posts.actions';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  searchForm!: FormGroup;
  posts$ = this.store.select(selectPosts);
  loading$ = this.store.select(selectLoading);

  constructor(private store: Store<{ posts: Post[] }>, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(getPosts({}));

    this.searchForm = this.formBuilder.group({
      searchField: ['']
    });

    this.onSearchChange();
  }

  createEditPost(post?: Post): void {
    post ? this.router.navigate(['/edit', post.id]) : this.router.navigate(['/create']);
  }

  deletePost(post: Post): void {
    this.store.dispatch(deletePost({ id: post.id }));
    this.searchForm.reset();
  }

  private onSearchChange(): void {
    this.searchForm
      .get('searchField')?.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        distinctUntilChanged(),
        debounceTime(500),
        map((search?: string) => search?.toLowerCase())
      )
      .subscribe((search) => {
        this.store.dispatch(getPosts({ search }));
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
