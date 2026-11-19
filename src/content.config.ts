import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { contentFile } from './content/loader';

// Content model (issue 1.2, ADR-0005). One source for each fact.
//
// Every item is either pending or complete:
// - pending: `pendente: true` and a `motivo`. Other fields may be present but
//   are not checked. The item is never rendered and is listed in the build's
//   pending report.
// - complete: every required field, nothing unknown. Anything else breaks the
//   build.

const pendente = z.looseObject({
  pendente: z.literal(true),
  motivo: z.string().trim().min(1),
});

const complete = <T extends z.ZodRawShape>(shape: T) =>
  z.strictObject({ pendente: z.literal(false).optional(), ...shape });

const text = z.string().trim().min(1);
const year = z.number().int().min(2000).max(2100);
const order = z.number().int().nonnegative();

// medica: identification and the text "Sobre", written by her.
const medica = defineCollection({
  loader: contentFile('src/content/data/medica.yaml'),
  schema: z.union([
    pendente,
    complete({
      nome: text,
      // CFM: the word MÉDICA, in capitals, and no other title.
      titulo: z.literal('MÉDICA'),
      crm: z.strictObject({
        uf: z.string().regex(/^[A-Z]{2}$/),
        numero: z.string().regex(/^\d+$/),
      }),
      // Paragraphs of "Sobre", published without a change of meaning.
      sobre: z.array(text).min(1),
    }),
  ]),
});

// formacao: the degree and the postgraduate courses (Art. 13).
const formacao = defineCollection({
  loader: contentFile('src/content/data/formacao.yaml'),
  schema: z.union([
    pendente,
    complete({
      tipo: z.literal('graduacao'),
      ordem: order,
      curso: text,
      instituicao: text,
      ano: year,
    }),
    complete({
      tipo: z.literal('pos-graduacao'),
      ordem: order,
      // Official course name, as the institution writes it.
      nomeOficial: text,
      // Area written in "MÉDICA com pós-graduação em (área)".
      area: text,
      instituicao: text,
      // A course in progress is shown "(em curso)" (Art. 11, XVI).
      emCurso: z.boolean(),
    }),
  ]),
});

// atuacao: approved role lines (cfm.md → C). `desde` renders ", desde <ano>".
const atuacao = defineCollection({
  loader: contentFile('src/content/data/atuacao.yaml'),
  schema: z.union([
    pendente,
    complete({
      grupo: z.enum(['local', 'experiencia']),
      ordem: order,
      texto: text,
      desde: year.optional(),
    }),
  ]),
});

// contato: the public channels (ADR-0007). The e-mail is the only one.
const contato = defineCollection({
  loader: contentFile('src/content/data/contato.yaml'),
  schema: z.union([
    pendente,
    complete({ tipo: z.literal('email'), ordem: order, valor: z.email() }),
    complete({
      tipo: z.literal('whatsapp'),
      ordem: order,
      // E.164, Brazil: +55, area code, number.
      valor: z.string().regex(/^\+55\d{10,11}$/),
    }),
    complete({
      tipo: z.literal('instagram'),
      ordem: order,
      valor: z.url({ protocol: /^https$/, hostname: /^www\.instagram\.com$/ }),
    }),
  ]),
});

// paginas: the privacy and legal notice pages (issue 5.1). The entry id is the
// URL path ("privacidade" → /privacidade/). Each section is plain paragraphs;
// `links` are external pages it cites (each must answer 200); `email: true`
// and `identificacao: true` add the public e-mail and the identity line from
// their own collections, so neither fact is typed twice.
const paginas = defineCollection({
  loader: contentFile('src/content/data/paginas.yaml'),
  schema: z.union([
    pendente,
    complete({
      ordem: order,
      titulo: text,
      // Date of the text's last review, shown on the page.
      revisao: z.iso.date(),
      secoes: z
        .array(
          z.strictObject({
            titulo: text,
            paragrafos: z.array(text).min(1),
            links: z
              .array(z.strictObject({ texto: text, url: z.url({ protocol: /^https$/ }) }))
              .optional(),
            email: z.literal(true).optional(),
            // Adds the identity line from `medica` (name · MÉDICA · CRM).
            identificacao: z.literal(true).optional(),
          }),
        )
        .min(1),
    }),
  ]),
});

export const collections = { medica, formacao, atuacao, contato, paginas };
