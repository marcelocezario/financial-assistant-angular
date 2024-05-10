import { TestBed } from '@angular/core/testing';

import { TranslatePageTitleService } from './translate-page-title.service';

describe('TranslatePageTitleService', () => {
  let service: TranslatePageTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslatePageTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
