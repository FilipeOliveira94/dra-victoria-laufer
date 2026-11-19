import { getImage } from 'astro:assets';
import { portrait, portraitCutout } from './assets';
import { courseLine, crmLabel, medica, NOT_SPECIALIST, published } from './content';

// schema.org Person for the home page (issue 4.1, ADR-0009). Built only from
// published items of the content model, so a pending item never reaches it.
// Never `medicalSpecialty`, never `Physician` (that waits for issue 6.2).

// "Dra. Victória Laufer" → prefix "Dra.", name "Victória Laufer" (Filipe).
function splitName(nome: string): { name: string; honorificPrefix?: string } {
  const m = nome.match(/^(Dra?\.)\s+(.+)$/);
  return m ? { honorificPrefix: m[1], name: m[2] } : { name: nome };
}

const school = (name: string) => ({ '@type': 'CollegeOrUniversity', name });

/** The Person object, or undefined while the identification is pending. */
export async function person(site: URL): Promise<Record<string, unknown> | undefined> {
  const id = await medica();
  if (!id) return undefined;

  // Training: the degree, and each finished postgraduate course in the Art. 13
  // line, NÃO ESPECIALISTA included (docs/compliance/cfm.md → B). A course in
  // progress is not a credential yet: it enters by itself once `emCurso` is
  // false in formacao.yaml (Neonatologia, Filipe 2026-11-18).
  const credentials = (await published('formacao'))
    .filter((c) => c.tipo === 'graduacao' || !c.emCurso)
    .map((c) =>
      c.tipo === 'graduacao'
        ? {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'Graduação',
            name: c.curso,
            recognizedBy: school(c.instituicao),
          }
        : {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'Pós-graduação',
            name: `${courseLine(c)} ${NOT_SPECIALIST}`,
            recognizedBy: school(c.instituicao),
          },
    );

  const instagram = (await published('contato')).find((c) => c.tipo === 'instagram');

  // Her photo, as on the page; without the private assets, no image.
  const photo = portraitCutout ?? portrait;
  const image = photo && (await getImage({ src: photo, format: 'webp', width: Math.min(760, photo.width) }));

  const url = new URL(import.meta.env.BASE_URL, site).href;
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${url}#pessoa`,
    ...splitName(id.nome),
    jobTitle: 'Médica',
    identifier: {
      '@type': 'PropertyValue',
      propertyID: `CRM-${id.crm.uf}`,
      value: id.crm.numero,
      name: crmLabel(id),
    },
    ...(credentials.length > 0 && { hasCredential: credentials }),
    ...(image && { image: new URL(image.src, site).href }),
    url,
    ...(instagram && { sameAs: [instagram.valor] }),
  };
}

/** JSON for a <script type="application/ld+json">: no "<" can close the tag. */
export const jsonLd = (data: object) => JSON.stringify(data).replace(/</g, '\\u003c');
