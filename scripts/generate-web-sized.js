import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WEB_MAX_WIDTH = 1920;
const PHOTO_DIRS = ['alps', 'desert', 'rome'];
const BASE_DIR = path.join(__dirname, '../public/photos');
const OVERWRITE = process.argv.includes('--overwrite');

async function generateWebSized() {
  for (const dir of PHOTO_DIRS) {
    const photoDir = path.join(BASE_DIR, dir);
    const originalsDir = path.join(photoDir, 'originals');
    const largeDir = path.join(photoDir, 'large');

    if (!fs.existsSync(originalsDir)) {
      console.log(`Skipping ${dir} - no originals folder found`);
      continue;
    }

    if (!fs.existsSync(largeDir)) {
      fs.mkdirSync(largeDir, { recursive: true });
    }

    if (OVERWRITE) {
      const existingFiles = fs.readdirSync(largeDir);
      for (const file of existingFiles) {
        fs.unlinkSync(path.join(largeDir, file));
      }
      console.log(`Cleared ${existingFiles.length} existing large images in ${dir}`);
    }

    const files = fs.readdirSync(originalsDir).filter(file =>
      /\.(jpg|jpeg|png)$/i.test(file) && !file.startsWith('.')
    );

    console.log(`Processing ${files.length} images in ${dir}...`);

    for (const file of files) {
      const inputPath = path.join(originalsDir, file);
      const outputPath = path.join(largeDir, file);

      if (!OVERWRITE && fs.existsSync(outputPath)) {
        console.log(`  - ${file} (already exists, skipping)`);
        continue;
      }

      try {
        await sharp(inputPath)
          .rotate()
          .resize(WEB_MAX_WIDTH, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .jpeg({ quality: 90 })
          .toFile(outputPath);

        console.log(`  ✓ ${file}`);
      } catch (error) {
        console.error(`  ✗ ${file}: ${error.message}`);
      }
    }
  }

  console.log('Done!');
}

generateWebSized().catch(console.error);
