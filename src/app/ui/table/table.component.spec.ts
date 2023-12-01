import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import {TranslateService} from "../../core/services/translate.service";
import {TableComponent} from "./table.component";



describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule],
      providers: [
        { provide: TranslateService, useValue: translateServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render rows correctly', () => {
    component.headers = ['header1', 'header2']
    component.rows = [
      { Name: 'mock1', Age: 25 },
      { Name: 'mock2', Age: 30 },
    ];
    fixture.detectChanges();
    const rowElements = fixture.nativeElement.querySelectorAll('td');
    expect(rowElements[1].textContent).toContain('mock1');
    expect(rowElements[2].textContent).toContain('30');
  });
  afterEach(() => {
    fixture?.destroy();
  });
});
