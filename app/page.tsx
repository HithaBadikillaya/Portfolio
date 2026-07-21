"use client";

import { useEffect, useState, useRef } from "react";
import {
  AssetManifest,
  CharacterMetadata,
  WorldAssetMetadata,
  AnimationSequence,
} from "@/src/lib/assets/types";

export default function AssetPipelineViewer() {
  const [manifest, setManifest] = useState<AssetManifest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "characters" | "world" | "tilesets" | "json">("overview");

  // Character preview state
  const [selectedCharId, setSelectedCharId] = useState<string>("");
  const [selectedAnimKey, setSelectedAnimKey] = useState<string>("");
  const [currentFrameIdx, setCurrentFrameIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const animIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // World asset state
  const [selectedWorldCategory, setSelectedWorldCategory] = useState<string>("all");
  const [selectedWorldId, setSelectedWorldId] = useState<string>("");

  useEffect(() => {
    fetch("/api/assets")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load asset manifest");
        return res.json();
      })
      .then((data: AssetManifest) => {
        setManifest(data);
        const charKeys = Object.keys(data.characters || {});
        if (charKeys.length > 0) {
          setSelectedCharId(charKeys[0]);
          const animKeys = Object.keys(data.characters[charKeys[0]].animations || {});
          if (animKeys.length > 0) setSelectedAnimKey(animKeys[0]);
        }
        const worldKeys = Object.keys(data.world || {});
        if (worldKeys.length > 0) {
          setSelectedWorldId(worldKeys[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Animation player effect
  useEffect(() => {
    if (!manifest || !selectedCharId || !selectedAnimKey || !isPlaying) return;
    const char = manifest.characters[selectedCharId];
    if (!char) return;
    const anim: AnimationSequence | undefined = char.animations[selectedAnimKey];
    if (!anim || anim.frames.length === 0) return;

    const intervalMs = Math.max(50, Math.floor(1000 / (anim.fps || 6)));
    animIntervalRef.current = setInterval(() => {
      setCurrentFrameIdx((prev) => (prev + 1) % anim.frames.length);
    }, intervalMs);

    return () => {
      if (animIntervalRef.current) clearInterval(animIntervalRef.current);
    };
  }, [manifest, selectedCharId, selectedAnimKey, isPlaying]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-950 text-white font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-400 border-t-transparent"></div>
          <p className="text-lg font-medium text-slate-300">Loading Pokémon Asset Pipeline Manifest...</p>
        </div>
      </div>
    );
  }

  if (error || !manifest) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-950 text-white font-sans">
        <div className="max-w-md rounded-2xl border border-red-500/30 bg-red-950/20 p-8 text-center backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-red-400">Pipeline Manifest Error</h2>
          <p className="mt-2 text-sm text-slate-300">{error || "No manifest found."}</p>
          <p className="mt-4 text-xs text-slate-400">Please run <code className="rounded bg-slate-800 px-2 py-1 text-amber-300">npm run process-assets</code> to generate assets.</p>
        </div>
      </div>
    );
  }

  const characters = Object.values(manifest.characters || {});
  const worldAssets = Object.values(manifest.world || {});

  const selectedChar = manifest.characters[selectedCharId];
  const activeAnim = selectedChar?.animations[selectedAnimKey];

  const filteredWorld = selectedWorldCategory === "all"
    ? worldAssets
    : worldAssets.filter((w) => w.category === selectedWorldCategory);

  const selectedWorld = manifest.world[selectedWorldId];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-amber-400 selection:text-slate-950">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-red-500 text-slate-950 font-black shadow-lg shadow-amber-500/20">
            ⚡
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Pokémon Game Engine <span className="rounded-full bg-amber-400/10 px-2.5 py-0.5 text-xs font-semibold text-amber-400 border border-amber-400/20">Asset Pipeline</span>
            </h1>
            <p className="text-xs text-slate-400">Next.js & TypeScript Preprocessor & Asset Manager</p>
          </div>
        </div>

        <nav className="flex items-center gap-1 rounded-xl bg-slate-950/60 p-1.5 border border-slate-800">
          {[
            { id: "overview", label: "Overview", icon: "📊" },
            { id: "characters", label: "Characters", icon: "🧍" },
            { id: "world", label: "World & Maps", icon: "🗺️" },
            { id: "tilesets", label: "Tileset Inspector", icon: "🧩" },
            { id: "json", label: "Metadata (JSON)", icon: "⚙️" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl">
                <span className="text-xs font-semibold uppercase text-amber-400 tracking-wider">Processed Characters</span>
                <p className="mt-2 text-3xl font-extrabold text-white">{characters.length}</p>
                <p className="mt-1 text-xs text-slate-400">Player, MC, Elite 4, NPCs</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl">
                <span className="text-xs font-semibold uppercase text-sky-400 tracking-wider">World Maps & Assets</span>
                <p className="mt-2 text-3xl font-extrabold text-white">{worldAssets.length}</p>
                <p className="mt-1 text-xs text-slate-400">Routes, Buildings, Interiors</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl">
                <span className="text-xs font-semibold uppercase text-emerald-400 tracking-wider">Extracted Tilesets</span>
                <p className="mt-2 text-3xl font-extrabold text-white">
                  {worldAssets.filter((w) => w.isTileset).length}
                </p>
                <p className="mt-1 text-xs text-slate-400">Sliced 32x32 Grid Tiles</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl">
                <span className="text-xs font-semibold uppercase text-purple-400 tracking-wider">Background Removal</span>
                <p className="mt-2 text-3xl font-extrabold text-emerald-400">100% Alpha</p>
                <p className="mt-1 text-xs text-slate-400">Pixel-Perfect Background Clean</p>
              </div>
            </div>

            {/* Quick Character Showcase Grid */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-lg font-bold text-white mb-4">Processed Characters Showcase</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {characters.map((char) => (
                  <div
                    key={char.id}
                    onClick={() => {
                      setSelectedCharId(char.id);
                      setActiveTab("characters");
                    }}
                    className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition-all hover:border-amber-500/50 hover:bg-slate-800/40 flex flex-col items-center text-center"
                  >
                    <div className="h-16 w-16 flex items-center justify-center bg-slate-900/80 rounded-lg p-1 border border-slate-800 group-hover:border-amber-400/30">
                      {char.portraitPath ? (
                        <img src={char.portraitPath} alt={char.name} className="max-h-full max-w-full object-contain pixelated" />
                      ) : (
                        <span className="text-2xl">🧍</span>
                      )}
                    </div>
                    <p className="mt-2 text-xs font-semibold text-slate-200 group-hover:text-amber-400 truncate w-full">{char.name}</p>
                    <span className="mt-0.5 text-[10px] text-slate-400 uppercase tracking-wide">{char.category}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick World Categories Showcase */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-lg font-bold text-white mb-4">World Assets & Maps Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {worldAssets.slice(0, 6).map((world) => (
                  <div
                    key={world.id}
                    onClick={() => {
                      setSelectedWorldId(world.id);
                      setActiveTab("world");
                    }}
                    className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition-all hover:border-sky-500/50 hover:bg-slate-800/40 flex items-center gap-4"
                  >
                    <div className="h-16 w-16 flex-shrink-0 bg-slate-900 rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center">
                      <img src={world.processedPath} alt={world.name} className="h-full w-full object-cover pixelated" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-semibold text-slate-200 group-hover:text-sky-400 truncate">{world.name}</p>
                      <p className="text-xs text-slate-400 capitalize">{world.category} • {world.dimensions.width}×{world.dimensions.height}px</p>
                      {world.isTileset && (
                        <span className="mt-1 inline-block rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/20">
                          {world.tileCount} Tiles Sliced
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CHARACTERS & ANIMATIONS TAB */}
        {activeTab === "characters" && selectedChar && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Sidebar: Character Selector */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 flex flex-col h-[700px]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 px-2 mb-3">Character Selector</h3>
              <div className="flex-1 overflow-y-auto space-y-1 pr-1">
                {characters.map((char) => (
                  <button
                    key={char.id}
                    onClick={() => {
                      setSelectedCharId(char.id);
                      const anims = Object.keys(char.animations || {});
                      if (anims.length > 0) setSelectedAnimKey(anims[0]);
                      setCurrentFrameIdx(0);
                    }}
                    className={`w-full flex items-center gap-3 rounded-xl p-2.5 text-left transition-all ${
                      selectedCharId === char.id
                        ? "bg-amber-500/15 border border-amber-500/30 text-amber-300"
                        : "hover:bg-slate-800/40 text-slate-300 border border-transparent"
                    }`}
                  >
                    <div className="h-10 w-10 flex-shrink-0 bg-slate-950 rounded-lg p-1 border border-slate-800 flex items-center justify-center">
                      {char.portraitPath ? (
                        <img src={char.portraitPath} alt={char.name} className="max-h-full max-w-full object-contain pixelated" />
                      ) : (
                        <span className="text-lg">🧍</span>
                      )}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-semibold truncate">{char.name}</p>
                      <p className="text-xs text-slate-400 uppercase tracking-wider">{char.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Character Details & Interactive Animation Player */}
            <div className="lg:col-span-2 space-y-6">
              {/* Character Header & Portrait */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col sm:flex-row items-center gap-6">
                <div className="h-32 w-32 flex-shrink-0 rounded-2xl border border-slate-700 bg-slate-950 p-2 flex items-center justify-center shadow-inner">
                  {selectedChar.portraitPath ? (
                    <img src={selectedChar.portraitPath} alt={selectedChar.name} className="max-h-full max-w-full object-contain pixelated" />
                  ) : (
                    <span className="text-4xl">🧍</span>
                  )}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h2 className="text-2xl font-bold text-white">{selectedChar.name}</h2>
                    <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-400/20 uppercase">
                      {selectedChar.category}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400 font-mono">{selectedChar.sourceSheet}</p>

                  <div className="mt-4 flex flex-wrap gap-4 text-xs">
                    <div className="rounded-lg bg-slate-950/60 px-3 py-1.5 border border-slate-800">
                      <span className="text-slate-400">Frame Size: </span>
                      <span className="font-bold text-slate-200">{selectedChar.frameDimensions.width}×{selectedChar.frameDimensions.height}px</span>
                    </div>
                    <div className="rounded-lg bg-slate-950/60 px-3 py-1.5 border border-slate-800">
                      <span className="text-slate-400">Animations: </span>
                      <span className="font-bold text-slate-200">{Object.keys(selectedChar.animations || {}).length}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Animation Viewer & Controls */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                <h3 className="text-md font-bold text-white mb-4">Sprite Animation Preview</h3>

                {/* Animation Selector Buttons */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {Object.keys(selectedChar.animations || {}).map((animKey) => (
                    <button
                      key={animKey}
                      onClick={() => {
                        setSelectedAnimKey(animKey);
                        setCurrentFrameIdx(0);
                      }}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                        selectedAnimKey === animKey
                          ? "bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20"
                          : "bg-slate-800/60 text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      {animKey}
                    </button>
                  ))}
                </div>

                {/* Animation Canvas Box */}
                {activeAnim && activeAnim.frames.length > 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-950 p-8">
                    <div className="relative h-32 w-32 flex items-center justify-center border border-slate-800/80 rounded-xl bg-slate-900/40 p-4">
                      <img
                        src={activeAnim.frames[currentFrameIdx % activeAnim.frames.length].imagePath}
                        alt={`${activeAnim.name} frame ${currentFrameIdx}`}
                        className="max-h-full max-w-full object-contain pixelated scale-125 transition-transform"
                      />
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="rounded-lg bg-amber-400/10 px-4 py-1.5 text-xs font-bold text-amber-400 border border-amber-400/20 hover:bg-amber-400/20"
                      >
                        {isPlaying ? "⏸️ Pause" : "▶️ Play"}
                      </button>
                      <span className="text-xs text-slate-400">
                        Frame <span className="font-mono text-white">{currentFrameIdx + 1}</span> of <span className="font-mono text-white">{activeAnim.frames.length}</span> ({activeAnim.fps} FPS)
                      </span>
                    </div>

                    {/* Frame Strips */}
                    <div className="mt-6 flex flex-wrap gap-2 justify-center border-t border-slate-800/80 pt-4 w-full">
                      {activeAnim.frames.map((frame, fIdx) => (
                        <div
                          key={fIdx}
                          onClick={() => {
                            setIsPlaying(false);
                            setCurrentFrameIdx(fIdx);
                          }}
                          className={`h-12 w-12 cursor-pointer rounded-lg border p-1 transition-all flex items-center justify-center ${
                            currentFrameIdx === fIdx
                              ? "border-amber-400 bg-amber-400/10"
                              : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
                          }`}
                        >
                          <img src={frame.imagePath} alt={`frame ${fIdx}`} className="max-h-full max-w-full object-contain pixelated" />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">No frames in this animation sequence.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* WORLD & MAPS TAB */}
        {activeTab === "world" && (
          <div className="space-y-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {["all", "maps", "buildings", "vegetation", "terrain", "interiors", "decorations"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedWorldCategory(cat)}
                  className={`rounded-lg px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                    selectedWorldCategory === cat
                      ? "bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredWorld.map((world) => (
                <div
                  key={world.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 w-full rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-2">
                      <img src={world.processedPath} alt={world.name} className="max-h-full max-w-full object-contain pixelated" />
                    </div>
                    <div className="mt-3">
                      <h4 className="text-base font-bold text-white">{world.name}</h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{world.originalPath}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs">
                    <span className="rounded bg-sky-500/10 px-2 py-0.5 text-sky-400 border border-sky-500/20 uppercase font-semibold">
                      {world.category}
                    </span>
                    <span className="text-slate-300 font-mono">{world.dimensions.width}×{world.dimensions.height}px</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TILESETS TAB */}
        {activeTab === "tilesets" && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {worldAssets.filter((w) => w.isTileset).map((ts) => (
                <button
                  key={ts.id}
                  onClick={() => setSelectedWorldId(ts.id)}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                    selectedWorldId === ts.id
                      ? "bg-emerald-400 text-slate-950 shadow-md shadow-emerald-400/20"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {ts.name} ({ts.tileCount} Tiles)
                </button>
              ))}
            </div>

            {selectedWorld && selectedWorld.isTileset ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedWorld.name} Tileset</h3>
                    <p className="text-xs text-slate-400">Individual 32×32 sliced transparent tile grid</p>
                  </div>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-400/20">
                    {selectedWorld.tileCount} Tiles Total
                  </span>
                </div>

                <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-16 gap-2 max-h-[600px] overflow-y-auto pr-2">
                  {selectedWorld.tiles?.map((tile) => (
                    <div
                      key={tile.id}
                      className="group relative h-10 w-10 bg-slate-950 border border-slate-800 rounded p-1 flex items-center justify-center hover:border-emerald-400 transition-all"
                      title={`Tile #${tile.index} (${tile.bounds.x}, ${tile.bounds.y})`}
                    >
                      <img src={tile.imagePath} alt={tile.id} className="max-h-full max-w-full object-contain pixelated" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-slate-400 text-sm">Select a tileset above to view sliced 32×32 grid tiles.</p>
            )}
          </div>
        )}

        {/* METADATA JSON TAB */}
        {activeTab === "json" && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <h3 className="text-md font-bold text-white mb-3">Live Manifest Metadata (manifest.json)</h3>
            <pre className="h-[600px] overflow-auto rounded-xl bg-slate-950 p-4 text-xs font-mono text-emerald-400 border border-slate-800 selection:bg-emerald-400 selection:text-slate-950">
              {JSON.stringify(manifest, null, 2)}
            </pre>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800 bg-slate-900/50 py-4 px-6 text-center text-xs text-slate-500">
        Pokémon Asset Processing Engine & TypeScript Manager • Next.js App Router
      </footer>
    </div>
  );
}
