// The page's sections, in the order fixed by the brief (ROADMAP.md → Design
// brief). One list feeds both the anchor navigation and the section ids, so an
// id cannot be typed twice. Names: PRODUCT.md → Terminology.
// `titulo` names the section in the navigation and in the small label above its
// heading; `cabecalho` is the h2 (descriptive titles approved by her, relayed by
// Filipe, 2026-11-17). Sobre has no label: "Sobre mim" already names it.
// `fundo` is the section ground (DESIGN.md → Sections, "Caminho do jardim"):
// white, Sobre in a verde-claro clearing. Fixed per section, so a missing
// section never shifts the others.
export const sections = [
  { id: 'formacao', titulo: 'Formação', cabecalho: 'Graduação e pós-graduações', rotulo: true, fundo: 'default' },
  { id: 'atuacao', titulo: 'Atuação', cabecalho: 'Onde trabalho', rotulo: true, fundo: 'default' },
  { id: 'sobre', titulo: 'Sobre', cabecalho: 'Sobre mim', rotulo: false, fundo: 'clareira' },
  { id: 'contato', titulo: 'Contato', cabecalho: 'Canais de contato', rotulo: true, fundo: 'default' },
] as const;

export type Section = (typeof sections)[number];
export type SectionId = Section['id'];

export const section = (id: SectionId): Section => sections.find((s) => s.id === id)!;
