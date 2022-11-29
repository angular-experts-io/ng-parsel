export enum NgParselOutputType {
  COMPONENT = 'Component',
  SPEC = 'Spec',
  DIRECTIVE = 'Directive',
  MODULE = 'Module',
  PIPE = 'Pipe',
  HARNESS = 'Harness',
  VALIDATOR = 'Validator',
  UNKNOWN = 'Unknown',
}

export interface NgParselOutput {
  className: string;
  type: NgParselOutputType;
}
