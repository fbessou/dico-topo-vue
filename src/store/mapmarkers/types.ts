// types.ts
import {Links, Meta} from "@/store/types";

export interface MapMarker {
  id: string;
  coordinates?: [number, number];
}

export interface MapMarkerState {
  items: Map<string, MapMarker>;

  uniqueDepartments: String[];
  uniqueRegions: String[];

  links: Links;
  meta : Meta;

  error?: string;
  isLoading: boolean;
}
