# Dra. Victória Laufer portfolio site — common developer commands
# Requires: GNU make and Node.js (version in .nvmrc) with npm.
#
# `lint` and `lighthouse` print a notice until issue 1.7 adds the tools.

NPM ?= npm

.PHONY: help install dev build preview lint check lighthouse requests contrast

help: ## Show available targets
	@awk 'BEGIN {FS = ":.*##"; printf "Targets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  %-12s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

install: ## Install dependencies from the lockfile
	$(NPM) ci

dev: ## Start the local development server
	$(NPM) run dev

build: ## Build the static site (production URLs unless DEPLOY_TARGET is set)
	$(NPM) run build

preview: ## Serve the built site locally
	$(NPM) run preview

lint: ## Lint the source (issue 1.7)
	$(NPM) run lint

check: ## Type-check the project
	$(NPM) run check

lighthouse: ## Run Lighthouse CI, mobile (issue 1.7)
	$(NPM) run lighthouse

requests: ## Request everything dist/ references; fail on non-200 or third party (BASE=/dra-victoria-laufer/ for staging)
	node scripts/check-requests.mjs $(or $(BASE),/)

contrast: ## Check every approved text pair in DESIGN.md (WCAG >= 4.5:1)
	node scripts/check-contrast.mjs
