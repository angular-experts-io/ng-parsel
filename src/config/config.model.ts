export const CONFIG_DEFAULT_VALUES: NgParselConfig = {
  src: 'src',
  out: 'ng-parsel',
  parseComponents: true,
  parsePipes: true,
  parseDirectives: true,
  parseHarnesses: true,
  parseModules: true,
  parseSpecs: true,
  parseValidators: true,
  singleFile: true,
};

export interface NgParselConfig {
  src?: string;
  out?: string;
  parseComponents?: boolean;
  parsePipes?: boolean;
  parseDirectives?: boolean;
  parseHarnesses?: boolean;
  parseModules?: boolean;
  parseSpecs?: boolean;
  parseValidators?: boolean;
  singleFile?: boolean;
}
