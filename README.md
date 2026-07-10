# DRG Mortgage Wix Website

This repository is the source-of-truth archive and version-control system for the DRG Mortgage Wix website.

## Runtime and Deployment

- Wix remains the production runtime.
- GitHub is the master code archive and version-control system.
- Changes should be reviewed in GitHub before being copied or deployed to Wix.
- HTML embeds communicate with Velo page code through `postMessage()`.
- No secrets, borrower information, credentials, API keys, access tokens, or private financial data may be committed.

## Repository Map

- `backend/` - Velo backend modules and HTTP functions copied from Wix.
- `public/` - Velo public modules copied from Wix.
- `page-code/` - Page-level Velo code, grouped by site area.
- `html-embeds/` - Custom HTML embed source, grouped by tool or page.
- `cms-schemas/` - Documentation for Wix CMS collections, fields, indexes, permissions, and usage.
- `docs/` - Architecture, migration, deployment, component ID, automation, and CMS documentation.
- `assets/` - Non-sensitive images, icons, exports, and reference assets used by the site.
- `research/` - Working notes, rate research, product research, and source material that supports site content.

## Migration Rule

When copying production code from Wix into this repository, migrate the complete file or complete HTML embed. Do not copy only the function or section being changed.

At the top of every migrated JavaScript file, add a source note:

```javascript
/**
 * Wix location: Public > knowledgeFramework.js
 * Production status: Active
 * Last synced from Wix: 2026-07-10
 */
```

At the top of every migrated HTML embed, add a source note:

```html
<!--
Wix page: Knowledge Resources (Item)
Wix component ID: #knowledgeResourceHtml
Production status: Active
Last synced from Wix: 2026-07-10
-->
```

