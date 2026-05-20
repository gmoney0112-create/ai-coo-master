# Workflows / n8n

This folder holds exported n8n workflow JSON files for the AI COO System.

## How to Use

1. After building a workflow in n8n, export it as JSON.
2. Save it here with a descriptive filename:
   - `lead_router_v1.json`
   - `utm_capture_v1.json`
   - `health_monitor_v1.json`
   - `telegram_bot_v1.json`
3. When deploying for a new client, import the JSON into their n8n instance.
4. Update all credentials and environment variables per the client's `env/client.env`.

## Workflow Index

| File | Purpose | Version |
|---|---|---|
| `lead_router_v1.json` | Routes incoming leads to correct GHL pipeline based on source | v1 |
| `utm_capture_v1.json` | Captures UTM params and appends to GHL contact record | v1 |
| `health_monitor_v1.json` | Monitors GHL pipeline health and fires Telegram alerts | v1 |
| `telegram_bot_v1.json` | Handles Telegram bot commands and routes to GHL webhooks | v1 |

> Add exported JSON files to this folder as they are built.
