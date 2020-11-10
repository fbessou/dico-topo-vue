// types.ts
import { Links, Meta } from '@/store/types'

export interface Place {
  id: string;
  label: string;
  // description: string;
  // comment: string;
  responsibility?: Object;
  department: string;
  region: string;
  // old_labels: string[];

  insee_code: string;

  coordinates?: [number, number];
  geoname_id?: string;
  wikidata_item_id?: string;
  wikipedia_url?: string;
  databnf_ark?: string;
  viaf_id?: string;
  osm_id?: string;
}

export interface PlaceState {
  items: Map<string, Place>;
  selectedItem: Place | undefined;

  knownYears: Object[];

  uniqueDepartments: string[];
  uniqueCantons: string[];

  links: Links;
  meta : Meta;
  afterHistory: string[];

  error?: string;
  isLoading: boolean;
}
