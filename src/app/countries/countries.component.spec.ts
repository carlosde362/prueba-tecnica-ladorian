import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesComponent } from './countries.component';
import {GenericResourceService} from "../core/resources/generic-resource.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {of} from "rxjs";

describe('CountriesComponent', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;
  let genericResourceServiceSpy: jasmine.SpyObj<GenericResourceService>;

  beforeEach(async () => {
    genericResourceServiceSpy = jasmine.createSpyObj(GenericResourceService, ['serverRequest']);
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {provide: GenericResourceService, useValue: genericResourceServiceSpy}
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;
    genericResourceServiceSpy.serverRequest.and.returnValue(of([]))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
