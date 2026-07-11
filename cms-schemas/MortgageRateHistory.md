# MortgageRateHistory

Wix CMS collection used for Freddie Mac PMMS mortgage rate history.

## Collection

- Collection ID: `MortgageRateHistory`
- Source: Imported Freddie Mac PMMS CSV data
- Approximate current size: 2,885 records as of 2026-07-11

## Fields

The Wix dashboard labels visible during migration were:

| Display field | Expected archived key handling | Type |
| --- | --- | --- |
| `Week Ending` | `weekEnding` or normalized equivalent | Date |
| `30-Year FRM` | `thirtyYearFrm`, `30YearFrm`, `_30YearFrm`, or normalized equivalent | Number |
| `30-Year Points and Fees` | `thirtyYearPointsAndFees`, `30YearPointsAndFees`, or normalized equivalent | Number |
| `15-Year FRM` | `fifteenYearFrm`, `15YearFrm`, `_15YearFrm`, or normalized equivalent | Number |
| `15-Year Points and Fees` | `fifteenYearPointsAndFees`, `15YearPointsAndFees`, or normalized equivalent | Number |

## Connected Code

- `backend/http-functions.js`
- Endpoint: `/_functions/mortgageRates`
- Consumer: Home page mortgage-rate HTML embed, archived at `html-embeds/mortgage-advantage-center/home-mortgage-advantage.html`

## Endpoint Contract

The backend reads this collection and returns CSV text so the existing homepage parser can keep using the same columns:

```text
Week Ending,30-Year FRM,30-Year Points and Fees,15-Year FRM,15-Year Points and Fees
```

Rows are sorted by `Week Ending` in ascending order before the CSV response is generated.

## Notes

- This collection replaces the previous published Google Sheets CSV URL as the live data source.
- The endpoint uses permissive CORS and a one-hour public cache because the data is public benchmark rate history.
- Freddie Mac PMMS data is benchmark market context only and is not a DRG Mortgage offered rate, APR, quote, approval, commitment, or lock.
