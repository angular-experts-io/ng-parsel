import { NgParselArgs } from './args.model.js';

export interface NgParselMethod {
  name: string;
  args: NgParselArgs[];
  returnType: string;
}
