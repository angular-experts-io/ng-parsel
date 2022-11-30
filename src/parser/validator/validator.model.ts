import { NgParselOutput } from '../shared/model/types.model.js';
import { NgParselMethod } from '../shared/model/method.model.js';

export interface NgParselValidtor extends NgParselOutput {
  methodsPublicExplicit: NgParselMethod[];
}
