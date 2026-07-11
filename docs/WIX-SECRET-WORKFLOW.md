# Wix Secret Workflow

GitHub stores archive-safe HTML with browser keys redacted. Local Wix-ready copies are generated from the archive when code needs to be copied or deployed into Wix.

## Local Setup

Create a local file named `.env.local` in the repository root:

```text
GOOGLE_MAPS_BROWSER_KEY=your_google_maps_browser_key
```

This file is ignored by Git and must not be committed.

## Prepare Wix-Ready HTML

Run:

```bash
npm run prepare:wix-html
```

The generated files appear under:

```text
wix-ready/html-embeds/
```

Those generated files are also ignored by Git. They are the versions to copy into Wix when the live site needs the Google Maps key restored.

## Rules

- Do not commit `.env.local`.
- Do not commit `wix-ready/`.
- Keep GitHub archive files redacted.
- Use generated Wix-ready files only for deployment or manual copy into Wix.
- Never use this workflow for purchases, checkout, bookings, paid subscriptions, or payment setup.

