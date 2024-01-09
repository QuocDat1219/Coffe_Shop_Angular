import { TestBed } from '@angular/core/testing';

import { DashboardService } from './dashboard.service';
import { HttpClientModule } from '@angular/common/http';

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Thêm HttpClientModule vào imports
      providers: [DashboardService],
    });
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
