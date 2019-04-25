// types.ts
import {Links, Meta} from "@/store/types";

export interface Placename {
  id: string;
  label: string;
  department: string;
  region: string;

  insee_code: string;
  description: string;

  coordinates?: [number, number];
  geoname_id?: string;
  wikidata_item_id?: string;
  wikipedia_url?: string;
  databnf_ark?: string;
  viaf_id?: string;
}

export interface PlacenameState {
  items: Map<string, Placename>;

  links: Links;
  meta : Meta;

  error?: string;
  isLoading: boolean;
}
