// types.ts
import {Links, Meta} from "@/store/types";

export interface MapMarker {
  id: string;
  coordinates?: [number, number];
}

export interface MapMarkerState {
  items: Map<string, MapMarker>;

  links: Links;
  meta : Meta;

  error?: string;
  isLoading: boolean;
}
