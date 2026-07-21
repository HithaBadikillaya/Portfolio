import { WorldAssetMetadata, WorldAssetCategory } from "./types";

export class WorldProcessor {
  /**
   * Helper to categorize world filename
   */
  public static categorizeFilename(filename: string): WorldAssetCategory {
    const fname = String(filename).toLowerCase();
    if (fname.includes("route") || fname.includes("overall")) return "maps";
    if (fname.includes("building") || fname.includes("home")) return "buildings";
    if (fname.includes("interior")) return "interiors";
    if (fname.includes("grass") || fname.includes("nature")) return "vegetation";
    if (fname.includes("cave") || fname.includes("dry")) return "terrain";
    return "decorations";
  }
}
