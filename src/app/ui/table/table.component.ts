import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DataTable {
  [key: string]: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent<T> {
  @Input() headers: string[] = [];
  @Input() rows: any[] = [];

  getData(value: any, key: string) {
    return value[key];
  }
}
