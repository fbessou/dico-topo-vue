// types.ts
export interface Placename {
  id: string;
  label: string;
  country: string;
  department: string;
}

export interface PlacenameState {
  items: Map<string, Placename>;
  error: boolean;
  isLoading: boolean;
}
