import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Continent, CountryInfo} from "../core/models/CountryInfo";
import {GenericResourceService} from "../core/resources/generic-resource.service";
import {first} from "rxjs";
import {TableComponent} from "../ui/table/table.component";
import {CardComponent} from "../ui/card/card.component";
import {InputComponent} from "../ui/input/input.component";
import {SelectComponent} from "../ui/select/select.component";
import {PaginatorComponent, SlicePaginator} from "../ui/paginator/paginator.component";
import {TranslateModule} from "@ngx-translate/core";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SpinnerComponent} from "../ui/spinner/spinner.component";

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, TableComponent, CardComponent, InputComponent, SelectComponent, PaginatorComponent, TranslateModule, ReactiveFormsModule, SpinnerComponent, FormsModule],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css'
})
export class CountriesComponent implements OnInit {
  private static readonly EMPTY_STRING = '';
  private availableCountries!: CountryInfo[];
  availableContinent: string[] = Object.values(Continent);
  private _filterCountries!: CountryInfo[];
  paginatedCountries!: CountryInfo[];
  readonly headers = ['country', 'continent'];
  readonly ITEMS_PER_PAGE = 10;
  private currentPaginator: SlicePaginator = {
    start: 0,
    end: this.ITEMS_PER_PAGE
  }

  form = this.fb.group({
    country: new FormControl<string | null>(null),
    continent: new FormControl<Continent[]>([])
  });
  get filterCountries() {
    return this._filterCountries;
  }

  set filterCountries(value: CountryInfo[]) {
    this._filterCountries = value;
  }

  get totalItems(): number {
    return this.filterCountries.length;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.ITEMS_PER_PAGE);
  }

  constructor(private genericResourceService: GenericResourceService,
              private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.getCountries();
  }

  private getCountries(): void {
    this.genericResourceService.serverRequest<CountryInfo[]>('GET', 'https://websites.ladorianids.com/resources/prueba/list-countries.json', undefined)
      .pipe(first())
      .subscribe({
        next: (countries: CountryInfo[]): void => {
          this.availableCountries = countries;
          this.filterCountries = [...this.availableCountries];
          this.changePaginator(this.currentPaginator);
        },
        error: (err): void => {
          console.error(err);
        }
      })
  }

  private resetPaginator(): void {
    this.currentPaginator = {start: 0, end: this.ITEMS_PER_PAGE};
  }

  filter(): void {
    const countriesToFilter: string = this.form.get('country')?.value as string || CountriesComponent.EMPTY_STRING;
    const continentToFilter = this.form.get('continent')?.value;
    if (!countriesToFilter && (!continentToFilter || !(continentToFilter as Continent[])?.length)) {
      this.resetResults();
      return;
    }

    this.filterCountries = this.availableCountries.filter((countryInfo: CountryInfo) => {
      return continentToFilter?.length ?
        countryInfo.country.toLowerCase().includes(countriesToFilter.toLowerCase()) && continentToFilter?.includes(countryInfo.continent)
        : countryInfo.country.toLowerCase().includes(countriesToFilter.toLowerCase())
    });

    this.resetPaginator();
    this.changePaginator(this.currentPaginator);
  }

  resetResults(): void {
    this.filterCountries = [...this.availableCountries];
    this.resetPaginator();
    this.changePaginator(this.currentPaginator);
  }

  changePaginator(options: SlicePaginator): void {
    this.currentPaginator = options;
    this.paginatedCountries = this.filterCountries.slice(options.start, options.end);
  }
}
