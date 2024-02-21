import { TestBed } from '@angular/core/testing';

import { LatLangService } from './lat-lang.service';

describe('LatLangService', () => {
  let service: LatLangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatLangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
