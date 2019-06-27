// types.ts

export interface SortableField {
  key: string;
  order: string;
}

export interface QueryState {
  term: string;
  includeOldLabels: boolean;
  groupbyPlacename: boolean;

  sortFields: Array<SortableField>;

  depFilter: String[];

  minTermLength: number;
}
