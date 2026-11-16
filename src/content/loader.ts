import { file } from 'astro/loaders';
import type { Loader, LoaderContext } from 'astro/loaders';

// Wraps Astro's file() loader for the content collections (ADR-0005).
//
// 1. file() only logs a missing or unreadable file and keeps the data cached
//    from the last build. Here any error it logs stops the build, so a broken
//    data file can never publish stale or partial facts.
// 2. After loading, it prints the pending report: every item marked
//    `pendente`, with its reason. The report goes to the build log only;
//    nothing pending reaches dist/.
export function contentFile(fileName: string): Loader {
  const inner = file(fileName);
  return {
    name: 'content-file',
    load: async (context: LoaderContext) => {
      const { logger, collection, store } = context;
      const errors: string[] = [];
      const strictLogger = {
        ...logger,
        info: (m: string) => logger.info(m),
        warn: (m: string) => logger.warn(m),
        error: (m: string) => {
          errors.push(m);
          logger.error(m);
        },
        // file() logs the parser's message at debug level right after the error.
        debug: (m: string) => {
          if (errors.length > 0) errors.push(m);
          logger.debug(m);
        },
      } as LoaderContext['logger'];

      await inner.load({ ...context, logger: strictLogger });

      if (errors.length > 0) {
        throw new Error(`Content collection "${collection}" (${fileName}): ${errors.join(' — ')}`);
      }

      const entries = store.values();
      const pending = entries.filter((entry) => entry.data.pendente === true);
      for (const entry of pending) {
        logger.warn(`[pendente] ${collection}/${entry.id}: ${String(entry.data.motivo)}`);
      }
      logger.info(`${collection}: ${entries.length} item(s), ${pending.length} pendente(s)`);
    },
  };
}
