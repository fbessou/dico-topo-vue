export interface RootState {
  version: string;
  places?: any;
  mapmarkers?: any;
  searchParameters?: any;
  placeCard?: any;
  bibls?: any;
  commune?: any;
}

export interface Links {
  self?: string;
  next?: string;
  prev?: string;
  last?: string;
}

export interface Meta {
  totalCount?: number;
  after?: string;
}
