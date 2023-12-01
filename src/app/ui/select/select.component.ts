import {Component, EventEmitter, forwardRef, Input, Output, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {CardComponent} from "../card/card.component";
import {TranslateService} from "../../core/services/translate.service";

interface AvailableOptions {
  isChecked?: boolean;
  value: unknown;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
})
export class SelectComponent implements OnInit {
  @Input() placeholder!: string;
  @Input() label!: string;
  @Input() displayProperty!: string;
  @Input() stringTranslate!: string;
  @Input()
  set options(value: unknown[]) {
    this._options = value;
    (value as []).forEach((value: unknown) => this._availableOptions.push({
      isChecked: false,
      value: value
    }))
  }
  @Input() multiple: boolean = false;
  @Output() selectionChange = new EventEmitter<unknown | unknown[]>();
  showOptions: boolean = false;

  private _options: unknown[] = [];
  private _availableOptions: AvailableOptions[] = [];
  private selectedOptions: unknown | unknown[];
  get options() {
    return this._options;
  }

  get availableOptions() {
    return this._availableOptions;
  }

  constructor(private translateService: TranslateService) {
  }

  ngOnInit(): void {
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
    this.showOptions = !this.showOptions;
  }

  change(value: AvailableOptions): void {
    if(!this.multiple) {
      this.toogleShowOptions();
    }
    if(this.multiple) {
      this.selectedOptions ? (this.selectedOptions as unknown[]).push(value.value) : this.selectedOptions = [value.value as unknown]
    } else {
      this.selectedOptions = value.value;
    }
    this.selectionChange.emit(this.selectedOptions);
  }

}
