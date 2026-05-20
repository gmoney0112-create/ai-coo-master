#!/usr/bin/env node
// ============================================================
// Scripts/smoke_test.js
// AI COO Master — End-to-End Smoke Test Runner
// Usage: node Scripts/smoke_test.js <client_name>
// Requires: CLIENT_ENV path set or reads Clients/<client>/env/client.env
// ============================================================

const fs   = require('fs');
const path = require('path');
const https = require('https');
const http  = require('http');

// --- Colors ---
const GREEN  = '\x1b[32m';
const RED    = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN   = '\x1b[36m';
const BOLD   = '\x1b[1m';
const RESET  = '\x1b[0m';

// --- Args ---
const clientName = process.argv[2];
if (!clientName) {
  console.error(`${RED}${BOLD}Usage: node Scripts/smoke_test.js <client_name>${RESET}`);
  process.exit(1);
}

const envPath = path.resolve(
  process.env.CLIENT_ENV ||
  path.join('Clients', clientName, 'env', 'client.env')
);

if (!fs.existsSync(envPath)) {
  console.error(`${RED}${BOLD}ERROR: client.env not found at ${envPath}${RESET}`);
  process.exit(1);
}

// --- Parse env ---
const envVars = {};
fs.readFileSync(envPath, 'utf8')
  .split('\n')
  .forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const idx = trimmed.indexOf('=');
    if (idx === -1) return;
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim().replace(/^"|"$/g, '');
    envVars[key] = val;
  });

console.log(`\n${CYAN}${BOLD}============================================================${RESET}`);
console.log(`${CYAN}${BOLD}  AI COO Smoke Test — Client: ${clientName}${RESET}`);
console.log(`${CYAN}${BOLD}============================================================${RESET}\n`);

const results = [];

// --- Test Helper ---
function runTest(name, fn) {
  try {
    const result = fn();
    if (result === true) {
      console.log(`  ${GREEN}PASS${RESET}  ${name}`);
      results.push({ name, status: 'PASS' });
    } else {
      const msg = result || 'assertion failed';
      console.log(`  ${RED}FAIL${RESET}  ${name} — ${msg}`);
      results.push({ name, status: 'FAIL', msg });
    }
  } catch (e) {
    console.log(`  ${RED}FAIL${RESET}  ${name} — ${e.message}`);
    results.push({ name, status: 'FAIL', msg: e.message });
  }
}

async function runAsyncTest(name, fn) {
  try {
    await fn();
    console.log(`  ${GREEN}PASS${RESET}  ${name}`);
    results.push({ name, status: 'PASS' });
  } catch (e) {
    console.log(`  ${RED}FAIL${RESET}  ${name} — ${e.message}`);
    results.push({ name, status: 'FAIL', msg: e.message });
  }
}

// --- Helper: HTTP GET ---
function httpGet(url, timeoutMs = 8000) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, { timeout: timeoutMs }, (res) => {
      resolve({ status: res.statusCode, headers: res.headers });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Request timed out')); });
  });
}

// ============================================================
// TESTS
// ============================================================

console.log(`${BOLD}[1] Environment Checks${RESET}`);
runTest('CLIENT_NAME is set', () => !!envVars['CLIENT_NAME'] || 'CLIENT_NAME missing');
runTest('GHL_WEBHOOK_URL is set', () => !!envVars['GHL_WEBHOOK_URL'] || 'GHL_WEBHOOK_URL missing');
runTest('QUIZ_URL is set', () => !!envVars['QUIZ_URL'] || 'QUIZ_URL missing');
runTest('THANK_YOU_URL is set', () => !!envVars['THANK_YOU_URL'] || 'THANK_YOU_URL missing');
runTest('GA4_MEASUREMENT_ID format', () => {
  const val = envVars['GA4_MEASUREMENT_ID'];
  if (!val) return 'GA4_MEASUREMENT_ID missing';
  return /^G-[A-Z0-9]+$/.test(val) || `Unexpected format: ${val}`;
});

console.log(`\n${BOLD}[2] Folder Structure Checks${RESET}`);
const clientRoot = path.join('Clients', clientName);
[
  '',
  'env',
  'notes',
  'workflows/ghl/exports',
  'workflows/n8n/exports',
  'templates',
].forEach(sub => {
  const full = path.join(clientRoot, sub);
  runTest(`Folder exists: ${full || clientRoot}`, () =>
    fs.existsSync(full) || `Missing: ${full}`
  );
});

runTest('client.env file exists', () =>
  fs.existsSync(envPath) || `Missing: ${envPath}`
);

console.log(`\n${BOLD}[3] URL Reachability Checks${RESET}`);

(async () => {
  const urlTests = [
    { label: 'QUIZ_URL reachable (2xx/3xx)', key: 'QUIZ_URL' },
    { label: 'THANK_YOU_URL reachable (2xx/3xx)', key: 'THANK_YOU_URL' },
  ];

  for (const t of urlTests) {
    const url = envVars[t.key];
    if (!url || url.includes('your-') || url.includes('PLACEHOLDER')) {
      console.log(`  ${YELLOW}SKIP${RESET}  ${t.label} — placeholder/missing value`);
      results.push({ name: t.label, status: 'SKIP' });
      continue;
    }
    await runAsyncTest(t.label, async () => {
      const res = await httpGet(url);
      if (res.status >= 400) throw new Error(`HTTP ${res.status}`);
    });
  }

  // --- GHL Webhook ping (dry-run POST not sent — just validate URL format) ---
  console.log(`\n${BOLD}[4] GHL Webhook Format Check${RESET}`);
  runTest('GHL_WEBHOOK_URL is a valid https URL', () => {
    const val = envVars['GHL_WEBHOOK_URL'];
    if (!val) return 'GHL_WEBHOOK_URL missing';
    try { new URL(val); return val.startsWith('https://') || 'Should use HTTPS'; }
    catch { return 'Not a valid URL'; }
  });

  // --- Summary ---
  const passed  = results.filter(r => r.status === 'PASS').length;
  const failed  = results.filter(r => r.status === 'FAIL').length;
  const skipped = results.filter(r => r.status === 'SKIP').length;

  console.log(`\n${CYAN}${BOLD}============================================================${RESET}`);
  console.log(`${BOLD}Results: ${GREEN}${passed} passed${RESET}  ${RED}${failed} failed${RESET}  ${YELLOW}${skipped} skipped${RESET}`);

  if (failed === 0) {
    console.log(`${GREEN}${BOLD}All critical checks passed. Client "${clientName}" is smoke-test ready.${RESET}`);
    process.exit(0);
  } else {
    console.log(`${RED}${BOLD}${failed} check(s) failed. Fix issues above before deploying.${RESET}`);
    process.exit(1);
  }
})();
