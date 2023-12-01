import { TestBed } from '@angular/core/testing';

import {GenericResourceService, HttpMethod} from './generic-resource.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('GenericResourceService', () => {
  let service: GenericResourceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GenericResourceService],
    });
    service = TestBed.inject(GenericResourceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should handle error in request', () => {
    const url = 'https://mock.com/api/data';
    const method: HttpMethod = 'GET';

    service.serverRequest(method, url).subscribe({
      next: () => fail(),
      error: (error) => {
        expect(error).toContain('Error');
      }}
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
