# DRG Mortgage Wix Architecture

Last audited: 2026-07-11

## System Boundaries

- **Wix** is the production runtime, page host, CMS, member system, and publishing surface.
- **`drg-mortgage-wix-live`** is the Wix Git Integration repository for deployable Velo code.
- **`drg-mortgage-wix`** is the long-term source archive for HTML embeds, Velo snapshots, schemas, and documentation.
- **Google Drive** is the approved business-library and backup location.
- **Desktop `DRG Mortgage Website`** mirrors the approved Drive archive.

No checkout, cart, booking, pricing-plan, or purchase workflow is part of the intended architecture. Site tools and educational resources are free.

## Runtime Layers

### HTML embeds

Seventeen standalone HTML files provide calculators, dashboards, educational hubs, and content pages. Ten communicate with Velo through `postMessage()`. Seven are self-contained presentation/navigation experiences.

### Page Velo

Wix binds page code by generated filename in `src/pages/`. Significant page logic handles member login, CMS persistence, ownership checks, and the HTML bridge. Placeholder page files are retained because Wix owns their generated identities.

### Shared public module

`src/public/knowledgeFramework.js` powers the Knowledge Center hub and ten category pages. It centralizes CMS reads, member favorites, category routing, resource formatting, and HTML messages.

### Backend

`src/backend/http-functions.js` exposes `/_functions/mortgageRates`. It reads `MortgageRateHistory` and returns CSV for the homepage mortgage-rate experience.

### CMS and members

Wix CMS stores Knowledge Center content, saved borrower loans, mortgage activity, investor analyses, and Freddie Mac rate history. Member-owned records are filtered by `_owner`; destructive actions perform explicit ownership checks where implemented.

## Main Data Flows

1. **Borrower calculator:** `#amortizationHtml` sends a save request to Borrower Tools Velo, which authenticates the member and inserts `SavedLoans`.
2. **Mortgage dashboard:** `#myMortgageDashboardHtml` requests member loans, then opens `/loan-details?loanId=...`.
3. **Loan portal:** `#mortgagePortalHtml` reads and updates `SavedLoans` and records `MortgageActivity`.
4. **Investor tools:** DSCR, comparables, and fix-and-flip embeds send save/load/delete messages to Investor Tools Velo, which persists member-owned records.
5. **Investor hub:** `#investorHubHtml` aggregates saved investor scenarios and supports owner-checked deletion.
6. **Knowledge Center:** hub/category HTML requests data from `knowledgeFramework.js`; the dynamic resource page uses `#dynamicDataset` plus CMS queries.
7. **Mortgage rates:** homepage HTML fetches `/_functions/mortgageRates`; the backend serializes the `MortgageRateHistory` collection as CSV.

## Deployment Flow

1. Edit and review source locally.
2. Commit and push the Wix-connected repository.
3. Wix Git Integration updates the editor code view.
4. Preview and test in Wix.
5. Publish manually in Wix.
6. Synchronize the archive copy to Drive and Desktop.

Pushing code does not itself publish the live website. Inline HTML embeds may still require Wix editor placement unless Wix exposes them through the connected project.

## Security Rules

- Never commit API keys, credentials, borrower data, member exports, or lender credentials.
- Browser API keys remain in ignored local preparation files and should be domain/API restricted.
- Never add commerce, bookings, carts, checkout, or payment apps without explicit approval.
- Do not write outside the approved `DRG Mortgage Website` Drive/Desktop tree.

