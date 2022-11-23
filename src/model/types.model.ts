export enum MitchelAngularBuildingBlockType {
  COMPONENT = "Component",
  DIRECTIVE = "Directive",
  MODULE = "Module",
  PIPE = "Pipe",
  UNKNOWN = "Unknown",
}

export interface MitchelAngularBuildingBlock {
  type: MitchelAngularBuildingBlockType;
}
