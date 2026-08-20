<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
# Project Design & Development Rules

This is a portfolio concept website based on a custom design created by the designer in Figma.

## Figma is the source of truth

- Use the configured Figma MCP server to inspect the design.
- When a Figma frame or selection link is provided, inspect it through Figma MCP before writing code.
- Follow the Figma design as accurately as possible.
- Do not redesign, simplify, reinterpret, or "improve" the visual design unless explicitly asked.
- Preserve typography, spacing, proportions, alignment, grid, border radii, colors, and visual hierarchy.
- Use actual assets from Figma whenever possible.
- Do not replace provided assets with random placeholders.

## Development

- Use Next.js, React and TypeScript.
- Use the existing project structure and conventions.
- Write clean and reusable components.
- Avoid unnecessary dependencies.
- Do not change unrelated files when implementing a specific task.
- Do not invent functionality that was not requested.
- Before making a significant assumption, ask for clarification.

## Responsive design

- Desktop implementation must closely match the desktop Figma frames.
- Mobile implementation must closely match mobile Figma frames when provided.
- If a mobile design has not been provided, do not invent major layout changes without asking.
- Intermediate viewport sizes should remain responsive without changing the original design concept.

## Interactions

- Implement interactions shown or described in the design, including hover states, transitions, animations, menus, galleries, product selectors and cart interactions.
- This website is a portfolio concept project.
- No real payment processing is required.
- Demo interactions should still feel like a real functioning commercial website.

## Priority

Fidelity to the Figma design has priority over creative interpretation or implementation shortcuts.
- Never use temporary localhost Figma asset URLs in the final implementation.
- Export required images and SVG assets into the project's /public/assets directory and reference them locally.