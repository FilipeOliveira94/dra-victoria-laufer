# Dra. Victória Laufer portfolio site — common developer commands
# Requires: GNU make and Node.js (version in .nvmrc) with npm.
#
# The quality checks (issue 1.7) run on the built site: `make build` first.
# axe and Lighthouse need Chrome: CHROME_PATH, or google-chrome on PATH.

NPM ?= npm

.PHONY: help install dev build preview lint check axe lighthouse requests contrast assets

help: ## Show available targets
	@awk 'BEGIN {FS = ":.*##"; printf "Targets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  %-12s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

install: ## Install dependencies from the lockfile
	$(NPM) ci

dev: ## Start the local development server
	$(NPM) run dev

assets: ## Crop the private assets in .assets/ into src/assets/generated/ (also run by build and dev)
	node scripts/prepare-assets.mjs

build: ## Build the static site (production URLs unless DEPLOY_TARGET is set)
	$(NPM) run build

preview: ## Serve the built site locally
	$(NPM) run preview

lint: ## Valid HTML, no Lorem or vetoed term in dist/, no photo in the repository
	$(NPM) run lint

check: ## Type-check the project
	$(NPM) run check

axe: ## axe on the home and the 404, 360 and 1280 px (BASE=/dra-victoria-laufer/ for staging)
	node scripts/check-axe.mjs $(or $(BASE),/)

lighthouse: ## Lighthouse CI mobile: Performance >= 90, Accessibility >= 95, LCP < 2.5 s, CLS < 0.1 (BASE as above)
	BASE=$(or $(BASE),/) $(NPM) run lighthouse

requests: ## Request everything dist/ references; fail on non-200 or third party (BASE=/dra-victoria-laufer/ for staging)
	node scripts/check-requests.mjs $(or $(BASE),/)

contrast: ## Check every approved text pair in DESIGN.md (WCAG >= 4.5:1)
	node scripts/check-contrast.mjs
