import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBlogCategoryComponent } from './manage-blog-category.component';

describe('ManageBlogCategoryComponent', () => {
  let component: ManageBlogCategoryComponent;
  let fixture: ComponentFixture<ManageBlogCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBlogCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBlogCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
