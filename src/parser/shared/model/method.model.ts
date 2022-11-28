import { NgParselArgs } from './args.model';

export interface NgParselMethod {
  name: string;
  args: NgParselArgs[];
  returnType: string;
}
