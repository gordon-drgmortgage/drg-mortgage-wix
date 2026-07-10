# Deployment Checklist

Use this checklist before copying reviewed GitHub changes back into Wix.

## Before Wix Update

- Confirm the GitHub change has been reviewed.
- Confirm no secrets, credentials, borrower information, or private financial data were committed.
- Confirm the complete production file or complete HTML embed was updated.
- Confirm source headers remain accurate.
- Confirm affected CMS collections and component IDs are documented.
- Confirm `postMessage()` payloads are documented when HTML/Velo communication changes.

## After Wix Update

- Test the affected Wix page in preview.
- Test member-specific behavior when relevant.
- Test CMS reads and writes when relevant.
- Test calculator inputs, outputs, and save flows when relevant.
- Record the sync date in the migrated file header.

