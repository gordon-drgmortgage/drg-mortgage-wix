# HTML And Velo Message Contracts

Last audited: 2026-07-11

## Amortization Calculator

Component: `#amortizationHtml`

- HTML to Velo: `SAVE_LOAN_CLICK`, `LOAN_DATA_RESPONSE`
- Velo to HTML: `GET_LOAN_DATA`, `SET_SAVE_BUTTON_STATE`, `SAVE_LOAN_RESULT`
- CMS: `SavedLoans`

## Mortgage Dashboard

Component: `#myMortgageDashboardHtml`

- HTML to Velo: `LOAD_DASHBOARD_LOANS`, `OPEN_LOAN_DETAILS`
- Velo to HTML: `DASHBOARD_LOANS`, `DASHBOARD_ERROR`
- Navigation: `/loan-details?loanId={id}`

## Loan Details Portal

Component: `#mortgagePortalHtml`

- HTML to Velo: `LOAD_PORTAL_LOAN`, `SAVE_LOAN_DETAILS`, `SAVE_AI_DETAILS`, `RUN_AI_REVIEW`, `SAVE_ARM_DETAILS`, `SAVE_LOAN_EVENT`, `BACK_TO_DASHBOARD`
- Velo to HTML: `PORTAL_LOAN_DATA`, `PORTAL_SAVE_RESULT`, `PORTAL_ERROR`
- CMS: `SavedLoans`, `MortgageActivity`

## Investor Tools

Components: `#dscrHtml`, `#comparablesHtml`, `#fixFlipHtml`

- Common HTML to Velo: `INVESTOR_REQUEST_LOGIN`, `INVESTOR_LOAD_SAVED`
- DSCR HTML to Velo: `dscrScenario`, `DSCR_PREVIEW_UPDATED`, `INVESTOR_SAVE_DSCR`, `INVESTOR_DELETE_DSCR`
- Comparables HTML to Velo: `INVESTOR_SAVE_COMPARABLE_ANALYSIS`, legacy `INVESTOR_SAVE_COMPARABLES`, `INVESTOR_DELETE_COMPARABLE_ANALYSIS`, legacy `INVESTOR_DELETE_COMPARABLES`
- Fix-and-flip HTML to Velo: `INVESTOR_SAVE_FIX_FLIP`, `INVESTOR_DELETE_FIX_FLIP`
- Velo to HTML: `INVESTOR_MEMBER_STATUS`, `INVESTOR_DSCR_SAVED`, `INVESTOR_COMPARABLE_ANALYSIS_SAVED`, `INVESTOR_FIX_FLIP_SAVED`, `INVESTOR_DSCR_LIST`, `INVESTOR_COMPARABLE_ANALYSIS_LIST`, `INVESTOR_FIX_FLIP_LIST`, `INVESTOR_LOGIN_REQUIRED`, `INVESTOR_ERROR`

## Investor Hub

Component: `#investorHubHtml`

- HTML to Velo: `INVESTOR_LOAD_SAVED`, `INVESTOR_DELETE_DSCR`, `INVESTOR_DELETE_COMPARABLE_ANALYSIS`, `INVESTOR_DELETE_FIX_FLIP`
- Velo to HTML: `INVESTOR_MEMBER_STATUS`, `INVESTOR_DSCR_LIST`, `INVESTOR_COMPARABLE_ANALYSIS_LIST`, `INVESTOR_FIX_FLIP_LIST`, `INVESTOR_LOGIN_REQUIRED`, `INVESTOR_ERROR`

## Knowledge Center Hub

Component: `#knowledgeCenterHtml`

- HTML to Velo: `KC_READY`, `KC_NAVIGATE`, `KC_SIGN_IN`, `KC_TOGGLE_FAVORITE`, `KC_OPEN_RESOURCE`
- Velo to HTML: `KC_DATA`, `KC_ERROR`

## Knowledge Category Pages

Component: `#knowledgeCategoryHtml`

- HTML to Velo: `KC_CATEGORY_READY`, `KC_NAVIGATE`, `KC_SIGN_IN`, `KC_TOGGLE_FAVORITE`, `KC_OPEN_RESOURCE`
- Velo to HTML: `KC_CATEGORY_DATA`, `KC_CATEGORY_ERROR`

## Knowledge Resource Dynamic Page

Component: `#knowledgeResourceHtml`

- HTML to Velo: `KC_RESOURCE_READY`, `KC_TOGGLE_FAVORITE`
- Velo to HTML: `KC_RESOURCE_DATA`, `KC_RESOURCE_ERROR`, `KC_FAVORITES_UPDATED`

## No Message Bridge

The following archived embeds are self-contained or use ordinary links/fetches: `#mortgageAdvantageHtml`, `#quickToolsHtml`, `#sellerNetSheetHtml`, `#loanProductsHtml`, `#helpfulLinksHtml`, `#aboutHtml`, and `#contactHtml`.

