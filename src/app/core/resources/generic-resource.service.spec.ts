import { TestBed } from '@angular/core/testing';

import { GenericResourceService } from './generic-resource.service';

describe('GenericResourceService', () => {
  let service: GenericResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
