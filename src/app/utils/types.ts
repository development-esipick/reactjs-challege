
export interface OwnProps {
  children: JSX.Element;
}

export interface CountryType {
  name?: {
    common: string;
    nativeName: any;
  },
  capital?: string[];
  region?: string;
  subregion?: string;
  population?: number;
  flags?: {
    png: string;
  },
  tld?: string[],
  currencies?: any;
  borders?: string[];
}

export enum RegionEnum {
  Africa = 'Africa',
  Americas = 'Americas',
  Asia = 'Asia',
  Europe = 'Europe',
  Oceania = 'Oceania'
}