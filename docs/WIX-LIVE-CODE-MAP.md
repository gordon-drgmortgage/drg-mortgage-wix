# DRG Mortgage Wix Live Code Map

Generated: 2026-07-11

Source repo: `gordon-drgmortgage/drg-mortgage-wix-live`

Wix site: DRG Mortgage LLC

Site URL: https://www.drgmortgagellc.com/

Wix site ID: `2ee833a3-8715-4ead-a97a-2e05c63baf23`

Live repo commit inspected: `762c577`

## What This Map Covers

This map documents the code currently visible through Wix Git Integration: page-level Velo files, public Velo modules, backend Velo modules, CMS collection references, and the HTML/Velo `postMessage()` contracts.

Important limitation: Wix Git Integration exposes the Velo side of HTML embeds, including component IDs and message contracts, but it does not export the actual inline HTML embed source as separate `.html` files. Those HTML snippets still need to be copied from the Wix editor or exported separately before they can be archived as standalone files.

## Repository Layout

- `src/pages/`: page-level Velo code. Wix binds these files to pages by filename; do not rename them casually.
- `src/public/`: public frontend modules shared by pages.
- `src/backend/`: backend Velo modules and HTTP functions.
- `wix.config.json`: Wix site binding and UI version.
- `package.json`: Wix CLI local development scripts.

## URL And Page Code Map

These URLs are inferred from page names, hard-coded navigation calls, and the public site root. Wix page settings may contain exact custom slugs that are not visible in this Git export.

| Public area / probable URL | Wix page code file | HTML component IDs / notes |
| --- | --- | --- |
| `/` | `src/pages/Home.tuckg.js` | `#mortgageAdvantageHtml`; archived at `html-embeds/mortgage-advantage-center/home-mortgage-advantage.html` |
| `/about` | `src/pages/About.woeq4.js` | `#aboutHtml`; archived at `html-embeds/about/about.html` |
| `/contact` | `src/pages/Contact.drtds.js` | `#contactHtml`; archived at `html-embeds/contact/contact.html` |
| `/loan-products` | `src/pages/Loan Products.sz5ox.js` | `#loanProductsHtml`; archived at `html-embeds/loan-products/loan-products.html` |
| `/borrower-tools` | `src/pages/Borrower Tools.rp9wa.js` | `#amortizationHtml`; archived at `html-embeds/amortization-calculator/borrower-tools-amortization.html` |
| `/realtor-tools` | `src/pages/Realtor Tools.weyoj.js` | `#quickToolsHtml`; archived at `html-embeds/realtor-tools/realtor-tools-quick-tools.html`; `#sellerNetSheetHtml`; archived at `html-embeds/seller-net-sheet/realtor-tools-seller-net-sheet.html` |
| `/investor-tools` | `src/pages/Investor Tools.s5avu.js` | `#dscrHtml`; archived at `html-embeds/dscr-calculator/investor-tools-dscr.html`; `#comparablesHtml`; archived at `html-embeds/comparables-calculator/investor-tools-comparables.html`; `#fixFlipHtml`; archived at `html-embeds/fix-and-flip-analyzer/investor-tools-fix-flip.html` |
| `/investor-hub` | `src/pages/Investor Hub.ffjw6.js` | `#investorHubHtml` |
| `/my-mortgage-dashboard` | `src/pages/My Mortgage Dashboard.azs78.js` | `#dashboardHtml` |
| `/loan-details?loanId=...` | `src/pages/Loan Details.dt9pl.js` | `#mortgagePortalHtml` |
| `/knowledge-center` | `src/pages/Knowledge Center.zkhqo.js` | `#knowledgeCenterHtml`; archived at `html-embeds/knowledge-center/knowledge-center.html`; powered by `src/public/knowledgeFramework.js` |
| `/knowledge-resources/{slug}` | `src/pages/Knowledge Resources (Item).xm9hn.js` | Dynamic item page, `#knowledgeResourceHtml`; archived at `html-embeds/knowledge-resource/knowledge-resource.html` |
| `/knowledge-center/homebuyer-basics` | `src/pages/Homebuyer Basics.jllw3.js` | `#knowledgeCategoryHtml`; archived at `html-embeds/knowledge-center/knowledge-category.html`; powered by `src/public/knowledgeFramework.js` |
| `/knowledge-center/mortgage-basics` | `src/pages/Mortgage Basics.wer5x.js` | `#knowledgeCategoryHtml`; archived at `html-embeds/knowledge-center/knowledge-category.html` |
| `/knowledge-center/loan-programs` | `src/pages/Loan Programs.zpung.js` | `#knowledgeCategoryHtml`; archived at `html-embeds/knowledge-center/knowledge-category.html` |
| `/knowledge-center/refinance-homeowner` | `src/pages/Refinance Homeowner.skwrn.js` | `#knowledgeCategoryHtml`; archived at `html-embeds/knowledge-center/knowledge-category.html` |
| `/knowledge-center/credit-qualification` | `src/pages/Credit Qualification.bal09.js` | `#knowledgeCategoryHtml`; archived at `html-embeds/knowledge-center/knowledge-category.html` |
| `/knowledge-center/investor-resources` | `src/pages/Investor Resources.j12kv.js` | `#knowledgeCategoryHtml`; archived at `html-embeds/knowledge-center/knowledge-category.html` |
| `/knowledge-center/realtor-resources` | `src/pages/Realtor Resources.e5kxd.js` | `#knowledgeCategoryHtml`; archived at `html-embeds/knowledge-center/knowledge-category.html` |
| `/knowledge-center/resource-library` | `src/pages/Resource Library.jk4b0.js` | `#knowledgeCategoryHtml`; archived at `html-embeds/knowledge-center/knowledge-category.html` |
| `/knowledge-center/flyer-library` | `src/pages/Flyer Library.x6yo9.js` | `#knowledgeCategoryHtml`; archived at `html-embeds/knowledge-center/knowledge-category.html` |
| `/knowledge-center/social-media-library` | `src/pages/Social Media Library.z20o0.js` | `#knowledgeCategoryHtml`; archived at `html-embeds/knowledge-center/knowledge-category.html` |
| Blog index / post pages | `src/pages/Blog.bfjwi.js`, `src/pages/Post.vwm2s.js` | Minimal/empty page Velo |
| Member auth/profile pages | signup, login, reset, profile, account settings, notifications files | Mostly minimal/empty page Velo |
| Page not documented | Unknown page code | `#helpfulLinksHtml`; archived at `html-embeds/helpful-links/helpful-links.html`; self-contained navigation link hub; page placement needs confirmation |

