import {Component, EventEmitter, Input, Output, forwardRef} from '@angular/core';
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {CardComponent} from "../card/card.component";
import {TranslateService} from "../../core/services/translate.service";
import {OptionComponent} from './option/option.component';

interface AvailableOptions<T = any> {
  isChecked: boolean;
  value: T
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, OptionComponent],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
  providers: [{provide: NG_VALUE_ACCESSOR, multi: true, useExisting:  forwardRef(() => SelectComponent)}],
})
export class SelectComponent {
  private static readonly CHARACTER_CONCAT_LABEL = ', ';
  @Input() placeholder!: string;
  @Input() label!: string;
  @Input() displayProperty!: string;
  @Input() stringTranslate!: string;
  @Input() disabled: boolean = false;
  @Input()
  set options(value: unknown[]) {
    this._options = value;
    (value as []).forEach((value: unknown) => this._availableOptions.push({
      isChecked: false,
      value: value
    }))
  }
  @Input() multiple: boolean = false;
  @Output() selectionChange = new EventEmitter<void>();
  concatOptionSelectedLabel!: string;
  showOptions: boolean = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  private _options: unknown[] = [];
  private _availableOptions: AvailableOptions[] = [];
  get options() {
    return this._options;
  }

  get availableOptions() {
    return this._availableOptions;
  }

  get optionSelected() {
    return this.availableOptions.filter((option) => option.isChecked);
  }

  constructor(private translateService: TranslateService) {
  }

  writeValue(value: any): void {
    this.onChange(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  getProperty(option: any): string {
    const display: string = (option[this.displayProperty]) as string;
    return this.getTranslate(display);
  }

  getTranslate(value: string | unknown): string {
    if(!this.stringTranslate) {
      return value as string;
    }
    return this.translateService.instant(`${this.stringTranslate}.${value}`);
  }

  toogleShowOptions(): void {
    if (this.disabled) {
      return;
    }
    this.showOptions = !this.showOptions;
  }

  changeMultipleOptions(): void {
    const options = this.availableOptions.filter((option) => option.isChecked);
    this.onChange(options.map((option) => option.value));
    this.selectionChange.emit();
    this.generateLabel();
  }

  changeOption(option: AvailableOptions): void {
      option.isChecked = true;
      this.onChange(option.value);
      this.selectionChange.emit();
      this.generateLabel();
  }

  generateLabel(): void {
    this.concatOptionSelectedLabel = this.optionSelected.map((option: AvailableOptions) => {
      return this.displayProperty ? this.getProperty(option.value) : this.getTranslate(option.value)
    }).join(SelectComponent.CHARACTER_CONCAT_LABEL);

  }
}
