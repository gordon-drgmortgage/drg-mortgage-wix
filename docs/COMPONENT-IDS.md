# Wix Component ID Register

Last audited: 2026-07-11

| Component ID | Wix page(s) | Archived HTML | Velo bridge |
| --- | --- | --- | --- |
| `#mortgageAdvantageHtml` | Home | `02 HTML Embeds/mortgage-advantage-center/home-mortgage-advantage.html` | No `postMessage`; fetches mortgage-rate endpoint |
| `#aboutHtml` | About | `02 HTML Embeds/about/about.html` | Self-contained |
| `#contactHtml` | Contact | `02 HTML Embeds/contact/contact.html` | Self-contained |
| `#loanProductsHtml` | Loan Products | `02 HTML Embeds/loan-products/loan-products.html` | Self-contained |
| `#helpfulLinksHtml` | Loan Products | `02 HTML Embeds/helpful-links/helpful-links.html` | Self-contained navigation |
| `#amortizationHtml` | Borrower Tools | `02 HTML Embeds/amortization-calculator/borrower-tools-amortization.html` | Borrower Tools Velo |
| `#quickToolsHtml` | Realtor Tools | `02 HTML Embeds/realtor-tools/realtor-tools-quick-tools.html` | Self-contained |
| `#sellerNetSheetHtml` | Realtor Tools | `02 HTML Embeds/seller-net-sheet/realtor-tools-seller-net-sheet.html` | Self-contained; page Velo separately references native seller-net-sheet inputs |
| `#dscrHtml` | Investor Tools | `02 HTML Embeds/dscr-calculator/investor-tools-dscr.html` | Investor Tools Velo |
| `#comparablesHtml` | Investor Tools | `02 HTML Embeds/comparables-calculator/investor-tools-comparables.html` | Investor Tools Velo |
| `#fixFlipHtml` | Investor Tools | `02 HTML Embeds/fix-and-flip-analyzer/investor-tools-fix-flip.html` | Investor Tools Velo |
| `#knowledgeCenterHtml` | Knowledge Center | `02 HTML Embeds/knowledge-center/knowledge-center.html` | `knowledgeFramework.js` |
| `#knowledgeCategoryHtml` | Ten Knowledge Center category pages | `02 HTML Embeds/knowledge-center/knowledge-category.html` | `knowledgeFramework.js` |
| `#knowledgeResourceHtml` | Knowledge Resources item | `02 HTML Embeds/knowledge-resource/knowledge-resource.html` | Dynamic resource Velo |
| `#dynamicDataset` | Knowledge Resources item | Wix dataset, not HTML | Supplies current dynamic CMS item |
| `#myMortgageDashboardHtml` | My Mortgage Dashboard | `02 HTML Embeds/member-pages/my-mortgage-dashboard.html` | Dashboard Velo |
| `#mortgagePortalHtml` | Loan Details | `02 HTML Embeds/member-pages/mortgage-portal.html` | Loan Details Velo |
| `#investorHubHtml` | Investor Hub | `02 HTML Embeds/member-pages/investor-hub.html` | Investor Hub Velo |

Native Realtor Tools IDs referenced by page Velo: `#calculateButton`, `#salePrice`, `#firstMortgage`, `#secondMortgage`, `#listingCommission`, `#buyerCommission`, `#closingCosts`, and `#netResult`.

Native Investor Tools review-form IDs referenced by page Velo: `#submitDscrReview`, `#leadName`, `#leadEmail`, `#leadPhone`, and `#leadNotes`.
