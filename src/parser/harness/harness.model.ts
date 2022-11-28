import { NgParselOutput } from '../shared/model/types.model';
import { NgParselMethod } from '../shared/model/method.model';

export interface NgParselHarness extends NgParselOutput {
  methods: NgParselMethod[];
}
