import { TestBed } from '@angular/core/testing';

import { FeatureRequestService } from './feature-request.service';

describe('FeatureRequestService', () => {
  let service: FeatureRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