## Backend HTTP Endpoints

| Endpoint | Backend file | Purpose |
| --- | --- | --- |
| `/_functions/mortgageRates` | `src/backend/http-functions.js` | Fetches a published Google Sheets CSV and returns it as text/csv with permissive CORS and one-hour browser caching |
| `OPTIONS /_functions/mortgageRates` | `src/backend/http-functions.js` | CORS preflight response |

## Public Modules

### `src/public/knowledgeFramework.js`

Shared Knowledge Center page framework used by the hub page and category pages.

Imports:
- `wix-data`
- `wix-location`
- `wix-members-frontend`

Exports:
- `initializeKnowledgeCenter($w, "#knowledgeCenterHtml")`
- `initializeKnowledgeCategory($w, "#knowledgeCategoryHtml")`

CMS collections referenced:
- `KnowledgeCategories`
- `KnowledgeResources`
- `KnowledgeSettings`
- `FavoriteResources`

Inbound messages from HTML:
- `KC_READY`
- `KC_CATEGORY_READY`
- `KC_NAVIGATE`
- `KC_SIGN_IN`
- `KC_TOGGLE_FAVORITE`
- `KC_OPEN_RESOURCE`

Outbound messages to HTML:
- `KC_DATA`
- `KC_ERROR`
- `KC_CATEGORY_DATA`
- `KC_CATEGORY_ERROR`

Hard-coded/support navigation paths:
- `/knowledge-resources/{slug}`
- `/knowledge-center/{slug}`
- `/knowledge-center/resource-library`
- `/knowledge-center/flyer-library`
- `/knowledge-center/social-media-library`
- `/borrower-tools`
- `/investor-tools`
- `/realtor-tools`
- `/contact`
- `/about`

## HTML Embed Communication Map

### Knowledge Center Hub

Page code:
- `src/pages/Knowledge Center.zkhqo.js`

