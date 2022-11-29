import { NgParselOutput } from '../shared/model/types.model';
import { NgParselMethod } from '../shared/model/method.model';

export interface NgParselValidtor extends NgParselOutput {
  methods: NgParselMethod[];
}
