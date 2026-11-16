// The page's sections, in the order fixed by the brief (ROADMAP.md → Design
// brief). One list feeds both the anchor navigation and the section ids, so an
// id cannot be typed twice. Names: PRODUCT.md → Terminology.
// `fundo` is the section ground (DESIGN.md → Sections; issue 2.1): light grounds
// only, white and verde-claro alternating, Sobre on lilás-claro (Filipe,
// 2026-11-16). Fixed per section, so a missing section never shifts the others.
export const sections = [
  { id: 'formacao', titulo: 'Formação', fundo: 'alt' },
  { id: 'atuacao', titulo: 'Atuação', fundo: 'default' },
  { id: 'sobre', titulo: 'Sobre', fundo: 'sobre' },
  { id: 'contato', titulo: 'Contato', fundo: 'alt' },
] as const;

export type Section = (typeof sections)[number];
export type SectionId = Section['id'];

export const section = (id: SectionId): Section => sections.find((s) => s.id === id)!;
