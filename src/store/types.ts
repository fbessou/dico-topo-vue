export interface RootState {
  version: string;
}

export interface Links {
  self?: string;
  next?: string;
  prev?: string;
  last?: string;
}

export interface Meta {
  totalCount?: number;
}
