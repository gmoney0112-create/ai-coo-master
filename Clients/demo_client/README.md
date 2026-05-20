# demo_client — AI COO System

> Template client folder. Duplicate this entire folder for each new client.
> Rename `demo_client` to the client's name (snake_case).

---

## Client Info

| Field | Value |
|---|---|
| Client Name | Demo Client |
| Niche | Online Expert (Coach / Course Creator / Consultant) |
| Primary Offer | |
| GHL Subaccount ID | |
| Onboarding Date | |
| Status | template |

---

## Folder Structure

```
demo_client/
  env/
    client.env        ← all client-specific config values
  workflows/
    ghl_exports/      ← exported GHL workflow JSON files for this client
    n8n_exports/      ← exported n8n workflow JSON files for this client
  notes/
    kickoff.md        ← notes from onboarding call
    custom_steps.md   ← any non-standard steps taken for this client
```

---

## How to Onboard a New Client

1. Duplicate this entire `demo_client/` folder.
2. Rename to `[CLIENT_NAME]/` (snake_case).
3. Copy `Templates/` files into the matching subfolders.
4. Open `env/client.env` and fill in all values.
5. Duplicate the GHL ‘AI COO Template’ subaccount and rename it to the client.
6. Import workflows from `Workflows/GHL/` into the client subaccount.
7. Swap all `{{PLACEHOLDER}}` values using the env file.
8. Run the Week 1–4 checklist in `Docs/Deployment_Checklist.md`.
9. Log any non-standard steps in `notes/custom_steps.md`.

---

## Notes

> Add client-specific notes here as deployment progresses.
