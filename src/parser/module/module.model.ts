import { NgParselOutput } from '../shared/model/types.model.js';

export interface NgParselModule extends NgParselOutput {
  className: string;
  imports: string[];
  exports: string[];
  declarations: string[];
  providers: string[];
  bootstrap: string[];
}
