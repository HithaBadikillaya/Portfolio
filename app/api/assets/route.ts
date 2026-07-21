import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const charId = searchParams.get("character");
    const worldId = searchParams.get("world");

    const processedDir = path.join(process.cwd(), "public", "processed");
    const manifestPath = path.join(processedDir, "manifest.json");

    if (!fs.existsSync(manifestPath)) {
      return NextResponse.json(
        { error: "Manifest not generated yet. Please run `npm run process-assets`." },
        { status: 404 }
      );
    }

    const manifestData = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

    if (charId) {
      const charMeta = manifestData.characters?.[charId];
      if (!charMeta) {
        return NextResponse.json({ error: `Character ${charId} not found` }, { status: 404 });
      }
      return NextResponse.json(charMeta);
    }

    if (worldId) {
      const worldMeta = manifestData.world?.[worldId];
      if (!worldMeta) {
        return NextResponse.json({ error: `World asset ${worldId} not found` }, { status: 404 });
      }
      return NextResponse.json(worldMeta);
    }

    return NextResponse.json(manifestData);
  } catch (error) {
    console.error("Error in asset API route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
