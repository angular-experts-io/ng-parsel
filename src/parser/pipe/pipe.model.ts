import { NgParselBuildingBlock } from '../shared/model/types.model';

export interface NgParselPipe extends NgParselBuildingBlock {
  className: string;
  name: string;
  pure: boolean;
  standalone: boolean;
  implementation: string;
}
