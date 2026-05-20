#!/usr/bin/env node
/**
 * validate_env.js — AI COO System
 * Validates a client's env/client.env file for missing or empty required fields.
 *
 * Usage:
 *   node Scripts/validate_env.js Clients/<client_name>/env/client.env
 *
 * Example:
 *   node Scripts/validate_env.js Clients/soul_prosperity/env/client.env
 *
 * Exit codes:
 *   0 — all required fields are present and non-empty
 *   1 — one or more required fields are missing or empty
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// --- Required fields (must be present AND non-empty before going live) ---
const REQUIRED_FIELDS = [
  // Client identity
  'CLIENT_NAME',
  'CLIENT_NICHE',

  // GHL
  'GHL_SUBACCOUNT_ID',
  'GHL_API_KEY',
  'GHL_LOCATION_ID',
  'GHL_PIPELINE_ID',
  'GHL_LEAD_CAPTURE_WEBHOOK',

  // Funnel
  'LANDING_PAGE_URL',
  'THANK_YOU_PAGE_URL',
  'CALENDAR_LINK',

  // Tracking
  'META_PIXEL_ID',
  'GA4_MEASUREMENT_ID',

  // Telegram
  'TELEGRAM_BOT_TOKEN',
  'TELEGRAM_CHAT_ID',

  // Email
  'FROM_EMAIL',
  'FROM_NAME',
];

// --- Optional fields (warn if missing, don't fail) ---
const OPTIONAL_FIELDS = [
  'TIKTOK_PIXEL_ID',
  'GHL_NOSHOW_WEBHOOK',
  'GHL_BROADCAST_WEBHOOK',
  'GHL_HEALTH_CHECK_WEBHOOK',
  'FASTPAYDIRECT_LINK_PRIMARY',
  'FASTPAYDIRECT_LINK_UPSELL',
  'N8N_WEBHOOK_BASE_URL',
  'N8N_API_KEY',
  'UTM_SOURCE',
  'UTM_MEDIUM',
  'UTM_CAMPAIGN',
  'REPLY_TO_EMAIL',
  'CLIENT_PRIMARY_OFFER',
  'CLIENT_ONBOARDING_DATE',
];

// --- Colors ---
const RED    = '\x1b[31m';
const GREEN  = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE   = '\x1b[34m';
const BOLD   = '\x1b[1m';
const RESET  = '\x1b[0m';

function info(msg)    { console.log(`${BLUE}[INFO]${RESET}  ${msg}`); }
function success(msg) { console.log(`${GREEN}[OK]${RESET}    ${msg}`); }
function warn(msg)    { console.log(`${YELLOW}[WARN]${RESET}  ${msg}`); }
function error(msg)   { console.log(`${RED}[ERROR]${RESET} ${msg}`); }
function header(msg)  { console.log(`\n${BOLD}${msg}${RESET}`); }

// --- Parse env file into key/value map ---
function parseEnvFile(filePath) {
  const raw    = fs.readFileSync(filePath, 'utf8');
  const result = {};

  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    // Skip comments and blank lines
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key   = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    result[key] = value;
  }

  return result;
}

// --- Main ---
const envPath = process.argv[2];

if (!envPath) {
  error('No env file path provided.');
  error('Usage: node Scripts/validate_env.js Clients/<client_name>/env/client.env');
  process.exit(1);
}

const absPath = path.resolve(process.cwd(), envPath);

if (!fs.existsSync(absPath)) {
  error(`File not found: ${absPath}`);
  process.exit(1);
}

info(`Validating: ${absPath}`);
const env = parseEnvFile(absPath);

let errors   = [];
let warnings = [];

// Check required fields
for (const field of REQUIRED_FIELDS) {
  if (!env[field] || env[field] === '') {
    errors.push(field);
  }
}

// Check optional fields
for (const field of OPTIONAL_FIELDS) {
  if (!env[field] || env[field] === '') {
    warnings.push(field);
  }
}

// --- Report ---
header('=== Required Fields ===');
for (const field of REQUIRED_FIELDS) {
  if (errors.includes(field)) {
    error(`MISSING  ${field}`);
  } else {
    // Mask sensitive values
    const val = field.toLowerCase().includes('key') ||
                field.toLowerCase().includes('token') ||
                field.toLowerCase().includes('secret')
      ? '***masked***'
      : env[field];
    success(`OK       ${field} = ${val}`);
  }
}

header('=== Optional Fields ===');
for (const field of OPTIONAL_FIELDS) {
  if (warnings.includes(field)) {
    warn(`EMPTY    ${field}  (not required to launch, but recommended)`);
  } else {
    const val = field.toLowerCase().includes('key') ||
                field.toLowerCase().includes('token')
      ? '***masked***'
      : env[field];
    success(`OK       ${field} = ${val}`);
  }
}

// --- Summary ---
console.log('');
if (errors.length === 0) {
  console.log(`${GREEN}${BOLD}============================================================${RESET}`);
  console.log(`${GREEN}${BOLD}  All ${REQUIRED_FIELDS.length} required fields are present. Ready to deploy.${RESET}`);
  if (warnings.length > 0) {
    console.log(`${YELLOW}  ${warnings.length} optional field(s) are empty — fill them before scaling.${RESET}`);
  }
  console.log(`${GREEN}${BOLD}============================================================${RESET}`);
  process.exit(0);
} else {
  console.log(`${RED}${BOLD}============================================================${RESET}`);
  console.log(`${RED}${BOLD}  ${errors.length} required field(s) are missing or empty:${RESET}`);
  for (const f of errors) {
    console.log(`${RED}    - ${f}${RESET}`);
  }
  console.log(`${RED}  Fill these in Clients/<client_name>/env/client.env before deploying.${RESET}`);
  console.log(`${RED}${BOLD}============================================================${RESET}`);
  process.exit(1);
}
