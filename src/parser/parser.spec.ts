import fs from 'fs';
import glob from 'glob';

import * as pipeParser from './pipe/pipe.parser.js';
import * as specParser from './spec/spec.parser.js';
import * as spinnerUtils from '../utils/spinner.util.js';
import * as moduleParser from './module/module.parser.js';
import * as directiveParser from './directive/directive.parser.js';
import * as componentParser from './component/component.parser.js';
import { NgParselOutputType } from './shared/model/types.model.js';
import * as investigateTypeHelper from '../investigator/investigator.js';

import { parse } from './parser.js';

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
