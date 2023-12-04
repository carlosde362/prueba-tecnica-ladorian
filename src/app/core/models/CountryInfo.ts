export enum Continent {
  ASIA = 'Asia',
  AFRICA = 'Africa',
  NORTH_AMERICA = 'North America',
  SOUTH_AMERICA = 'South America',
  ANTARCTICA = 'Antarctica',
  EUROPE = 'Europe',
  OCEANIA = 'Oceania'
}

export interface CountryInfo {
  country: string;
  continent: Continent;
}

