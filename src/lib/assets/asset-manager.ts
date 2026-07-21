import {
  AssetManifest,
  CharacterMetadata,
  WorldAssetMetadata,
  AnimationSequence,
  AnimationFrame,
  WorldAssetCategory,
} from "./types";

export class AssetManager {
  private static instance: AssetManager | null = null;
  private manifest: AssetManifest | null = null;
  private imageCache: Map<string, HTMLImageElement> = new Map();
  private loaded: boolean = false;

  private constructor() {}

  public static getInstance(): AssetManager {
    if (!AssetManager.instance) {
      AssetManager.instance = new AssetManager();
    }
    return AssetManager.instance;
  }

  /**
   * Load asset manifest from server API or JSON file
   */
  public async loadManifest(manifestUrl = "/processed/manifest.json"): Promise<AssetManifest> {
    if (this.manifest && this.loaded) {
      return this.manifest;
    }
    try {
      const response = await fetch(manifestUrl);
      if (!response.ok) {
        throw new Error(`Failed to load manifest: ${response.statusText}`);
      }
      this.manifest = (await response.json()) as AssetManifest;
      this.loaded = true;
      return this.manifest;
    } catch (error) {
      console.warn("Could not fetch manifest from URL, returning empty manifest state", error);
      this.manifest = {
        generatedAt: new Date().toISOString(),
        characters: {},
        world: {},
        categories: { characters: [], world: [] },
      };
      return this.manifest;
    }
  }

  public setManifest(manifest: AssetManifest): void {
    this.manifest = manifest;
    this.loaded = true;
  }

  public getManifest(): AssetManifest | null {
    return this.manifest;
  }

  /**
   * Get all registered character IDs
   */
  public getCharacterIds(): string[] {
    return this.manifest ? Object.keys(this.manifest.characters) : [];
  }

  /**
   * Get character metadata by ID
   */
  public getCharacter(id: string): CharacterMetadata | undefined {
    return this.manifest?.characters[id];
  }

  /**
   * Get world assets, optionally filtered by category
   */
  public getWorldAssets(category?: WorldAssetCategory): WorldAssetMetadata[] {
    if (!this.manifest) return [];
    const assets = Object.values(this.manifest.world);
    if (category) {
      return assets.filter((a) => a.category === category);
    }
    return assets;
  }

  /**
   * Get specific world asset by ID
   */
  public getWorldAsset(id: string): WorldAssetMetadata | undefined {
    return this.manifest?.world[id];
  }

  /**
   * Get specific animation sequence for a character
   */
  public getAnimation(characterId: string, animationName: string): AnimationSequence | undefined {
    const char = this.getCharacter(characterId);
    return char?.animations[animationName];
  }

  /**
   * Preload an image asset for immediate canvas rendering
   */
  public async preloadImage(src: string): Promise<HTMLImageElement> {
    if (typeof window === "undefined") {
      throw new Error("Image preloading is only available in browser context");
    }
    if (this.imageCache.has(src)) {
      return this.imageCache.get(src)!;
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        this.imageCache.set(src, img);
        resolve(img);
      };
      img.onerror = (err) => reject(err);
      img.src = src;
    });
  }

  /**
   * Preload all frames for a character's animation
   */
  public async preloadCharacterAnimation(
    characterId: string,
    animationName: string
  ): Promise<HTMLImageElement[]> {
    const anim = this.getAnimation(characterId, animationName);
    if (!anim) return [];

    const promises = anim.frames.map((frame) => this.preloadImage(frame.imagePath));
    return Promise.all(promises);
  }
}
