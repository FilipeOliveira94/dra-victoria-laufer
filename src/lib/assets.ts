import type { ImageMetadata } from 'astro';

// Crops written by scripts/prepare-assets.mjs from the private assets
// repository (ADR-0010). A glob, not an import: without the assets the files do
// not exist and the build still completes, with the placeholder and no favicon.
const generated = import.meta.glob<ImageMetadata>('../assets/generated/*.{jpg,png}', {
  eager: true,
  import: 'default',
});

const pick = (name: string): ImageMetadata | undefined => generated[`../assets/generated/${name}`];

export const portrait = pick('portrait.jpg');
export const icon = pick('icon.png');
export const iconTouch = pick('icon-touch.png');
export const social = pick('social.png');
// Horizontal logos, name centred on the monogram (issue 2.1).
export const logoColour = pick('logo-cor.png');
export const logoWhite = pick('logo-branco.png');
