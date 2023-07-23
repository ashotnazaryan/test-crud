import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, filter, takeUntil } from 'rxjs';
import { Post } from '../../models/post';
import { createPost, getPost, updatePost } from '../../store/posts.actions';
import { selectPost } from '../../store/posts.selectors';

@Component({
  selector: 'app-create-edit-post',
  templateUrl: './create-edit-post.component.html',
  styleUrls: ['./create-edit-post.component.scss']
})
export class CreateEditPostComponent {
  private unsubscribe$ = new Subject();
  id!: string;
  postForm!: FormGroup;
  formData?: Partial<Post>;
  mode: 'create' | 'edit' = 'create';
  post$ = this.store.select(selectPost);

  constructor(private store: Store<{ posts: Post[] }>, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) { }

  get isCreateMode(): boolean {
    return this.mode === 'create';
  }

  get isEditMode(): boolean {
    return this.mode === 'edit';
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        filter((params) => params['id'])
      )
      .subscribe((params) => {
        this.id = params['id'];
        this.mode = 'edit';
        this.store.dispatch(getPost({ id: this.id }));
      });

    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });

    this.post$
      .pipe(
        filter((post) => !!post && this.isEditMode),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((post) => {
        this.setFormValues(post!);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
    this.postForm.reset();
  }

  save(event?: Event): void {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    event?.preventDefault();
    this.id
      ? this.store.dispatch(updatePost({ post: { ...this.postForm.value, id: this.id } }))
      : this.store.dispatch(createPost({ post: this.postForm.value }));
    this.router.navigate(['/posts'])
  }

  private setFormValues(post: Post): void {
    this.postForm.patchValue(post);
  }
}
