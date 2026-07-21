export type CharacterCategory = "player" | "mc" | "elite4" | "npc";

export interface FrameBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface AnimationFrame {
  frameIndex: number;
  imagePath: string;
  bounds: FrameBounds;
}

export interface AnimationSequence {
  name: string;
  direction?: "down" | "left" | "right" | "up";
  action?: "idle" | "walk" | "run" | "action";
  fps: number;
  loop: boolean;
  frames: AnimationFrame[];
}

export interface CharacterMetadata {
  id: string;
  name: string;
  category: CharacterCategory;
  sourceSheet: string;
  portraitPath: string | null;
  dialoguePortraitPath: string | null;
  frameDimensions: { width: number; height: number };
  animations: Record<string, AnimationSequence>;
  customFrames?: AnimationFrame[];
}

export type WorldAssetCategory =
  | "maps"
  | "buildings"
  | "vegetation"
  | "terrain"
  | "water"
  | "decorations"
  | "interiors"
  | "animated_objects";

export interface TileMetadata {
  id: string;
  index: number;
  imagePath: string;
  bounds: FrameBounds;
  isTransparent: boolean;
}

export interface WorldAssetMetadata {
  id: string;
  name: string;
  category: WorldAssetCategory;
  originalPath: string;
  processedPath: string;
  dimensions: { width: number; height: number };
  isMap: boolean;
  isTileset: boolean;
  tileSize?: { width: number; height: number };
  tileCount?: number;
  tiles?: TileMetadata[];
}

export interface AssetManifest {
  generatedAt: string;
  characters: Record<string, CharacterMetadata>;
  world: Record<string, WorldAssetMetadata>;
  categories: {
    characters: CharacterCategory[];
    world: WorldAssetCategory[];
  };
}
