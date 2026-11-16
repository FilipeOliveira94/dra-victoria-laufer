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
