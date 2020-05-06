// types.ts

export interface SortableField {
  key: string;
  order: string;
}

export interface RangeParameter {
  key: string;
  operators: Array<string>;
}

export interface QueryState {
  term: string;
  groupbyPlace: boolean;
  sortFields: Array<SortableField>;
  range: RangeParameter;
  depFilter: String[];
  minTermLength: number;
  pagination: Object;
  // map attributes
  zoom: Number;
  center?: Object;
  // iiif viewer attributes
  showIIIFViewer: boolean,
  IIIFViewerAvailability: boolean
}
