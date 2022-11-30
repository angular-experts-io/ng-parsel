import { NgParselOutput } from '../shared/model/types.model.js';

export interface NgParselPipe extends NgParselOutput {
  className: string;
  name: string;
  pure: boolean;
  standalone: boolean;
  implementation: string;
}
