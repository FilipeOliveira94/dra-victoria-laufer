import { defineConfig } from 'astro/config';

// DEPLOY_TARGET is the only switch between hosts (ADR-0004).
// Unset: production URLs at the root of the final domain.
// "ghpages": staging under the GitHub Pages project path.
const targets = {
  production: { site: 'https://dravictorialaufer.com.br', base: '/' },
  ghpages: { site: 'https://filipeoliveira94.github.io', base: '/dra-victoria-laufer/' },
};

const target = process.env.DEPLOY_TARGET || 'production';
if (!(target in targets)) {
  throw new Error(
    `Unknown DEPLOY_TARGET "${target}". Use "ghpages" or leave it unset for production.`,
  );
}

export default defineConfig({
  ...targets[target],
  output: 'static',
  trailingSlash: 'ignore',
});
