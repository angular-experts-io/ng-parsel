export enum NgParselOutputType {
  COMPONENT = 'Component',
  SPEC = 'Spec',
  DIRECTIVE = 'Directive',
  MODULE = 'Module',
  PIPE = 'Pipe',
  HARNESS = 'Harness',
  UNKNOWN = 'Unknown',
}

export interface NgParselOutput {
  type: NgParselOutputType;
}
