import { execSync } from "child_process";
import path from "path";

async function runAssetPipeline() {
  console.log("🚀 Starting Pokémon Asset Pipeline (TypeScript Automation)...");
  try {
    const scriptPath = path.resolve(__dirname, "asset_processor.py");
    execSync(`python3 "${scriptPath}"`, { stdio: "inherit" });
    console.log("✅ Asset pipeline completed successfully!");
  } catch (error) {
    console.error("❌ Error running asset pipeline:", error);
    process.exit(1);
  }
}

runAssetPipeline();
