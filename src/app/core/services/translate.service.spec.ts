import { TestBed } from '@angular/core/testing';

import { TranslateService } from './translate.service';
import { TranslateService as ngTranslate } from '@ngx-translate/core';

describe('TranslateService', () => {
  let service: TranslateService;
  let ngTranslateSpy: jasmine.SpyObj<ngTranslate>;

  beforeEach(() => {
    ngTranslateSpy = jasmine.createSpyObj(ngTranslate, ['setDefaultLang', 'getBrowserLang', 'use'])
    TestBed.configureTestingModule({
      providers: [
        TranslateService,
        { provide: ngTranslate, useValue: ngTranslateSpy }
      ]
    });
    service = TestBed.inject(TranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
