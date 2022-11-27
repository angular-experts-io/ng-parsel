import { NgParselOutput } from '../shared/model/types.model';

export interface NgParselPipe extends NgParselOutput {
  className: string;
  name: string;
  pure: boolean;
  standalone: boolean;
  implementation: string;
}
