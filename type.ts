export interface IMilk {
  "name": string,
  "type": string,
  "storage": number,
  "id": string
}

export interface IPage {
  current: number,
  last: number
}

export type IQuery = {
  type: string;
  page: string;
}

export interface IMilkRespone {
  data: IMilk[];
  numberOfItems: number;
  types: string[];
}

export interface ISearch {
  search: string;
  page: string;
}
