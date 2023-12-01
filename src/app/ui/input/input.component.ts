import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";


export type typesInput = 'text' | 'number' | 'search' | 'url'
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [{provide: NG_VALUE_ACCESSOR, multi: true, useExisting:  forwardRef(() => InputComponent)}],
})
export class InputComponent {
  @Input() type: typesInput = 'text'
  @Input() placeholder!: string;
  @Input() label!: string;
  @Input() isDisabled: boolean = false;
  @Input() regex!: RegExp;
  @Input() required: boolean = false;
  @Input() autocomplete:boolean = false;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  onChange: any = () => {};
  onTouched: any = () => {};
  private _value!: string;

  set value(value: string) {
    this._value = value;
    this.onChange(value);
  }

  get value() {
    return this._value;
  }

  emitValue(): void {
    this.valueChange.emit(this.value);
  }
  writeValue(value: any): void {
    this.value = value;
    this.onChange(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
