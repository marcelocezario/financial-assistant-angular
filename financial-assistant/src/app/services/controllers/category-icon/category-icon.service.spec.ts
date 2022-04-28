import { TestBed } from '@angular/core/testing';

import { CategoryIconService } from './category-icon.service';

describe('CategoryIconService', () => {
  let service: CategoryIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
