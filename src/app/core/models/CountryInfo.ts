export enum ContinentEnum {
  ASIA = 'Asia',
  AFRICA = 'Africa',
  NORTH_AMERICA = 'North America',
  SOUTH_AMERICA = 'South America',
  ANTARCTICA = 'Antarctica',
  EUROPE = 'Europe',
  OCEANIA = 'Oceania'
}

export interface CountryInfoApi {
  country: string;
  continent: ContinentEnum;
}

export class Continent {
  continent: ContinentEnum;

  constructor(continent: ContinentEnum) {
    this.continent = continent;
  }
}

export class Country extends Continent {
  country: string;

  constructor(continent: ContinentEnum, country: string) {
    super(continent);
    this.country = country
  }
}

