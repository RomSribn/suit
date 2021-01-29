import { Subgroups } from '../../../stores/garments';

export interface ToggleBarProps {
  subgroupsStore?: Subgroups;
  lang?: Lang;
  orderStore?: IOrderStore;
  garment: string;
  activeGarments?: string[];
  clearSelectedItems?: EmptyFunction;
}
