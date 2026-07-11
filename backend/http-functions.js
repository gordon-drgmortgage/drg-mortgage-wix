/**
 * Wix location: Backend > http-functions.js
 * Production status: Active
 * Migrated from: User-provided Wix code paste, then updated to use Wix CMS
 * Initial archive date: 2026-07-11
 * Last verified from Wix: 2026-07-11
 */

import { ok, serverError } from "wix-http-functions";
import wixData from "wix-data";

const COLLECTION_ID = "MortgageRateHistory";
const PAGE_SIZE = 1000;

const corsHeaders = {
  "Content-Type": "text/csv",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "public, max-age=3600"
};

const errorHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

export function options_mortgageRates(request) {
  return ok({
    headers: corsHeaders,
    body: ""
  });
}

export async function get_mortgageRates(request) {
  try {
    const items = await getAllRateHistoryItems();
    const csv = buildMortgageRatesCsv(items);

    return ok({
      headers: corsHeaders,
      body: csv
    });
  } catch (error) {
    return serverError({
      headers: errorHeaders,
      body: {
        error: "Unable to load mortgage rate data."
      }
    });
  }
}

async function getAllRateHistoryItems() {
  let results = [];
  let skip = 0;
  let hasMore = true;

  while (hasMore) {
    const page = await wixData
      .query(COLLECTION_ID)
      .skip(skip)
      .limit(PAGE_SIZE)
      .find({ suppressAuth: true });

    results = results.concat(page.items);
    skip += page.items.length;
    hasMore = page.hasNext();
  }

  return results;
}

function buildMortgageRatesCsv(items) {
  const header = [
    "Week Ending",
    "30-Year FRM",
    "30-Year Points and Fees",
    "15-Year FRM",
    "15-Year Points and Fees"
  ];

  const sortedItems = items.slice().sort((a, b) => {
    const aDate = parseDate(readField(a, ["weekEnding", "date", "week_ending", "Week Ending"]));
    const bDate = parseDate(readField(b, ["weekEnding", "date", "week_ending", "Week Ending"]));
    return aDate - bDate;
  });

  const rows = sortedItems.map((item) => [
    formatDateForCsv(readField(item, ["weekEnding", "date", "week_ending", "Week Ending"])),
    readNumberField(item, ["thirtyYearFrm", "thirtyYearFRM", "x30YearFrm", "_30YearFrm", "30YearFrm", "30-Year FRM"]),
    readNumberField(item, ["thirtyYearPointsAndFees", "thirtyYearPoints", "x30YearPointsAndFees", "_30YearPointsAndFees", "30YearPointsAndFees", "30-Year Points and Fees"]),
    readNumberField(item, ["fifteenYearFrm", "fifteenYearFRM", "x15YearFrm", "_15YearFrm", "15YearFrm", "15-Year FRM"]),
    readNumberField(item, ["fifteenYearPointsAndFees", "fifteenYearPoints", "x15YearPointsAndFees", "_15YearPointsAndFees", "15YearPointsAndFees", "15-Year Points and Fees"])
  ]).filter((row) => row[0] && row[1] !== "");

  return [header].concat(rows).map(toCsvRow).join("\n");
}

function readField(item, keys) {
  for (const key of keys) {
    if (item[key] !== undefined && item[key] !== null && item[key] !== "") {
      return item[key];
    }
  }

  const normalizedKeys = keys.map(normalizeKey);
  const matchingKey = Object.keys(item).find((key) => normalizedKeys.includes(normalizeKey(key)));
  if (matchingKey && item[matchingKey] !== undefined && item[matchingKey] !== null && item[matchingKey] !== "") {
    return item[matchingKey];
  }

  return "";
}

function readNumberField(item, keys) {
  const value = readField(item, keys);
  if (value === "") return "";

  const number = Number(String(value).replace("%", "").trim());
  return Number.isFinite(number) ? number : value;
}

function formatDateForCsv(value) {
  if (!value) return "";

  const date = parseDate(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function parseDate(value) {
  if (value instanceof Date) return value;

  const cleaned = String(value || "").trim();
  if (!cleaned) return new Date(NaN);

  if (!Number.isNaN(Number(cleaned)) && Number(cleaned) > 20000) {
    return new Date((Number(cleaned) - 25569) * 86400 * 1000);
  }

  return new Date(cleaned);
}

function normalizeKey(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function toCsvRow(values) {
  return values.map(toCsvCell).join(",");
}

function toCsvCell(value) {
  const text = value === undefined || value === null ? "" : String(value);
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}
