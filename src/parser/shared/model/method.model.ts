import { NgParselArgs } from './args.model.js';
import { AccessType } from './common.model.js';

export interface NgParselMethod {
  name: string;
  args: NgParselArgs[];
  returnType: string;
  jsDoc?: string | undefined;
  accessType: AccessType;
}
