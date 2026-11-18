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
// leaves her face a few dozen pixels tall on a phone. 3:4 crop on head and
// shoulders for the arch frame (DESIGN.md → Portrait, issue 2.2), head room kept,
// laptop and hands out of frame.
const PORTRAIT = {
  file: 'photos/portrait-main.jpg',
  crop: { left: 610, top: 70, width: 570, height: 760 },
};

// The cut-out (issue 2.5, DESIGN.md → Portrait treatment): the same photo with
// its background removed once, outside the site, on the original's 2000 x 1333
// canvas. Cropped from the waist up, 20 px of head room: the arch cuts it at the
// bottom; her head rises above the arch. Without it the page uses the arch crop.
const CUTOUT = {
  file: 'photos/portrait-cutout.png',
  crop: { left: 492, top: 110, width: 760, height: 900 },
};

// The monogram fills about 60% of its 2000 x 2000 canvas. Cropped to the ring
// so it is legible at 16 and 32 px. Cropped only: never recoloured (DESIGN.md).
const SYMBOL = {
  file: 'brand/symbol/simbolo-cor.png',
  crop: { left: 380, top: 380, width: 1240, height: 1240 },
};

// Horizontal logos (issue 2.1): colour for the header, white for the footer
// (DESIGN.md → Logo). In the originals the written name sits about 50 px above
// the monogram's vertical centre; at Filipe's request (2026-11-16) the name is
// moved down so both share one centre line. Moved only: never recoloured,
// stretched or redrawn. Then trimmed, so the page sets the spacing.
const LOGOS = [
  { file: 'brand/logo/logo-horizontal-cor.png', out: 'logo-cor.png' },
  { file: 'brand/logo/logo-horizontal-branco.png', out: 'logo-branco.png' },
];

// Open Graph image (issues 1.6 and 2.1): the centred colour logo on white, a
// verde-marca field along the bottom and an ouro hairline above it
// (DESIGN.md). No text in the image. 1200 x 630, the size social networks crop to.
const SOCIAL = {
  size: { width: 1200, height: 630 },
  logoWidth: 860,
  band: 96,
  hairline: 4,
  white: '#FFFFFF',
  verdeMarca: '#3EB7AE',
  ouro: '#A47B1C',
};

// Rows [top, bottom] holding visible pixels between columns x0 and x1.
function rowsWithInk({ data, info }, x0, x1) {
  let top = info.height;
  let bottom = -1;
  for (let y = 0; y < info.height; y++) {
    for (let x = x0; x < x1; x++) {
      if (data[(y * info.width + x) * 4 + 3] > 16) {
        top = Math.min(top, y);
        bottom = y;
        break;
      }
    }
  }
  return [top, bottom];
}

// The monogram and the name are separated by the first run of at least 20
// empty columns. Returns the logo with the name centred on the monogram.
async function centredLogo(file) {
  const raw = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = raw.info;
  const empty = (x) => {
    for (let y = 0; y < height; y++) if (raw.data[(y * width + x) * 4 + 3] > 16) return false;
    return true;
  };
  let split = -1;
  for (let x = 1, run = 0, seenInk = false; x < width; x++) {
    if (!empty(x)) {
      seenInk = true;
      run = 0;
    } else if (seenInk && ++run === 20) {
      split = x;
      break;
    }
  }
  if (split < 0) throw new Error(`${file}: no gap between monogram and name.`);
  const [mTop, mBottom] = rowsWithInk(raw, 0, split);
  const [nTop, nBottom] = rowsWithInk(raw, split, width);
  const shift = Math.round((mTop + mBottom) / 2 - (nTop + nBottom) / 2);
  const input = { raw: { width, height, channels: 4 } };
  const monogram = await sharp(raw.data, input).extract({ left: 0, top: 0, width: split, height }).png().toBuffer();
  const name = await sharp(raw.data, input)
    .extract({ left: split, top: nTop, width: width - split, height: nBottom - nTop + 1 })
    .png()
    .toBuffer();
  return sharp({ create: { width, height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([
      { input: monogram, left: 0, top: 0 },
      { input: name, left: split, top: nTop + shift },
    ])
    .png()
    .toBuffer()
    .then((buffer) => sharp(buffer).trim({ threshold: 1 }).png().toBuffer());
}

await rm(OUT, { recursive: true, force: true });

const portraitSrc = join(SRC, PORTRAIT.file);
const symbolSrc = join(SRC, SYMBOL.file);
if (!existsSync(portraitSrc) && !existsSync(symbolSrc) && !LOGOS.some((l) => existsSync(join(SRC, l.file)))) {
  console.log(`[assets] ${SRC}/ not found: building with the neutral placeholder, no favicon, no logo and no Open Graph image.`);
  process.exit(0);
}

await mkdir(OUT, { recursive: true });

// The cut-out wins; the arch crop is written only without it, so dist/ never
// carries an unused copy of the photo.
const cutoutSrc = join(SRC, CUTOUT.file);
if (existsSync(cutoutSrc)) {
  await sharp(cutoutSrc).extract(CUTOUT.crop).png().toFile(join(OUT, 'portrait-cutout.png'));
  console.log('[assets] portrait-cutout.png');
} else if (existsSync(portraitSrc)) {
  console.log(`[assets] ${CUTOUT.file} not found: the portrait keeps the arch crop.`);
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

const logos = {};
for (const { file, out } of LOGOS) {
  const src = join(SRC, file);
  if (!existsSync(src)) {
    console.log(`[assets] ${file} not found: no logo.`);
    continue;
  }
  logos[out] = await centredLogo(src);
  await sharp(logos[out]).toFile(join(OUT, out));
  console.log(`[assets] ${out}`);
}

if (logos['logo-cor.png']) {
  const { width, height, band, hairline, logoWidth } = { ...SOCIAL.size, ...SOCIAL };
  const logo = await sharp(logos['logo-cor.png']).resize({ width: logoWidth }).png().toBuffer();
  const { height: logoHeight } = await sharp(logo).metadata();
  const field = height - band - hairline;
  const solid = (w, h, colour) => ({ create: { width: w, height: h, channels: 3, background: colour } });
  await sharp(solid(width, height, SOCIAL.white))
    .composite([
      { input: logo, left: Math.round((width - logoWidth) / 2), top: Math.round((field - logoHeight) / 2) },
      { input: await sharp(solid(width, hairline, SOCIAL.ouro)).png().toBuffer(), left: 0, top: field },
      { input: await sharp(solid(width, band, SOCIAL.verdeMarca)).png().toBuffer(), left: 0, top: field + hairline },
    ])
    .png()
    .toFile(join(OUT, 'social.png'));
  console.log('[assets] social.png');
} else {
  console.log('[assets] no colour logo: no Open Graph image.');
}
