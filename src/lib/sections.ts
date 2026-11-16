// The page's sections, in the order fixed by the brief (ROADMAP.md → Design
// brief). One list feeds both the anchor navigation and the section ids, so an
// id cannot be typed twice. Names: PRODUCT.md → Terminology.
export const sections = [
  { id: 'formacao', titulo: 'Formação' },
  { id: 'atuacao', titulo: 'Atuação' },
  { id: 'sobre', titulo: 'Sobre' },
  { id: 'contato', titulo: 'Contato' },
] as const;

export type Section = (typeof sections)[number];
export type SectionId = Section['id'];

export const section = (id: SectionId): Section => sections.find((s) => s.id === id)!;
