import os
import json
import glob
from PIL import Image

ASSETS_DIR = "public/assets"
PROCESSED_DIR = "public/processed"

def remove_background(img, bg_threshold=235):
    """
    Remove white/near-white background around sprites using flood fill from borders.
    Preserves all artwork pixels without modifying colors, blur, or resize.
    """
    rgba = img.convert("RGBA")
    w, h = rgba.size
    pixels = rgba.load()

    # Mask of pixels to make transparent
    transparent_mask = [[False] * h for _ in range(w)]

    # Flood fill starting from edge pixels
    visited = [[False] * h for _ in range(w)]
    queue = []

    for x in range(w):
        queue.append((x, 0))
        queue.append((x, h - 1))
    for y in range(h):
        queue.append((0, y))
        queue.append((w - 1, y))

    head = 0
    while head < len(queue):
        cx, cy = queue[head]
        head += 1
        if cx < 0 or cx >= w or cy < 0 or cy >= h:
            continue
        if visited[cx][cy]:
            continue
        visited[cx][cy] = True

        r, g, b, a = pixels[cx, cy]
        # Check if white/near-white or already transparent
        if a < 10 or (r >= bg_threshold and g >= bg_threshold and b >= bg_threshold):
            transparent_mask[cx][cy] = True
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = cx + dx, cy + dy
                if 0 <= nx < w and 0 <= ny < h and not visited[nx][ny]:
                    queue.append((nx, ny))

    # Apply transparent mask
    out_img = Image.new("RGBA", (w, h))
    out_pixels = out_img.load()

    for x in range(w):
        for y in range(h):
            if transparent_mask[x][y]:
                out_pixels[x, y] = (0, 0, 0, 0)
            else:
                out_pixels[x, y] = pixels[x, y]

    return out_img, transparent_mask

def find_foreground_components(out_img, transparent_mask, min_size=8):
    """
    Find connected non-transparent component bounding boxes.
    """
    w, h = out_img.size
    fg_visited = [[False] * h for _ in range(w)]
    boxes = []

    for x in range(w):
        for y in range(h):
            if not transparent_mask[x][y] and not fg_visited[x][y]:
                min_x, max_x = x, x
                min_y, max_y = y, y
                q = [(x, y)]
                fg_visited[x][y] = True
                head = 0
                count = 0
                while head < len(q):
                    cx, cy = q[head]
                    head += 1
                    count += 1
                    min_x = min(min_x, cx)
                    max_x = max(max_x, cx)
                    min_y = min(min_y, cy)
                    max_y = max(max_y, cy)
                    for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1)]:
                        nx, ny = cx + dx, cy + dy
                        if 0 <= nx < w and 0 <= ny < h and not transparent_mask[nx][ny] and not fg_visited[nx][ny]:
                            fg_visited[nx][ny] = True
                            q.append((nx, ny))
                
                bw = max_x - min_x + 1
                bh = max_y - min_y + 1
                if bw >= min_size and bh >= min_size:
                    boxes.append({
                        "x": min_x,
                        "y": min_y,
                        "width": bw,
                        "height": bh,
                        "pixel_count": count
                    })

    # Sort top to bottom, left to right
    boxes.sort(key=lambda b: (b["y"], b["x"]))
    return boxes

