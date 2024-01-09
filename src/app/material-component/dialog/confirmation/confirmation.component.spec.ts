import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'; // Import MatDialogData và MatDialogModule
import { ConfirmationComponent } from './confirmation.component';

describe('ConfirmationComponent', () => {
  let component: ConfirmationComponent;
  let fixture: ComponentFixture<ConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationComponent ],
      imports: [MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }, // Cung cấp giá trị giả định cho MatDialogData
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
