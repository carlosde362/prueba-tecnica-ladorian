import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './option.component.html',
  styleUrl: './option.component.css'
})
export class OptionComponent<T = any> {
  @Input() multiple!: boolean;
  @Input() value!: T;
  @Input() showValueDisplay!: string;
  @Input()
  set checked(value: boolean) {
    this._valueIsChecked = value;
  }
  @Output() selectionChange = new EventEmitter<boolean>()

  get checked() {
    return this._valueIsChecked
  }
  private _valueIsChecked!: boolean;


  toggleValue(): void {
    this.selectionChange.emit(this.checked);
  }

  selectOneOption(): void {
    this.selectionChange.emit(true);
  }

}
