export interface Blog {
    name?: string;
    coverImage?: any;
    profile?: string;
    title?: string;
    description?: string;
    comment?: number;
    share?: number;
    day?: string;
    month?: string;
    code?: string;
    status?: string;
    tags?: string[];
}
export interface LgasList {
  lgaId: number
  country: string
  state: string
  localGov: string
}
export interface Comment {
    image?: string;
    name?: string;
    date?: string;
    description?: string;
}

export interface CityList {
  cityId: number
  city: string
  lgaId: number
  country: string
  state: string
  localGov: string
}

export interface DefaultItem {
  id: number
  name: string
}
export interface CountryRes {
    data:         Datum[];
    responseCode: number;
    description:  string;
    timeStamp:    Date;
    url:          null;
    objects:      null;
}

export interface Datum {
    id:   number;
    name: string;
}

export interface CommonState {
  id: number
  name: string
  parentId: number
}
