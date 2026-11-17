import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';

// The only way pages and structured data read the content model (ADR-0005).
// Pending items are dropped here, so they never reach the HTML or the JSON-LD.

type Data<C extends CollectionKey> = CollectionEntry<C>['data'];
export type Published<C extends CollectionKey> = Exclude<Data<C>, { pendente: true }>;

const isPublished = <C extends CollectionKey>(data: Data<C>): data is Published<C> =>
  data.pendente !== true;

const rank = (data: object) => ('ordem' in data && typeof data.ordem === 'number' ? data.ordem : 0);
const byOrder = (a: object, b: object) => rank(a) - rank(b);

/** Published items of a collection, in `ordem`. */
export async function published<C extends CollectionKey>(collection: C): Promise<Published<C>[]> {
  const entries = await getCollection(collection);
  return entries
    .map((entry) => entry.data as Data<C>)
    .filter(isPublished)
    .sort(byOrder);
}

/** The identification entry, or undefined while it is pending. */
export async function medica(): Promise<Published<'medica'> | undefined> {
  const [entry] = await published('medica');
  return entry;
}

/** "CRM-SP 240550" */
export const crmLabel = ({ crm }: Published<'medica'>) => `CRM-${crm.uf} ${crm.numero}`;

/** "MÉDICA · CRM-SP 240550": the identity line (DESIGN.md → Label). */
export const identityLine = (id: Published<'medica'>) => `${id.titulo} · ${crmLabel(id)}`;

type Channel = Published<'contato'>;

// Channel names, shown in `title` above each address (DESIGN.md → Links).
export const channelLabel: Record<Channel['tipo'], string> = {
  email: 'E-mail',
  whatsapp: 'WhatsApp',
  instagram: 'Instagram',
};

/**
 * A contact channel as a plain link: the address is the link text. No
 * pre-filled message or invitation to schedule (issue 6.1, behind captacao).
 */
export function channelLink(c: Channel): { href: string; text: string } {
  switch (c.tipo) {
    case 'email':
      return { href: `mailto:${c.valor}`, text: c.valor };
    case 'whatsapp': {
      // "+5512987097380" → "+55 12 98709-7380" (Filipe, 2026-11-16).
      const [, area, head, tail] = c.valor.match(/^\+55(\d{2})(\d{4,5})(\d{4})$/)!;
      return { href: `https://wa.me/${c.valor.slice(1)}`, text: `+55 ${area} ${head}-${tail}` };
    }
    case 'instagram': {
      const handle = new URL(c.valor).pathname.replaceAll('/', '');
      return { href: c.valor, text: `@${handle}` };
    }
  }
}
