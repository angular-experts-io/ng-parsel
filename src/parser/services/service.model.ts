import { NgParselOutput } from '../shared/model/types.model.js';
import { NgParselMethod } from '../shared/model/method.model.js';
import { NgParselField } from '../shared/model/field.model.js';

export interface NgParselService extends NgParselOutput {
  fieldsPublicExplicit: NgParselField[];
  methodsPublicExplicit: NgParselMethod[];
}