Public module:
- `src/public/knowledgeFramework.js`

HTML component:
- `#knowledgeCenterHtml`

HTML sends:
- `KC_READY`
- `KC_NAVIGATE`
- `KC_SIGN_IN`
- `KC_TOGGLE_FAVORITE`
- `KC_OPEN_RESOURCE`

Velo sends:
- `KC_DATA`
- `KC_ERROR`

### Knowledge Center Category Pages

Page code:
- `src/pages/Homebuyer Basics.jllw3.js`
- `src/pages/Mortgage Basics.wer5x.js`
- `src/pages/Loan Programs.zpung.js`
- `src/pages/Refinance Homeowner.skwrn.js`
- `src/pages/Credit Qualification.bal09.js`
- `src/pages/Investor Resources.j12kv.js`
- `src/pages/Realtor Resources.e5kxd.js`
- `src/pages/Resource Library.jk4b0.js`
- `src/pages/Flyer Library.x6yo9.js`
- `src/pages/Social Media Library.z20o0.js`

HTML component:
- `#knowledgeCategoryHtml`; archived at `html-embeds/knowledge-center/knowledge-category.html`

HTML sends:
- `KC_CATEGORY_READY`
- `KC_NAVIGATE`
- `KC_SIGN_IN`
- `KC_TOGGLE_FAVORITE`
- `KC_OPEN_RESOURCE`

Velo sends:
- `KC_CATEGORY_DATA`
- `KC_CATEGORY_ERROR`

### Knowledge Resource Dynamic Page

Page code:
- `src/pages/Knowledge Resources (Item).xm9hn.js`

HTML component:
- `#knowledgeResourceHtml`; archived at `html-embeds/knowledge-resource/knowledge-resource.html`

Dataset:
- `#dynamicDataset`

HTML sends:
- `KC_RESOURCE_READY`
- `KC_TOGGLE_FAVORITE`

Velo sends:
- `KC_RESOURCE_DATA`
- `KC_RESOURCE_ERROR`
- `KC_FAVORITES_UPDATED`

CMS collections:
- `KnowledgeResources`
- `KnowledgeCategories`
- `KnowledgeSettings`
- `FavoriteResources`

### Amortization Calculator

Page code:
- `src/pages/Borrower Tools.rp9wa.js`

HTML component:
- `#amortizationHtml`

HTML sends:
- `SAVE_LOAN_CLICK`
- `LOAN_DATA_RESPONSE`

Velo sends:
- `GET_LOAN_DATA`
- `SET_SAVE_BUTTON_STATE`
- `SAVE_LOAN_RESULT`

CMS collections:
- `SavedLoans`

### Mortgage Dashboard

Page code:
- `src/pages/My Mortgage Dashboard.azs78.js`

HTML component:
- `#dashboardHtml`

HTML sends:
- `LOAD_DASHBOARD_LOANS`
- `OPEN_LOAN_DETAILS`

Velo sends:
- `DASHBOARD_LOANS`
- `DASHBOARD_ERROR`

CMS collections:
- `SavedLoans`

Navigation:
- Opens `/loan-details?loanId={loanId}`

### Loan Details / Mortgage Portal

Page code:
- `src/pages/Loan Details.dt9pl.js`

HTML component:
- `#mortgagePortalHtml`

HTML sends:
- `LOAD_PORTAL_LOAN`
- `SAVE_LOAN_DETAILS`
- `SAVE_AI_DETAILS`
- `RUN_AI_REVIEW`
- `SAVE_ARM_DETAILS`
- `SAVE_LOAN_EVENT`
- `BACK_TO_DASHBOARD`

Velo sends:
- `PORTAL_LOAN_DATA`
- `PORTAL_SAVE_RESULT`
- `PORTAL_ERROR`

CMS collections:
- `SavedLoans`
- `MortgageActivity`

Navigation:
- Reads `loanId` from the query string.
- Returns to `/my-mortgage-dashboard`.

### Investor Tools

Page code:
- `src/pages/Investor Tools.s5avu.js`

HTML components:
- `#dscrHtml`
- `#comparablesHtml`
- `#fixFlipHtml`

