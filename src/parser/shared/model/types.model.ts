export enum NgParselOutputType {
  COMPONENT = 'Component',
  SPEC = 'Spec',
  DIRECTIVE = 'Directive',
  MODULE = 'Module',
  PIPE = 'Pipe',
  UNKNOWN = 'Unknown',
}

export interface NgParselOutput {
  type: NgParselOutputType;
}
