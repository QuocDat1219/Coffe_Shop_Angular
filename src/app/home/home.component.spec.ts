import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [MatDialogModule,HttpClientModule,RouterModule.forRoot([])], // Thêm MatDialogModule vào imports
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
