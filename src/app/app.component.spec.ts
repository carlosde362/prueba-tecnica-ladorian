import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {TranslateService} from "@ngx-translate/core";

describe('AppComponent', () => {
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;
  beforeEach(async () => {
    translateServiceSpy = jasmine.createSpyObj(TranslateService,  ['setDefaultLang', 'getBrowserLang', 'use']);
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: TranslateService, useValue: translateServiceSpy }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
