import glob from 'glob';
import fs from 'fs';

import * as investigateTypeHelper from '../investigator/investigator';
import * as componentParser from './component/component.parser';
import * as moduleParser from './module/module.parser';
import * as directiveParser from './directive/directive.parser';
import * as pipeParser from './pipe/pipe.parser';
import * as specParser from './spec/spec.parser';
import * as spinnerUtils from '../utils/spinner.util';
import { NgParselOutputType } from './shared/model/types.model';
import { parse } from './parser';

describe('NgParsel', () => {
  beforeEach(() => {
    jest.spyOn(spinnerUtils, 'generateSpinner').mockReturnValue({
      start: jest.fn,
      stop: jest.fn,
      fail: jest.fn,
    } as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should parse components if the type was detected as a component', () => {
    jest.spyOn(fs, 'readFileSync').mockReturnValue('');
    jest.spyOn(glob, 'sync').mockReturnValue(['./my-component.ts']);
    jest.spyOn(investigateTypeHelper, 'investigateType').mockReturnValue(NgParselOutputType.COMPONENT);
    jest.spyOn(componentParser, 'parseComponent');

    parse({ parseComponents: true });
    expect(componentParser.parseComponent).toHaveBeenCalled();
  });

  it('should parse modules if the type was detected as a module', () => {
    jest.spyOn(fs, 'readFileSync').mockReturnValue('');
    jest.spyOn(glob, 'sync').mockReturnValue(['my-component.ts']);
    jest.spyOn(investigateTypeHelper, 'investigateType').mockReturnValue(NgParselOutputType.MODULE);
    jest.spyOn(moduleParser, 'parseModule');

    parse({ parseModules: true });
    expect(moduleParser.parseModule).toHaveBeenCalled();
  });

  it('should parse directives if the type was detected as a directive', () => {
    jest.spyOn(fs, 'readFileSync').mockReturnValue('');
    jest.spyOn(glob, 'sync').mockReturnValue(['my-directive.ts']);
    jest.spyOn(investigateTypeHelper, 'investigateType').mockReturnValue(NgParselOutputType.DIRECTIVE);
    jest.spyOn(directiveParser, 'parseDirective');

    parse({ parseDirectives: true });
    expect(directiveParser.parseDirective).toHaveBeenCalled();
  });

  it('should parse pipes if the type was detected as a pipe', () => {
    jest.spyOn(fs, 'readFileSync').mockReturnValue('');
    jest.spyOn(glob, 'sync').mockReturnValue(['my-pipe.ts']);
    jest.spyOn(investigateTypeHelper, 'investigateType').mockReturnValue(NgParselOutputType.PIPE);
    jest.spyOn(pipeParser, 'parsePipe');

    parse({ parsePipes: true });
    expect(pipeParser.parsePipe).toHaveBeenCalled();
  });

  it('should parse spec files if the type was detected as a spec', () => {
    jest.spyOn(fs, 'readFileSync').mockReturnValue('');
    jest.spyOn(glob, 'sync').mockReturnValue(['my-pipe.ts']);
    jest.spyOn(investigateTypeHelper, 'investigateType').mockReturnValue(NgParselOutputType.SPEC);
    jest.spyOn(specParser, 'parseSpec');

    parse({ parseSpecs: true });
    expect(specParser.parseSpec).toHaveBeenCalled();
  });
});
