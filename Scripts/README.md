# Scripts

This folder holds utility scripts for the AI COO System.

All scripts are run from the **repo root** directory.

---

## Scripts Index

| File | Purpose | Language | Status |
|---|---|---|---|
| `new_client.sh` | Scaffolds a new client folder from `demo_client` template | Bash | ✅ Ready |
| `validate_env.js` | Validates a client’s `env/client.env` for required fields | Node.js | ✅ Ready |
| `smoke_test.js` | Runs env, folder, and URL reachability checks for a client | Node.js | ✅ Ready |

---

## Usage

### 1. Scaffold a New Client

```bash
bash Scripts/new_client.sh <client_name>
```

Example:
```bash
bash Scripts/new_client.sh soul_prosperity
```

This copies the full `Clients/demo_client` folder structure into `Clients/soul_prosperity` and creates a pre-filled `env/client.env` template.

---

### 2. Validate Client Environment

```bash
node Scripts/validate_env.js <client_name>
```

Example:
```bash
node Scripts/validate_env.js soul_prosperity
```

Checks that all required fields in `Clients/soul_prosperity/env/client.env` are present and non-empty. Warns on optional fields. Exits with code `1` if any required field is missing.

**Required fields checked:**
- `CLIENT_NAME`
- `GHL_SUBACCOUNT_ID`
- `GHL_API_KEY`
- `GHL_WEBHOOK_URL`
- `QUIZ_URL`
- `THANK_YOU_URL`
- `META_PIXEL_ID`
- `GA4_MEASUREMENT_ID`
- `GA4_API_SECRET`

---

### 3. Run Smoke Test

```bash
node Scripts/smoke_test.js <client_name>
```

Example:
```bash
node Scripts/smoke_test.js soul_prosperity
```

**What it checks:**
- [1] Environment: required fields present and correctly formatted
- [2] Folder structure: all expected subdirectories exist
- [3] URL reachability: QUIZ_URL and THANK_YOU_URL return 2xx/3xx (skipped if placeholder)
- [4] GHL webhook URL is a valid HTTPS URL

Exits `0` on all pass, `1` on any failure.

---

## Recommended Onboarding Flow

```bash
# Step 1: Scaffold
bash Scripts/new_client.sh soul_prosperity

# Step 2: Fill in env values
nano Clients/soul_prosperity/env/client.env

# Step 3: Validate
node Scripts/validate_env.js soul_prosperity

# Step 4: Smoke test
node Scripts/smoke_test.js soul_prosperity
```

---

## Notes

- Never commit real API keys. The `env/` folder is gitignored per client.
- Placeholder values in `client.env` use the format `your-value-here`.
- The `smoke_test.js` skips URL checks for placeholder values automatically.
