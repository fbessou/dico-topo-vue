// types.ts
import { Links, Meta } from '@/store/types'
import { Placename } from '@/store/placenames/types'

export interface PlacenameOldLabel {
  id: string;
  label: string;
  date: string;
  reference: string;
  labelNode: string;
}

export interface PlacenameCardState {
  placenameItem?: Placename;
  placenameOldLabels?: Array<PlacenameOldLabel>;
  linkedPlacenames?: Array<Placename>;

  error?: string;
  isLoading: boolean;
}
