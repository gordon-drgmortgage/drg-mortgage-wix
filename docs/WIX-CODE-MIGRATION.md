# Wix Code Migration

Use this process when moving production Wix code into GitHub.

## Migration Order

1. `public/knowledgeFramework.js`
2. `backend/http-functions.js`
3. Knowledge Resource dynamic-page Velo
4. Knowledge Resource HTML
5. Main Knowledge Center HTML and Velo
6. Category HTML templates
7. Mortgage-rate homepage HTML
8. Amortization calculator HTML and page code
9. Investor tools
10. Member pages

## Rules

- Copy complete production files or complete HTML embeds.
- Do not copy only the function currently being changed.
- Add a source header to every migrated JavaScript file and HTML embed.
- Review changes in GitHub before copying or deploying code back to Wix.
- Do not commit secrets, credentials, API keys, borrower information, or private financial data.

## JavaScript Header Template

```javascript
/**
 * Wix location: Public > knowledgeFramework.js
 * Production status: Active
 * Last synced from Wix: 2026-07-10
 */
```

## HTML Header Template

```html
<!--
Wix page: Knowledge Resources (Item)
Wix component ID: #knowledgeResourceHtml
Production status: Active
Last synced from Wix: 2026-07-10
-->
```

