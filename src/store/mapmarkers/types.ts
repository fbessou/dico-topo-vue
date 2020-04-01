// types.ts
import { Links, Meta } from '@/store/types'

export interface MapMarkerState {
  items: string[];

  links: Links;
  meta : Meta;
  flyToItem?: Object;

  error?: string;
  isLoading: boolean;
}
