import { NgParselOutput } from '../shared/model/types.model.js';
import { NgParselMethod } from '../shared/model/method.model.js';

export interface NgParselHarness extends NgParselOutput {
  methodsPublicExplicit: NgParselMethod[];
}
