# Dra. Victória Laufer portfolio site — common developer commands
# Requires: GNU make and Node.js with npm (after issue 1.1).
#
# The Astro project does not exist yet: issue 1.1 creates it (ROADMAP.md).
# Until package.json exists, every Astro target prints a notice and exits 0.
# Issue 1.1 must provide the npm scripts these targets call:
#   dev, build, preview, lint, check, lighthouse.

NPM ?= npm

.PHONY: help install dev build preview lint check lighthouse contrast

# Run $(1) when the Astro project exists; otherwise explain and exit 0.
define astro
@if [ -f package.json ]; then \
	echo "+ $(1)"; \
	$(1); \
else \
	echo "make $@: not available yet."; \
	echo "  The Astro project is created by issue 1.1 (see ROADMAP.md)."; \
	echo "  This repository still holds the legacy Jekyll site. Nothing was run."; \
fi
endef

help: ## Show available targets
	@awk 'BEGIN {FS = ":.*##"; printf "Targets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  %-12s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
	@if [ ! -f package.json ]; then \
		echo ""; \
		echo "Astro targets are placeholders until issue 1.1 (see ROADMAP.md)."; \
	fi

install: ## Install dependencies from the lockfile
	$(call astro,$(NPM) ci)

dev: ## Start the local development server
	$(call astro,$(NPM) run dev)

build: ## Build the static site (production URLs unless DEPLOY_TARGET is set)
	$(call astro,$(NPM) run build)

preview: ## Serve the built site locally
	$(call astro,$(NPM) run preview)

lint: ## Lint the source
	$(call astro,$(NPM) run lint)

check: ## Type-check and validate the content collections
	$(call astro,$(NPM) run check)

lighthouse: ## Run Lighthouse CI (mobile) against the built site
	$(call astro,$(NPM) run lighthouse)

contrast: ## Check every approved text pair in DESIGN.md (WCAG >= 4.5:1)
	node scripts/check-contrast.mjs
