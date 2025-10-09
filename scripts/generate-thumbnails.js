import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const THUMBNAIL_WIDTH = 400;
const PHOTO_DIRS = ['alps', 'desert', 'rome'];
const BASE_DIR = path.join(__dirname, '../public/photos');
const OVERWRITE = process.argv.includes('--overwrite');

async function generateThumbnails() {
  for (const dir of PHOTO_DIRS) {
    const photoDir = path.join(BASE_DIR, dir);
    const originalsDir = path.join(photoDir, 'originals');
    const thumbnailDir = path.join(photoDir, 'thumbnails');

    if (!fs.existsSync(originalsDir)) {
      console.log(`Skipping ${dir} - no originals folder found`);
      continue;
    }

    if (!fs.existsSync(thumbnailDir)) {
      fs.mkdirSync(thumbnailDir, { recursive: true });
    }

    if (OVERWRITE) {
      const existingFiles = fs.readdirSync(thumbnailDir);
      for (const file of existingFiles) {
        fs.unlinkSync(path.join(thumbnailDir, file));
      }
      console.log(`Cleared ${existingFiles.length} existing thumbnails in ${dir}`);
    }

    const files = fs.readdirSync(originalsDir).filter(file =>
      /\.(jpg|jpeg|png)$/i.test(file) && !file.startsWith('.')
    );

    console.log(`Processing ${files.length} images in ${dir}...`);

    for (const file of files) {
      const inputPath = path.join(originalsDir, file);
      const outputPath = path.join(thumbnailDir, file);

      if (!OVERWRITE && fs.existsSync(outputPath)) {
        console.log(`  - ${file} (already exists, skipping)`);
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

  console.log('Done!');
}

generateThumbnails().catch(console.error);
