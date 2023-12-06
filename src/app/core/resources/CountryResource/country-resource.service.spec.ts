import { TestBed } from '@angular/core/testing';

import { CountryResourceService } from './country-resource.service';

describe('CountryResourceService', () => {
  let service: CountryResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
