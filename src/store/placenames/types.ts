// types.ts
import {Links, Meta} from "@/store/types";

export interface Placename {
  id: string;
  label: string;
  description: string;
  comment: string;
  department: string;
  region: string;
  old_labels: string[];

  insee_code: string;

  coordinates?: [number, number];
  geoname_id?: string;
  wikidata_item_id?: string;
  wikipedia_url?: string;
  databnf_ark?: string;
  viaf_id?: string;
}

export interface PlacenameState {
  items: Map<string, Placename>;
  selectedItem: Placename | undefined;

  knownYears: string[];

  uniqueDepartments: string[];

  links: Links;
  meta : Meta;
  afterHistory: string[];

  error?: string;
  isLoading: boolean;
}
