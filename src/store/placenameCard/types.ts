// types.ts
import {Links, Meta} from "@/store/types";
import {Placename} from "@/store/placenames/types";

export interface PlacenameOldLabel {
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

export interface PlacenameCardState {
  placenameItem?: Placename;
  //placenameOldLabels: Array<PlacenameOldLabel>;

  error?: string;
  isLoading: boolean;
}
