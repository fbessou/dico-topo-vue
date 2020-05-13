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
  depFilter: String[];
  ctnFilter: String[];
  range: RangeParameter;

  minTermLength: number;
  pagination: any;
  // map attributes
  zoom: Number;
  center?: any;
  // iiif viewer attributes
  showIIIFViewer: boolean,
  IIIFViewerAvailability: boolean
}
