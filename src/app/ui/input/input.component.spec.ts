import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputComponent, typesInput } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [CommonModule, FormsModule],
    });

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit value on valueChange', () => {
    spyOn(component.valueChange, 'emit');
    const testValue = 'TestValue';
    component.value = testValue;
    component.emitValue();

    expect(component.valueChange.emit).toHaveBeenCalledWith(testValue);
  });

  // Cleanup after each test
  afterEach(() => {
    fixture.destroy();
  });
});
