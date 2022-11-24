export const CONFIG_DEFAULT_VALUES: NgParselConfig = {
  src: 'src',
  out: 'ng-parsel',
  parseComponents: true,
  parsePipes: true,
  parseDirectives: true,
  parseModules: true,
  parseSpecs: true,
  singleFile: true,
};

export interface NgParselConfig {
  src?: string;
  out?: string;
  parseComponents?: boolean;
  parsePipes?: boolean;
  parseDirectives?: boolean;
  parseModules?: boolean;
  parseSpecs?: boolean;
  singleFile?: boolean;
}
