// Acquisition features (Phase 6), off by default (ADR-0005, ADR-0007).
// Off means the block produces no HTML and no JSON-LD. Turning one on is an
// issue of its own, with the CFM checklist and her approval.
export const captacao = {
  // Invitation to schedule (issue 6.1).
  cta: false,
  // Care modality (issue 6.2).
  atendimento: false,
} as const satisfies Record<string, boolean>;
