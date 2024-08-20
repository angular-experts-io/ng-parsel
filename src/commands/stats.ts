import { convertToComponentStats } from '../converters/component/component.converter.js';
import { convertToDirectiveStats } from '../converters/directive/directive.converter.js';
import { printComponentStats } from '../printers/component-stats.printer.js';
import { printWelcomeMessage } from '../utils/welcome.util.js';
import { loadAndMergeConfig } from '../utils/config.util.js';
import { printDirectiveStats } from '../printers/directive-stats.printer.js';
import { printModuleStats } from '../printers/module-stats.printer.js';
import { convertToModuleStats } from '../converters/module/module.converter.js';
import { printPipeStats } from '../printers/pipe-stats.printer.js';
import { convertToPipeStats } from '../converters/pipes/pipes.converter.js';
import { printServiceStats } from '../printers/service-stats.printer.js';
import { convertToServiceStats } from '../converters/service/service.converter.js';
import { parse } from '../parser/parser.js';
import { printHarnessStats } from '../printers/harness-stats.printer.js';
import { convertToHarnessStats } from '../converters/harness/harness.converter.js';
import { printSpecStats } from '../printers/spec-stats.printer.js';
import { convertToSpecStats } from '../converters/spec/spec.converter.js';

export function statsCommand(cliArgs: { [key: string]: string }) {
  printWelcomeMessage();

  const config = loadAndMergeConfig(cliArgs);

  // TODO: clean this up later
  config['src'] = './test-spa';

  const parsedOutput = parse(config);
  const componentStats = convertToComponentStats(parsedOutput.ngParselComponents);
  const directiveStats = convertToDirectiveStats(parsedOutput.ngParselDirectives);
  const moduleStats = convertToModuleStats(parsedOutput.ngParselModules);
  const pipeStats = convertToPipeStats(parsedOutput.ngParselPipes);
  const serviceStats = convertToServiceStats(parsedOutput.ngParselServices);
  const harnessStats = convertToHarnessStats(parsedOutput.ngParselHarnesses);
  const specStats = convertToSpecStats(parsedOutput.ngParselSpecs);

  printComponentStats(componentStats);
  printDirectiveStats(directiveStats);
  printModuleStats(moduleStats);
  printPipeStats(pipeStats);
  printServiceStats(serviceStats);
  printHarnessStats(harnessStats);
  printSpecStats(specStats);
}
