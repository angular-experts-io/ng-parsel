export enum NgParselOutputType {
  COMPONENT = 'Component',
  SPEC = 'Spec',
  DIRECTIVE = 'Directive',
  SERVICE = 'Service',
  MODULE = 'Module',
  PIPE = 'Pipe',
  HARNESS = 'Harness',
  VALIDATOR = 'Validator',
  UNKNOWN = 'Unknown',
}

export interface NgParselOutput {
  type: NgParselOutputType;
  className: string;
  filePath: string;
}