HTML sends:
- `INVESTOR_REQUEST_LOGIN`
- `dscrScenario`
- `DSCR_PREVIEW_UPDATED`
- `INVESTOR_SAVE_DSCR`
- `INVESTOR_LOAD_SAVED`
- `INVESTOR_DELETE_DSCR`
- `INVESTOR_SAVE_COMPARABLE_ANALYSIS`
- `INVESTOR_SAVE_COMPARABLES`
- `INVESTOR_DELETE_COMPARABLE_ANALYSIS`
- `INVESTOR_DELETE_COMPARABLES`
- `INVESTOR_SAVE_FIX_FLIP`
- `INVESTOR_DELETE_FIX_FLIP`

Velo sends:
- `INVESTOR_MEMBER_STATUS`
- `INVESTOR_DSCR_SAVED`
- `INVESTOR_COMPARABLE_ANALYSIS_SAVED`
- `INVESTOR_FIX_FLIP_SAVED`
- `INVESTOR_DSCR_LIST`
- `INVESTOR_COMPARABLE_ANALYSIS_LIST`
- `INVESTOR_FIX_FLIP_LIST`
- `INVESTOR_LOGIN_REQUIRED`
- `INVESTOR_ERROR`

CMS collections:
- `SavedDSCRScenarios`
- `ComparableAnalyses`
- `ComparableProperties`
- `FixAndFlipProjects`
- `FixAndFlipLineItems`
- `DscrDealReviews`

### Investor Hub

Page code:
- `src/pages/Investor Hub.ffjw6.js`

HTML component:
- `#investorHubHtml`

HTML sends:
- `INVESTOR_LOAD_SAVED`
- `INVESTOR_DELETE_DSCR`
- `INVESTOR_DELETE_COMPARABLE_ANALYSIS`
- `INVESTOR_DELETE_FIX_FLIP`

Velo sends:
- `INVESTOR_MEMBER_STATUS`
- `INVESTOR_DSCR_LIST`
- `INVESTOR_COMPARABLE_ANALYSIS_LIST`
- `INVESTOR_FIX_FLIP_LIST`
- `INVESTOR_LOGIN_REQUIRED`
- `INVESTOR_ERROR`

CMS collections:
- `SavedDSCRScenarios`
- `ComparableAnalyses`
- `ComparableProperties`
- `FixAndFlipProjects`
- `FixAndFlipLineItems`

### Seller Net Sheet / Realtor Tools

Page code:
- `src/pages/Realtor Tools.weyoj.js`

Current known HTML embeds:
- `#quickToolsHtml`; archived at `html-embeds/realtor-tools/realtor-tools-quick-tools.html`
- `#sellerNetSheetHtml`; archived at `html-embeds/seller-net-sheet/realtor-tools-seller-net-sheet.html`

Earlier notes referenced native Wix seller-net-sheet elements on this page. The public scrape shows the live page also contains HTML embeds, so keep both possibilities in mind until the page Velo and seller net sheet source are fully archived.
- `#netResult`

No `postMessage()` bridge was found in this page code.

## CMS Collection References Found

- `KnowledgeCategories`
- `KnowledgeResources`
- `KnowledgeSettings`
- `FavoriteResources`
- `SavedLoans`
- `MortgageActivity`
- `SavedDSCRScenarios`
- `ComparableAnalyses`
- `ComparableProperties`
- `FixAndFlipProjects`
- `FixAndFlipLineItems`
- `DscrDealReviews`

## Files With Significant Logic

- `src/public/knowledgeFramework.js`
- `src/backend/http-functions.js`
- `src/pages/Knowledge Resources (Item).xm9hn.js`
- `src/pages/Borrower Tools.rp9wa.js`
- `src/pages/Investor Tools.s5avu.js`
- `src/pages/Investor Hub.ffjw6.js`
- `src/pages/My Mortgage Dashboard.azs78.js`
- `src/pages/Loan Details.dt9pl.js`
- `src/pages/Realtor Tools.weyoj.js`

## Current Backup Notes

The present state captured here is the Wix Git Integration repository, not a full Wix site export. It includes Velo source and backend/public modules, but not CMS records, uploaded media, form submissions, member data, or the raw source text inside HTML embeds.

Recommended next archival step: copy each live HTML embed from the Wix editor into the archive repo and backup folders under `html-embeds/`, matching the component IDs listed above.
