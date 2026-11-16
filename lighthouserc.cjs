// Lighthouse CI, mobile (Lighthouse's default form factor), on the built
// home page. Thresholds from AGENTS.md §9. Reports stay in .lighthouseci/
// (and in the CI run's artifacts): nothing is uploaded to a third party.
//
// BASE is the base path the site was built for, as in `make requests`:
// "/" for production (default), "/dra-victoria-laufer/" for staging.
// Chrome: CHROME_PATH, else the Chrome installed on the machine.

const base = (process.env.BASE || '/').replace(/\/?$/, '/');
const port = 4322;

module.exports = {
  ci: {
    collect: {
      startServerCommand: `node scripts/lib/serve-dist.mjs ${base} ${port}`,
      startServerReadyPattern: 'Serving',
      url: [`http://127.0.0.1:${port}${base}`],
      numberOfRuns: 3,
      settings: { chromeFlags: '--no-sandbox --headless=new' },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9, aggregationMethod: 'median-run' }],
        'categories:accessibility': ['error', { minScore: 0.95, aggregationMethod: 'median-run' }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500, aggregationMethod: 'median-run' }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1, aggregationMethod: 'median-run' }],
      },
    },
    upload: { target: 'filesystem', outputDir: '.lighthouseci' },
  },
};
