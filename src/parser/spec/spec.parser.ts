import { readFileSync } from 'fs';

import { NgParselSpec } from './spec.model';
import { NgParselOutputType } from '../shared/model/types.model';

export function parseSpec(specFilePath: string): NgParselSpec {
  return {
    type: NgParselOutputType.SPEC,
    implementation: readFileSync(specFilePath, 'utf8').toString(),
  };
}
