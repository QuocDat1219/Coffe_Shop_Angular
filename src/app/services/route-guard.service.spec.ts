import { TestBed } from '@angular/core/testing';

import { RouteGuardService } from './route-guard.service';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('RouteGuardService', () => {
  let service: RouteGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterModule.forRoot([]),MatSnackBarModule]
    });
    service = TestBed.inject(RouteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
