# Architecture Audit Results

Audit date: 2026-07-11

## Coverage

- 37 Wix-generated page Velo files present in the Git-connected repository.
- 37 corresponding Velo files represented in the Desktop backup after this audit.
- 17 archived HTML embeds.
- 10 HTML embeds with active `postMessage()` bridges.
- 7 self-contained HTML embeds.
- 1 shared public Velo module.
- 1 backend HTTP-function module.
- 13 CMS collection IDs referenced by production code.

## Findings

1. The homepage `#mortgageAdvantageHtml` source existed in the archive repository but was missing from the Desktop and Drive mirrors. Exact copies were restored to both mirrors during this audit.
2. Eleven small Velo files were present in GitHub but had only been confirmed through screenshots, not copied into Desktop/Drive. Exact copies were added during this audit.
3. The Helpful Links HTML component (`#helpfulLinksHtml`) is on the Loan Products page at `/loan-products`.
4. Realtor Tools Velo operates native Wix inputs for a seller-net calculation and does not communicate with `#sellerNetSheetHtml`. The archived seller-net HTML is self-contained. This is not necessarily broken, but it represents two independent implementations on the same page.
5. The Knowledge Center uses one shared category HTML template and one shared public module across ten pages. This is intentional and consistent.
6. Some investor HTML contains legacy message aliases alongside current names. Velo currently accepts both comparables save/delete variants.
7. Wix API access can read complete field schemas and permissions for the site's CMS collections. `MortgageRateHistory` currently has a dedicated schema file; the remaining referenced collections can be exported from Wix when disaster-recovery schema files are prepared.

## Verification Limits

- Wix Git Integration does not export exact page-setting slugs, menu visibility, page permissions, CMS permissions, automations, or element placement. Connected Wix API access can retrieve CMS schemas and permissions separately.
- The map labels routes as confirmed or inferred accordingly.
- This audit inspected source code and archived HTML. It did not publish the site or alter Wix CMS data.
- No commerce, cart, checkout, booking, pricing-plan, or payment code was found in the archived application source.

## Recommended Follow-up

1. Export field definitions and permissions for the remaining referenced CMS collections as dedicated disaster-recovery schema files.
2. Record Wix automations and member-page permissions in `AUTOMATIONS.md` and deployment documentation.
3. Run a browser smoke test for each interactive bridge after the next production publish.
