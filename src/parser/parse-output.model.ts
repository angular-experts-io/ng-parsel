import { NgParselComponent } from './component/component.model.js';
import { NgParselSpec } from './spec/spec.model.js';
import { NgParselValidator } from './validator/validator.model.js';
import { NgParselHarness } from './harness/harness.model.js';
import { NgParselPipe } from './pipe/pipe.model.js';
import { NgParselModule } from './module/module.model.js';
import { NgParselDirective } from './directive/directive.model.js';
import { NgParselService } from './services/service.model.js';

export interface NgParselOutput {
  ngParselComponents: NgParselComponent[];
  ngParselSpecs: NgParselSpec[];
  ngParselValidators: NgParselValidator[];
  ngParselHarnesses: NgParselHarness[];
  ngParselPipes: NgParselPipe[];
  ngParselModules: NgParselModule[];
  ngParselDirectives: NgParselDirective[];
  ngParselServices: NgParselService[];
}
