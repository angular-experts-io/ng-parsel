export enum NgParselBuildingBlockType {
  COMPONENT = "Component",
  SPEC = "Spec",
  DIRECTIVE = "Directive",
  MODULE = "Module",
  PIPE = "Pipe",
  UNKNOWN = "Unknown",
}

export interface NgParselBuildingBlock {
  type: NgParselBuildingBlockType;
}
