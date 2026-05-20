# Workflows / GHL

This folder holds exported GHL workflow JSON files for the master AI COO Template.

## How to Use

1. After building a workflow in GHL, export it as JSON.
2. Save it here with a descriptive filename:
   - `lead_capture_v1.json`
   - `noshow_followup_v1.json`
   - `broadcast_referral_v1.json`
   - `health_check_v1.json`
   - `telegram_control_panel_v1.json`
3. When onboarding a new client, import these JSONs into their GHL subaccount.
4. Swap all `{{PLACEHOLDER}}` values using the client's `env/client.env`.

## Workflow Index

| File | Purpose | Version |
|---|---|---|
| `lead_capture_v1.json` | Captures leads from landing page, tags + routes to pipeline | v1 |
| `noshow_followup_v1.json` | Fires SMS + email sequence for no-shows | v1 |
| `broadcast_referral_v1.json` | Sends broadcast messages and referral triggers | v1 |
| `health_check_v1.json` | Monitors pipeline health and sends Telegram alerts | v1 |
| `telegram_control_panel_v1.json` | Handles Telegram bot commands (status, pause, resume, report) | v1 |

> Add exported JSON files to this folder as they are built.
