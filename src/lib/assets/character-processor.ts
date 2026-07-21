import { CharacterMetadata, AnimationSequence, AnimationFrame } from "./types";

export class CharacterProcessor {
  /**
   * Helper to construct character metadata programmatically
   */
  public static createCharacterMetadata(
    id: string,
    name: string,
    category: CharacterMetadata["category"],
    sourceSheet: string,
    portraitPath: string | null = null,
    dialoguePortraitPath: string | null = null
  ): CharacterMetadata {
    return {
      id,
      name,
      category,
      sourceSheet,
      portraitPath,
      dialoguePortraitPath: dialoguePortraitPath || portraitPath,
      frameDimensions: { width: 32, height: 32 },
      animations: {},
    };
  }

  /**
   * Get formatted animation key from direction and action
   */
  public static getAnimationKey(
    action: "walk" | "idle" | "run",
    direction: "down" | "left" | "right" | "up"
  ): string {
    return `${action}-${direction}`;
  }
}
