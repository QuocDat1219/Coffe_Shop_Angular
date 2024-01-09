import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { TokenInterceptorInterceptor } from './token-interceptor.interceptor';

describe('TokenInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterModule.forRoot([])], // Thêm RouterModule.forRoot([]) vào imports
    providers: [
      TokenInterceptorInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: TokenInterceptorInterceptor = TestBed.inject(TokenInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
