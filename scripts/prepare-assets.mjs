// Prepares the private assets for the build (issue 1.4, ADR-0010).
//
// Reads the checkout of dra-victoria-laufer-assets in .assets/ (the deploy
// workflow fetches it with a read-only deploy key) and writes the crops the
// page uses to src/assets/generated/, which is ignored by git. Astro then
// encodes, resizes and fingerprints them.
//
// Without .assets/ (local build without access, fork) it writes nothing: the
// page renders the neutral placeholder and keeps the empty inline favicon.
//
// Usage: node scripts/prepare-assets.mjs   (ASSETS_DIR overrides .assets)

import { existsSync } from 'node:fs';
import { mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const SRC = process.env.ASSETS_DIR || '.assets';
const OUT = 'src/assets/generated';

// The original is 2000 x 1333, landscape, with the subject left of centre and
// wide margins of wall, sofa and a laptop. In a one-column page that frame
// leaves her face a few dozen pixels tall on a phone. 4:5 crop on the subject,
// head room kept, laptop out of frame.
const PORTRAIT = {
  file: 'photos/portrait-main.jpg',
  crop: { left: 470, top: 60, width: 880, height: 1100 },
};

// The monogram fills about 60% of its 2000 x 2000 canvas. Cropped to the ring
// so it is legible at 16 and 32 px. Cropped only: never recoloured (DESIGN.md).
const SYMBOL = {
  file: 'brand/symbol/simbolo-cor.png',
  crop: { left: 380, top: 380, width: 1240, height: 1240 },
};

// Open Graph image (issue 1.6): the colour horizontal logo on white
// (DESIGN.md), 1200 x 630, the size social networks crop to. Scaled, never
// recoloured. Its final composition is issue 2.4.
const SOCIAL = {
  file: 'brand/logo/logo-horizontal-cor.png',
  size: { width: 1200, height: 630 },
  logoWidth: 900,
};

await rm(OUT, { recursive: true, force: true });

const portraitSrc = join(SRC, PORTRAIT.file);
const symbolSrc = join(SRC, SYMBOL.file);
const socialSrc = join(SRC, SOCIAL.file);
if (!existsSync(portraitSrc) && !existsSync(symbolSrc) && !existsSync(socialSrc)) {
  console.log(`[assets] ${SRC}/ not found: building with the neutral placeholder, no favicon and no Open Graph image.`);
  process.exit(0);
}

await mkdir(OUT, { recursive: true });

if (existsSync(portraitSrc)) {
  await sharp(portraitSrc)
    .extract(PORTRAIT.crop)
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(join(OUT, 'portrait.jpg'));
  console.log('[assets] portrait.jpg');
} else {
  console.log(`[assets] ${PORTRAIT.file} not found: neutral placeholder.`);
}

if (existsSync(symbolSrc)) {
  const ring = sharp(symbolSrc).extract(SYMBOL.crop).resize(512);
  // Transparent for the browser tab; white ground for the home-screen icon,
  // which iOS would otherwise fill with black.
  await ring.clone().png().toFile(join(OUT, 'icon.png'));
  await ring
    .clone()
    .resize(440)
    .extend({ top: 36, bottom: 36, left: 36, right: 36, background: '#ffffff' })
    .flatten({ background: '#ffffff' })
    .png()
    .toFile(join(OUT, 'icon-touch.png'));
  console.log('[assets] icon.png, icon-touch.png');
} else {
  console.log(`[assets] ${SYMBOL.file} not found: no favicon.`);
}

if (existsSync(socialSrc)) {
  const logo = await sharp(socialSrc).resize({ width: SOCIAL.logoWidth }).png().toBuffer();
  await sharp({
    create: { ...SOCIAL.size, channels: 3, background: '#ffffff' },
  })
    .composite([{ input: logo, gravity: 'center' }])
    .png()
    .toFile(join(OUT, 'social.png'));
  console.log('[assets] social.png');
} else {
  console.log(`[assets] ${SOCIAL.file} not found: no Open Graph image.`);
}
