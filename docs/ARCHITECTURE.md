# Architecture

This document will describe the DRG Mortgage Wix site architecture as code is migrated from Wix.

## Current Production Runtime

Wix remains the production runtime. This repository is the source-of-truth archive for review, version control, documentation, and controlled migration.

## Expected Areas

- Velo backend modules and HTTP functions in `backend/`
- Velo public modules in `public/`
- Page-level Velo code in `page-code/`
- Custom HTML embeds in `html-embeds/`
- CMS collection documentation in `cms-schemas/`

## HTML and Velo Communication

Custom HTML embeds communicate with Velo page code using `postMessage()`. As files are migrated, document each message event, payload shape, sender, receiver, and related Wix component ID.

