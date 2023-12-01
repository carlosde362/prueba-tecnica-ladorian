import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginatorComponent, SlicePaginator} from "../paginator/paginator.component";
import {TranslateService} from "../../core/services/translate.service";

interface DataTable {
  [key: string]: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, PaginatorComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() headers: string[] = [];
  @Input() rows: unknown[] = [];
  @Input() stringTranslate!: string;

  constructor(private translateService: TranslateService) {
  }

  getData(value: any, key: string) {
    return value[key];
  }

  getTranslate(value: string): string {
    return this.translateService.instant(`${this.stringTranslate}.${value}`);
  }
}
