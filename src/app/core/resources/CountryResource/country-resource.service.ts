import { Injectable } from '@angular/core';
import {GenericResourceService} from '../generic-resource.service';
import {Country, CountryInfoApi} from '../../models/CountryInfo';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryResourceService {

  constructor(private genericResourceService: GenericResourceService) { }

  desSealizeCountry = (input: CountryInfoApi): Country => {
    return new Country(input.continent, input.country)
  }

  desSerializeCountries = (input: CountryInfoApi[]) => input.map((countryInfoApi: CountryInfoApi) => this.desSealizeCountry(countryInfoApi));

  getCountries(): Observable<Country[]> {
    return this.genericResourceService.serverRequest('GET', 'https://websites.ladorianids.com/resources/prueba/list-countries.json', this.desSerializeCountries, undefined);
  }
}
