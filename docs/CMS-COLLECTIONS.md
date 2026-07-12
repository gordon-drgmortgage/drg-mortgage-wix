# CMS Collection Register

Last audited: 2026-07-11

This register documents collection IDs referenced by archived production code. Connected Wix API access can read the collection schemas and permissions directly; verify them before changing persistence logic.

| Collection ID | Purpose | Read/write consumers |
| --- | --- | --- |
| `MortgageRateHistory` | Imported Freddie Mac PMMS history | Backend `get_mortgageRates`; read-only endpoint; verified keys include `weekEnding`, `rate30Year`, `points30Year`, `rate15Year`, `points15Year`, `rate5_1Arm`, `points5_1Arm`, `margin5_1Arm`, and `spread30YearVs5_1Arm` |
| `KnowledgeCategories` | Knowledge Center topics, slugs, order, icons, page URLs | `knowledgeFramework.js`; dynamic resource page |
| `KnowledgeResources` | Published educational resources and dynamic-page content | `knowledgeFramework.js`; dynamic resource page |
| `KnowledgeSettings` | Knowledge Center feature flags and display counts | `knowledgeFramework.js`; dynamic resource page |
| `FavoriteResources` | Member-owned resource favorites | Knowledge framework and dynamic resource page; query/insert/remove |
| `SavedLoans` | Member-owned borrower loan scenarios and portal state | Borrower Tools, dashboard, Loan Details; insert/query/get/update |
| `MortgageActivity` | Timeline/events associated with a saved loan | Loan Details; query/insert |
| `SavedDSCRScenarios` | Member-owned DSCR scenarios | Investor Tools and Investor Hub; insert/query/get/remove |
| `ComparableAnalyses` | Parent records for saved comparable analyses | Investor Tools and Investor Hub; insert/query/get/remove |
| `ComparableProperties` | Child comparable-property rows linked to an analysis | Investor Tools and Investor Hub; insert/query/remove |
| `FixAndFlipProjects` | Parent records for saved fix-and-flip projects | Investor Tools and Investor Hub; insert/query/get/remove |
| `FixAndFlipLineItems` | Child project line items linked to a fix-and-flip project | Investor Tools and Investor Hub; insert/query/remove |
| `DscrDealReviews` | DSCR review leads and calculator snapshot | Investor Tools; insert |

## Ownership Expectations

- Member dashboards query `_owner` using the active member ID.
- Investor delete functions retrieve the parent record and verify `_owner` before removal.
- Child comparable and fix-and-flip records are removed only after parent ownership is verified.
- `MortgageRateHistory` is read server-side with `suppressAuth: true` and exposed as public CSV.

## Documented Schema Files

- `06 CMS Schemas/MortgageRateHistory.md`

The other collection schemas are referenced by code and are readable through the connected Wix API, but do not yet have dedicated field-by-field disaster-recovery files in this archive.
