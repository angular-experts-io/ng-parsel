export enum NgParselOutputType {
  COMPONENT = 'Component',
  SPEC = 'Spec',
  DIRECTIVE = 'Directive',
  MODULE = 'Module',
  PIPE = 'Pipe',
  // TODO handle this type
  HARNESS = 'Harness',
  UNKNOWN = 'Unknown',
}

export interface NgParselOutput {
  type: NgParselOutputType;
}
