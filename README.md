# AI COO System — Franchise Kit

A complete, duplicatable installation kit for the AI COO System productized service.
Every file in this repo is a template you reuse for each new client — zero custom scope creep.

## Repo structure

```text
ai-coo-master/
├── Clients/
│   ├── demo_client/              ← Reference scaffold (copy for each new client)
│   └── soul_prosperity_demo/     ← Example dry-run client
├── Docs/
│   └── Deployment_Checklist.md   ← 4-phase install checklist (~4.25 hr per client)
├── Scripts/
│   ├── new_client.sh             ← Scaffold a new client folder from template
│   ├── validate_env.js           ← Validate all required env fields before install
│   └── smoke_test.js             ← 4-suite integration test (run after install)
├── Templates/
│   ├── Landing_Page/
│   │   ├── index.html            ← Full standalone landing page (auto-deploys to GitHub Pages)
│   │   ├── thank-you.html        ← Post-booking confirmation page
│   │   ├── hero.md               ← Hero copy template with {{placeholders}}
│   │   ├── offer.md              ← Problem/solution, departments, who it's for
│   │   ├── faq.md                ← 8-question FAQ block
│   │   └── proof-points.md       ← COO math comparison + social proof slots
│   ├── Email_Sequences/
│   │   ├── 01_welcome.txt        ← Day 0: welcome + sequence preview
│   │   ├── 02_problem.txt        ← Day 1: operations problem frame
│   │   ├── 03_story.txt          ← Day 3: founder story + before/after
│   │   ├── 04_breakdown.txt      ← Day 5: full deliverables list
│   │   └── 05_lastcall.txt       ← Day 7: urgency close
│   └── Onboarding_Forms/
│       └── form.md               ← 12-question client intake form
└── Workflows/
    ├── GHL/
    │   ├── 01_new_lead_workflow.json          ← Form submit → pipeline → email → n8n → task
    │   ├── 02_noshow_followup.json            ← No-show → SMS → email → nurture
    │   ├── 03_payment_kickoff.json            ← Closed Won → welcome email → kickoff task
    │   ├── 04_broadcast_campaign.json         ← Manual/webhook broadcast with resend logic
    │   └── 05_optimization_call_reminder.json ← 28-day timer → SMS → email → manual task
    └── n8n/
        └── exports/
            ├── master-router.json             ← Single webhook routes all traffic by type
            ├── revenue-department.json        ← Lead scoring, GHL pipeline, Telegram alert
            ├── growth-department.json         ← Weekly report + broadcast handler
            ├── tech-department.json           ← 30-min health checks, system alerts
            └── telegram-interface.json        ← /status /leads /weekly /pause /resume /help
```

---

## Quick start — new client

```bash
# 1. Scaffold the client folder
bash Scripts/new_client.sh client_name

# 2. Fill in their values (from onboarding form)
nano Clients/client_name/env/client.env

# 3. Validate before touching any tools
node Scripts/validate_env.js client_name

# 4. Follow the deployment checklist
open Docs/Deployment_Checklist.md

# 5. Run smoke test after install is complete
node Scripts/smoke_test.js client_name
```

---

## Landing page deployment

The landing page (`Templates/Landing_Page/`) auto-deploys to GitHub Pages on every push to `main`.

**Before deploying**, replace these placeholders in `index.html` and `thank-you.html`:

| Placeholder | Replace with |
| --- | --- |
| `{{CALENDAR_LINK}}` | Your GHL or Calendly booking URL |
| `{{SENDER_NAME}}` | Your name |
| `GA_MEASUREMENT_ID` | Your GA4 Measurement ID |
| `YOUR_PIXEL_ID` | Your Facebook Pixel ID |

Then push to `main` — GitHub Actions handles the rest.

---

## The offer

**AI COO Starter Implementation** — $997 beta (normally $2,997)

Installs an autonomous operations layer into a service business in 7 days:

| Department | What it does |
| --- | --- |
| Revenue | Lead capture, pipeline automation, follow-up sequences |
| Growth | Scheduled email broadcasts, campaign triggers |
| Tech | 24/7 health monitoring, instant alerts |
| Automation | Reminders, task creation, data sync |
| Telegram Interface | `/status` `/leads` `/weekly` `/pause` `/resume` |

**ICP:** Online experts, consultants, small agencies — $5K–$30K/mo, solo to 5 people.

---

## Pricing ladder

| Tier | Price | When |
| --- | --- | --- |
| Beta | $997 one-time | Clients 1–10 |
| Standard | $2,997 one-time | Clients 11+ |
| Maintenance retainer | $297–$497/mo | Upsell at 30-day optimization call |
| COO Retainer | $1,497/mo | Full ongoing management |

---

## n8n workflow import

1. Open n8n → Workflows → Import from File
2. Select the JSON from `Workflows/n8n/exports/`
3. Update all `$env.VARIABLE_NAME` references with the client's actual values
4. Activate the workflow
5. Test with a fake payload before going live

## GHL workflow setup

GHL doesn't import individual workflows as JSON — the files in `Workflows/GHL/` are reference specs.
Use them as step-by-step guides when building each workflow in GHL's automation builder.

For faster setup at scale: build a GHL **Snapshot** from your master template account and import it for each client. One snapshot import replaces all 5 manual workflow builds.

---

Built for scale: GHL Snapshots + n8n env vars = onboard client 50 the same way you onboarded client 1.
