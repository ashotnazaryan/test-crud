import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditPostComponent } from './create-edit-post.component';

describe('CreateEditPostComponent', () => {
  let component: CreateEditPostComponent;
  let fixture: ComponentFixture<CreateEditPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditPostComponent]
    });
    fixture = TestBed.createComponent(CreateEditPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
