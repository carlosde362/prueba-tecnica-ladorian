import {Component, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardComponent} from "../card/card.component";


export interface SlicePaginator {
  start: number;
  end: number;
}
@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  private _totalItems!: number;
  @Input() itemsPerPage: number = 10;
  @Input()
  set totalItems(value: number) {
    this._totalItems = value;
    this.calculatePages();
  }
  @Output() sliceItems = new EventEmitter<SlicePaginator>();
  numbersOfPages!: number;
  currentPage: number = 1;

  get pages(): number[] {
    return Array.from({ length: this.numbersOfPages }, (_, i) => i + 1);
  }

  get start(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get end(): number {
    return this.currentPage * this.itemsPerPage;
  }

  get isLastPage(): boolean {
    return this.currentPage === this.pages[this.pages.length -1];
  }

  get isFirstPage(): boolean {
    return this.currentPage === 1
  }
  private calculatePages(): void {
    this.numbersOfPages = Math.ceil(this._totalItems / this.itemsPerPage);
    this.currentPage = 1;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.emitChangePaginator();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.numbersOfPages) {
      this.currentPage++;
      this.emitChangePaginator();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.numbersOfPages) {
      this.currentPage = page;
      this.emitChangePaginator();
    }
  }

  emitChangePaginator() {
    this.sliceItems.emit({start: this.start, end: this.end});
  }
}
