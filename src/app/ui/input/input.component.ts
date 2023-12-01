import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";


export type typesInput = 'text' | 'number' | 'search' | 'url'
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
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
  value!: string;

  emitValue(): void {
    this.valueChange.emit(this.value);
  }
}
