import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule và ReactiveFormsModule
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [FormsModule, ReactiveFormsModule,RouterModule.forRoot([]),HttpClientModule,MatDialogModule,MatSnackBarModule],
      providers:[{
        provide: MatDialogRef, useValue: {}
      }], // Thêm FormsModule và ReactiveFormsModule vào imports
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
