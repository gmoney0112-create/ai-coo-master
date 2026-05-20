# Scripts

This folder holds utility scripts for the AI COO System.

## Planned Scripts

| File | Purpose | Language |
|---|---|---|
| `new_client.sh` | Scaffolds a new client folder from `demo_client` template | Bash |
| `validate_env.js` | Validates a client's `env/client.env` file for missing required fields | Node.js |
| `smoke_test.js` | Runs a full smoke test against a deployed client funnel (pixel events, webhook, redirect) | Node.js |
| `sync_workflows.sh` | Exports GHL and n8n workflow JSONs into the correct client/master folders | Bash |
| `deploy_client.sh` | End-to-end: scaffold + validate + import workflows + run smoke test | Bash |

## How to Add a Script

1. Create the script file in this folder.
2. Add a row to the table above.
3. Add usage instructions in a comment block at the top of the script.
4. Test it against `demo_client` before using on a real client.

## Usage Example

```bash
# Scaffold a new client from the demo_client template
bash Scripts/new_client.sh my_client_name

# Validate the new client's env file
node Scripts/validate_env.js Clients/my_client_name/env/client.env

# Run a smoke test against the deployed funnel
node Scripts/smoke_test.js Clients/my_client_name/env/client.env
```

> Scripts are not required to deploy — they are helpers to speed up the process at scale.
> For Client 1, manual deployment following `Docs/Deployment_Checklist.md` is sufficient.