def process_character_sheet(char_id, name, category, sheet_path):
    print(f"Processing Character: {char_id} ({name}) from {sheet_path}")
    char_out_dir = os.path.join(PROCESSED_DIR, "characters", char_id)
    frames_dir = os.path.join(char_out_dir, "frames")
    os.makedirs(frames_dir, exist_ok=True)

    img = Image.open(sheet_path)
    out_img, transparent_mask = remove_background(img)

    # Save transparent full sheet
    out_img.save(os.path.join(char_out_dir, "sheet_transparent.png"))

    boxes = find_foreground_components(out_img, transparent_mask)

    # Separate portrait (largest component or top right component) from animation frames
    portrait_box = None
    frame_boxes = []

    if boxes:
        # Find largest box by area
        largest = max(boxes, key=lambda b: b["width"] * b["height"])
        if largest["width"] * largest["height"] > 3000:
            portrait_box = largest
            frame_boxes = [b for b in boxes if b != largest]
        else:
            frame_boxes = boxes

    # Extract portrait if found
    portrait_path = None
    if portrait_box:
        p_img = out_img.crop((portrait_box["x"], portrait_box["y"], 
                                portrait_box["x"] + portrait_box["width"], 
                                portrait_box["y"] + portrait_box["height"]))
        portrait_rel = f"/processed/characters/{char_id}/portrait.png"
        p_img.save(os.path.join(char_out_dir, "portrait.png"))
        portrait_path = portrait_rel

    # Group frame boxes into direction rows
    # Standard grid order: Down (row 0), Left (row 1), Right (row 2), Up (row 3)
    directions = ["down", "left", "right", "up"]
    animations = {}

    # Sort frame boxes by Y then X
    # Group boxes that share similar Y range (within 15px)
    rows = []
    current_row = []
    current_y = None

    for b in sorted(frame_boxes, key=lambda b: (b["y"], b["x"])):
        if current_y is None or abs(b["y"] - current_y) < 15:
            current_row.append(b)
            if current_y is None:
                current_y = b["y"]
        else:
            rows.append(sorted(current_row, key=lambda b: b["x"]))
            current_row = [b]
            current_y = b["y"]
    if current_row:
        rows.append(sorted(current_row, key=lambda b: b["x"]))

    # Slice frames and build metadata
    frame_counter = 0
    max_w, max_h = 0, 0

    for r_idx, row in enumerate(rows):
        dir_name = directions[r_idx % len(directions)]
        anim_walk_key = f"walk-{dir_name}"
        anim_idle_key = f"idle-{dir_name}"

        walk_frames = []
        for c_idx, b in enumerate(row):
            max_w = max(max_w, b["width"])
            max_h = max(max_h, b["height"])

            f_crop = out_img.crop((b["x"], b["y"], b["x"] + b["width"], b["y"] + b["height"]))
            f_filename = f"frame_{frame_counter:03d}.png"
            f_rel_path = f"/processed/characters/{char_id}/frames/{f_filename}"
            f_crop.save(os.path.join(frames_dir, f_filename))

            frame_meta = {
                "frameIndex": c_idx,
                "imagePath": f_rel_path,
                "bounds": {
                    "x": b["x"],
                    "y": b["y"],
                    "width": b["width"],
                    "height": b["height"]
                }
            }
            walk_frames.append(frame_meta)
            frame_counter += 1

        if walk_frames:
            animations[anim_walk_key] = {
                "name": anim_walk_key,
                "direction": dir_name,
                "action": "walk",
                "fps": 6,
                "loop": True,
                "frames": walk_frames
            }
            # Idle is first frame of walk row
            animations[anim_idle_key] = {
                "name": anim_idle_key,
                "direction": dir_name,
                "action": "idle",
                "fps": 1,
                "loop": True,
                "frames": [walk_frames[0]]
            }

    metadata = {
        "id": char_id,
        "name": name,
        "category": category,
        "sourceSheet": sheet_path.replace("\\", "/"),
        "portraitPath": portrait_path,
        "dialoguePortraitPath": portrait_path,
        "frameDimensions": {"width": max_w, "height": max_h},
        "animations": animations
    }

    with open(os.path.join(char_out_dir, "metadata.json"), "w") as f:
        json.dump(metadata, f, indent=2)

    return metadata

def categorize_world_asset(filename):
    fname = filename.lower()
    if "route" in fname or "overall" in fname:
        return "maps", True, False
    elif "building" in fname or "home" in fname:
        return "buildings", False, False
    elif "interior" in fname:
        return "interiors", False, True
    elif "grass" in fname or "nature" in fname:
        return "vegetation", False, True
    elif "cave" in fname or "dry" in fname:
        return "terrain", False, True
    else:
        return "decorations", False, False

