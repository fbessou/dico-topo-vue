// types.ts

export interface InseeRefObject {
  id: string;
  label: string;
};

export interface CommuneState {
  commune: Object;

  region?: InseeRefObject;
  departement?: InseeRefObject;
  arrondissement?: InseeRefObject;
  canton?: InseeRefObject;
};
