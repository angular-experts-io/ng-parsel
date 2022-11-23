export enum NgParselBuildingBlockType {
  COMPONENT = "Component",
  DIRECTIVE = "Directive",
  MODULE = "Module",
  PIPE = "Pipe",
  UNKNOWN = "Unknown",
}

export interface NgParselBuildingBlock {
  type: NgParselBuildingBlockType;
}