def process_world_assets():
    print("Processing World Assets...")
    world_dir = os.path.join(ASSETS_DIR, "ROUTES & MISC")
    if not os.path.exists(world_dir):
        # try lowercase alias
        world_dir = os.path.join(ASSETS_DIR, "routes&misc")
    
    world_metadata_map = {}

    for f in os.listdir(world_dir):
        if not f.lower().endswith((".png", ".jpg", ".jpeg")):
            continue

        src_path = os.path.join(world_dir, f)
        asset_id = os.path.splitext(f)[0].lower().replace(" ", "-").replace("&", "and")
        category, is_map, is_tileset = categorize_world_asset(f)

        cat_out_dir = os.path.join(PROCESSED_DIR, "world", category)
        os.makedirs(cat_out_dir, exist_ok=True)

        img = Image.open(src_path).convert("RGBA")
        w, h = img.size

        # Remove white background if applicable
        out_img, _ = remove_background(img)

        processed_filename = f"{asset_id}.png"
        processed_path_full = os.path.join(cat_out_dir, processed_filename)
        processed_rel_path = f"/processed/world/{category}/{processed_filename}"

        out_img.save(processed_path_full)

        tile_size = {"width": 32, "height": 32}
        tiles = []
        tile_count = 0

        # If tileset (e.g., 768x768 maps or tilesets), slice into individual 32x32 tiles
        if is_tileset or (w >= 256 and h >= 256):
            tiles_dir = os.path.join(cat_out_dir, "tiles", asset_id)
            os.makedirs(tiles_dir, exist_ok=True)

            cols = w // 32
            rows = h // 32
            t_idx = 0

            for r in range(rows):
                for c in range(cols):
                    tx, ty = c * 32, r * 32
                    tile_crop = out_img.crop((tx, ty, tx + 32, ty + 32))
                    
                    # Check if tile has non-transparent pixels
                    bbox = tile_crop.getbbox()
                    is_transparent = bbox is None

                    if not is_transparent:
                        t_filename = f"tile_{t_idx:04d}.png"
                        t_full = os.path.join(tiles_dir, t_filename)
                        tile_crop.save(t_full)
                        tiles.append({
                            "id": f"{asset_id}_tile_{t_idx}",
                            "index": t_idx,
                            "imagePath": f"/processed/world/{category}/tiles/{asset_id}/{t_filename}",
                            "bounds": {"x": tx, "y": ty, "width": 32, "height": 32},
                            "isTransparent": is_transparent
                        })
                    t_idx += 1
            tile_count = len(tiles)

        meta = {
            "id": asset_id,
            "name": f.replace("-", " ").replace("_", " ").title(),
            "category": category,
            "originalPath": src_path.replace("\\", "/"),
            "processedPath": processed_rel_path,
            "dimensions": {"width": w, "height": h},
            "isMap": is_map,
            "isTileset": is_tileset or (w >= 256 and h >= 256),
            "tileSize": tile_size,
            "tileCount": tile_count,
            "tiles": tiles
        }

        world_metadata_map[asset_id] = meta

    return world_metadata_map

def main():
    print("=== STARTING POKÉMON ASSET PIPELINE ===")
    os.makedirs(PROCESSED_DIR, exist_ok=True)

    char_metadata_map = {}

    # 1. Process player characters
    for p_dir in ["player-boy", "player-girl"]:
        p_path = os.path.join(ASSETS_DIR, p_dir)
        if os.path.exists(p_path):
            files = [f for f in os.listdir(p_path) if f.lower().endswith(".png")]
            if files:
                meta = process_character_sheet(p_dir, p_dir.replace("-", " ").title(), "player", os.path.join(p_path, files[0]))
                char_metadata_map[p_dir] = meta

    # 2. Process MC
    mc_path = os.path.join(ASSETS_DIR, "MC")
    if os.path.exists(mc_path):
        files = [f for f in os.listdir(mc_path) if f.lower().endswith(".png")]
        if files:
            char_id = "hitha"
            meta = process_character_sheet(char_id, "Hitha (MC)", "mc", os.path.join(mc_path, files[0]))
            char_metadata_map[char_id] = meta

    # 3. Process Elite 4
    elite_dir = os.path.join(ASSETS_DIR, "ELITE-4")
    if os.path.exists(elite_dir):
        for sub in sorted(os.listdir(elite_dir)):
            sub_path = os.path.join(elite_dir, sub)
            if os.path.isdir(sub_path):
                files = [f for f in os.listdir(sub_path) if f.lower().endswith(".png")]
                if files:
                    meta = process_character_sheet(sub, f"Elite Four ({sub.title()})", "elite4", os.path.join(sub_path, files[0]))
                    char_metadata_map[sub] = meta

    # 4. Process NPCs
    npc_dir = os.path.join(ASSETS_DIR, "NPC")
    if os.path.exists(npc_dir):
        for sub in sorted(os.listdir(npc_dir)):
            sub_path = os.path.join(npc_dir, sub)
            if os.path.isdir(sub_path):
                files = [f for f in os.listdir(sub_path) if f.lower().endswith(".png")]
                if files:
                    meta = process_character_sheet(sub, sub.title(), "npc", os.path.join(sub_path, files[0]))
                    char_metadata_map[sub] = meta

    # 5. Process World Assets
    world_metadata_map = process_world_assets()

    # 6. Generate Global Manifest
    manifest = {
        "generatedAt": "2026-07-22T02:50:00Z",
        "characters": char_metadata_map,
        "world": world_metadata_map,
        "categories": {
            "characters": ["player", "mc", "elite4", "npc"],
            "world": ["maps", "buildings", "vegetation", "terrain", "water", "decorations", "interiors", "animated_objects"]
        }
    }

    manifest_path = os.path.join(PROCESSED_DIR, "manifest.json")
    with open(manifest_path, "w") as f:
        json.dump(manifest, f, indent=2)

    print(f"=== PIPELINE COMPLETE! Generated manifest at {manifest_path} ===")
    print(f"Total Characters Processed: {len(char_metadata_map)}")
    print(f"Total World Assets Processed: {len(world_metadata_map)}")

if __name__ == "__main__":
    main()
