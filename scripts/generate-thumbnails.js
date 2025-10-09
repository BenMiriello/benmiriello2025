import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const THUMBNAIL_WIDTH = 400;
const BASE_DIR = path.join(__dirname, '../public/photos');

function printUsage() {
  console.log(`
Usage: node generate-thumbnails.js [options]

Options:
  --album <name>    Process specific album (e.g., --album alps)
  --overwrite       Overwrite existing thumbnails (default: skip existing)
  --help            Show this help message

Examples:
  node generate-thumbnails.js                    # Process all albums
  node generate-thumbnails.js --album rome       # Process only 'rome' album
  node generate-thumbnails.js --overwrite        # Regenerate all thumbnails
  node generate-thumbnails.js --album alps --overwrite
`);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const config = {
    album: null,
    overwrite: false,
    help: false
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--album' && args[i + 1]) {
      config.album = args[i + 1];
      i++;
    } else if (args[i] === '--overwrite') {
      config.overwrite = true;
    } else if (args[i] === '--help' || args[i] === '-h') {
      config.help = true;
    }
  }

  return config;
}

function getAlbums(albumName) {
  if (albumName) {
    const albumPath = path.join(BASE_DIR, albumName);
    if (!fs.existsSync(albumPath)) {
      console.error(`Error: Album '${albumName}' not found in ${BASE_DIR}`);
      process.exit(1);
    }
    return [albumName];
  }

  return fs.readdirSync(BASE_DIR).filter(dir => {
    const stat = fs.statSync(path.join(BASE_DIR, dir));
    return stat.isDirectory() && !dir.startsWith('.');
  });
}

async function processAlbum(album, overwrite) {
  const photoDir = path.join(BASE_DIR, album);
  const originalsDir = path.join(photoDir, 'originals');
  const thumbnailDir = path.join(photoDir, 'thumbnails');

  if (!fs.existsSync(originalsDir)) {
    console.log(`⚠ Skipping ${album} - no originals folder found`);
    return;
  }

  if (!fs.existsSync(thumbnailDir)) {
    fs.mkdirSync(thumbnailDir, { recursive: true });
  }

  if (overwrite) {
    const existingFiles = fs.readdirSync(thumbnailDir);
    for (const file of existingFiles) {
      fs.unlinkSync(path.join(thumbnailDir, file));
    }
    if (existingFiles.length > 0) {
      console.log(`  Cleared ${existingFiles.length} existing thumbnails`);
    }
  }

  const files = fs.readdirSync(originalsDir).filter(file =>
    /\.(jpg|jpeg|png)$/i.test(file) && !file.startsWith('.')
  );

  console.log(`\n📁 ${album}: Processing ${files.length} images...`);

  for (const file of files) {
    const inputPath = path.join(originalsDir, file);
    const outputPath = path.join(thumbnailDir, file);

    if (!overwrite && fs.existsSync(outputPath)) {
      console.log(`  ⊘ ${file} (skipped - already exists)`);
      continue;
    }

    try {
      await sharp(inputPath)
        .rotate()
        .resize(THUMBNAIL_WIDTH, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: 85 })
        .toFile(outputPath);

      console.log(`  ✓ ${file}`);
    } catch (error) {
      console.error(`  ✗ ${file}: ${error.message}`);
    }
  }
}

async function main() {
  const config = parseArgs();

  if (config.help) {
    printUsage();
    process.exit(0);
  }

  const albums = getAlbums(config.album);

  console.log('🖼️  Thumbnail Generator');
  console.log(`Mode: ${config.overwrite ? 'Overwrite' : 'Skip existing'}`);
  console.log(`Albums: ${albums.join(', ')}`);

  for (const album of albums) {
    await processAlbum(album, config.overwrite);
  }

  console.log('\n✅ Done!');
}

main().catch(console.error);
